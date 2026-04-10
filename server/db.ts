import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000,  // 15s to establish a connection (handles Neon cold starts)
  idleTimeoutMillis: 30000,
  max: 10,
});
export const db = drizzle(pool, { schema });

// Run additive schema migrations synchronously before server starts
export async function runMigrations() {
  try {
    console.log("[db] running migrations...");
    await pool.query(`
      ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address text;
    `);
    console.log("[db] migrations completed successfully");
  } catch (err) {
    // Log but don't crash — migration may have already run
    console.error("[db] migration error (non-fatal):", err);
  }
}
