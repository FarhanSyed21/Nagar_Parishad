import { Router } from "express";
import { pool } from "../db";

const router = Router();

/* GET CONTRACTORS */

router.get("/", async (req,res)=>{

  try{

    const result = await pool.query(
      "SELECT * FROM contractors ORDER BY id DESC"
    );

    res.json(result.rows);

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Server error"});

  }

});


/* ADD CONTRACTOR */

router.post("/", async (req,res)=>{

  const { name, contact, address, pan_number } = req.body;

  try{

    const result = await pool.query(
      "INSERT INTO contractors (name,contact,address,pan_number) VALUES ($1,$2,$3,$4) RETURNING *",
      [name,contact,address,pan_number]
    );

    res.json(result.rows[0]);

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Insert failed"});

  }

});


/* UPDATE CONTRACTOR */

router.put("/:id", async (req,res)=>{

  const { name, contact, address, pan_number } = req.body;

  try{

    const result = await pool.query(
      "UPDATE contractors SET name=$1, contact=$2, address=$3, pan_number=$4 WHERE id=$5 RETURNING *",
      [name,contact,address,pan_number,req.params.id]
    );

    res.json(result.rows[0]);

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Update failed"});

  }

});


/* DELETE CONTRACTOR */

router.delete("/:id", async (req,res)=>{

  try{

    await pool.query(
      "DELETE FROM contractors WHERE id=$1",
      [req.params.id]
    );

    res.json({message:"Contractor deleted"});

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Delete failed"});

  }

});

export default router;