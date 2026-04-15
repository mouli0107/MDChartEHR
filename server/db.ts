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

// Prevent unhandled 'error' events from crashing the server when
// Neon drops a connection (e.g. during their maintenance/outages)
pool.on("error", (err) => {
  console.error("[db] pool client error (non-fatal):", err.message);
});

export const db = drizzle(pool, { schema });

// Run additive schema migrations synchronously before server starts
export async function runMigrations() {
  try {
    console.log("[db] running migrations...");
    await pool.query(`
      ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address text;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        category_label TEXT NOT NULL,
        author TEXT NOT NULL,
        published_at TEXT NOT NULL,
        read_time TEXT NOT NULL,
        image TEXT,
        meta_title TEXT,
        meta_description TEXT,
        focus_keyword TEXT,
        published BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_seo (
        path TEXT PRIMARY KEY,
        meta_title TEXT,
        meta_description TEXT,
        focus_keyword TEXT,
        canonical_url TEXT,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    console.log("[db] migrations completed successfully");
  } catch (err) {
    // Log but don't crash — migration may have already run
    console.error("[db] migration error (non-fatal):", err);
  }
}
