import { Router } from "express";
import { pool } from "../db";
import validator from "validator";

const router = Router();

/* GET USERS */

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT id, name, contact, username, role FROM users"
    );

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

});

/* ADD USER */

router.post("/", async (req, res) => {

  const { name, contact, username, password, role } = req.body;

  try {

    const result = await pool.query(
      "INSERT INTO users (name, contact, username, password, role) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, contact, username, password, role]
    );

    res.json(result.rows[0]);

    if (!name || name.length < 3) {
      return res.status(400).json({ message: "Invalid name" });
    }

    if (!validator.isMobilePhone(contact + "", "en-IN")) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    if (!username || username.length < 4) {
      return res.status(400).json({ message: "Invalid username" });
    }

    if (!password || password.length < 5) {
      return res.status(400).json({ message: "Password too short" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });

  }

});

/* EDIT USER */

router.put("/:id", async (req, res) => {

  const { name, contact, username, role } = req.body;

  try {

    const result = await pool.query(
      "UPDATE users SET name=$1, contact=$2, username=$3, role=$4 WHERE id=$5 RETURNING *",
      [name, contact, username, role, req.params.id]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Update failed" });

  }

});

/* DELETE USER */

router.delete("/:id", async (req, res) => {

  try {

    await pool.query(
      "DELETE FROM users WHERE id=$1",
      [req.params.id]
    );

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });

  }

});

export default router;