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

export default router;