import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "municipal_db",
  password: "Iphone@12112",
  port: 5432
});