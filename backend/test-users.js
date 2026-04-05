import pg from "pg";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(process.cwd(), "../.env") });

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function testUsers() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL UNIQUE,
        email TEXT UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log("✅ Users table created/verified");

    // Insert test user
    const testResult = await pool.query(
      `INSERT INTO users (name, phone, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, phone, email, created_at`,
      [
        "Test User",
        "9999999999",
        "test@example.com",
        "testhash123"
      ]
    );

    console.log("✅ Test user inserted:", testResult.rows[0]);

    // Query all users
    const allUsers = await pool.query("SELECT id, name, phone, email, created_at FROM users ORDER BY created_at DESC");
    console.log("✅ All users in database:", allUsers.rows);

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await pool.end();
  }
}

testUsers();