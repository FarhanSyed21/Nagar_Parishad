import express from "express";
import { pool } from "../db";

const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const {
      bank_id,
      contractor_id,
      transaction_type,
      transaction_date,
      amount,
      account_type,
      particular,
      remark
    } = req.body;

    const result = await pool.query(
      `INSERT INTO transactions
      (bank_id, contractor_id, transaction_type, transaction_date, amount, account_type, particular, remark)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        bank_id,
        contractor_id,
        transaction_type,
        transaction_date,
        amount,
        account_type,
        particular,
        remark
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {

  try {

    const { type, minAmount, maxAmount } = req.query;

    let query = `
      SELECT 
        t.id,
        t.transaction_date,
        t.transaction_type,
        t.amount,
        t.account_type,
        t.particular,
        t.remark,
        b.bank_name,
        c.name as contractor_name
      FROM transactions t
      LEFT JOIN bank_accounts b ON t.bank_id = b.id
      LEFT JOIN contractors c ON t.contractor_id = c.id
      WHERE 1=1
    `;

    const params:any[] = [];

    if (type) {
      params.push(type);
      query += ` AND t.transaction_type = $${params.length}`;
    }

    if (minAmount) {
      params.push(minAmount);
      query += ` AND t.amount >= $${params.length}`;
    }

    if (maxAmount) {
      params.push(maxAmount);
      query += ` AND t.amount <= $${params.length}`;
    }

    query += ` ORDER BY t.id DESC`;

    const result = await pool.query(query, params);

    res.json(result.rows);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});

export default router;