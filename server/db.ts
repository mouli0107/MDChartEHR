import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Run additive schema migrations synchronously before server starts
export async function runMigrations() {
  try {
    await pool.query(`
      ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address text;
    `);
    console.log("[db] migrations completed successfully");
  } catch (err) {
    console.error("[db] migration error:", err);
  }
}
