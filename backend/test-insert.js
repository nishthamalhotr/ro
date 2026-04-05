import pg from "pg";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(process.cwd(), "../.env") });

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function insertTestLead() {
  try {
    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        city TEXT NOT NULL,
        message TEXT,
        service_type TEXT,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Insert test data
    const result = await pool.query(
      `INSERT INTO leads (name, phone, email, city, message, service_type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        "John Doe",
        "9876543210",
        "john@example.com",
        "Delhi",
        "Need installation service",
        "Installation"
      ]
    );

    console.log("Test lead inserted:", result.rows[0]);

    // Query all leads
    const allLeads = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    console.log("All leads in database:", allLeads.rows);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await pool.end();
  }
}

insertTestLead();