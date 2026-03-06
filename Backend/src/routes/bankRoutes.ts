import { Router } from "express";
import { pool } from "../db";

const router = Router();

/* GET BANKS */

router.get("/", async (req,res)=>{

  try{

    const result = await pool.query(
      "SELECT * FROM bank_accounts ORDER BY id DESC"
    );

    res.json(result.rows);

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Server error"});

  }

});


/* ADD BANK */

router.post("/", async (req,res)=>{

  const { bank_name, account_name, account_number, ifsc_code, branch } = req.body;

  try{

    const result = await pool.query(
      "INSERT INTO bank_accounts (bank_name,account_name,account_number,ifsc_code,branch) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [bank_name,account_name,account_number,ifsc_code.toUpperCase(),branch]
    );

    res.json(result.rows[0]);

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Insert failed"});

  }

});


/* UPDATE BANK */

router.put("/:id", async (req,res)=>{

  const { bank_name, account_name, account_number, ifsc_code, branch } = req.body;

  try{

    const result = await pool.query(
      "UPDATE bank_accounts SET bank_name=$1, account_name=$2, account_number=$3, ifsc_code=$4, branch=$5 WHERE id=$6 RETURNING *",
      [bank_name,account_name,account_number,ifsc_code.toUpperCase(),branch,req.params.id]
    );

    res.json(result.rows[0]);

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Update failed"});

  }

});


/* DELETE BANK */

router.delete("/:id", async (req,res)=>{

  try{

    await pool.query(
      "DELETE FROM bank_accounts WHERE id=$1",
      [req.params.id]
    );

    res.json({message:"Bank deleted"});

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Delete failed"});

  }

});

export default router;