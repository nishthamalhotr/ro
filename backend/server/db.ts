import pg from "pg";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(process.cwd(), "../.env") });

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });


