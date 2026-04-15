import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import { blogPosts as blogPostsData } from "@shared/blogData";

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

// Seed existing blog posts from static data if the DB table is empty
export async function seedBlogPosts() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM blog_posts");
    const count = parseInt(result.rows[0].count, 10);
    if (count > 0) {
      console.log(`[db] blog_posts already has ${count} rows — skipping seed`);
      return;
    }
    console.log(`[db] seeding ${blogPostsData.length} blog posts...`);
    for (const post of blogPostsData) {
      await pool.query(
        `INSERT INTO blog_posts (slug, title, excerpt, content, category, category_label, author, published_at, read_time, image, published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
         ON CONFLICT (slug) DO NOTHING`,
        [
          post.slug,
          post.title,
          post.excerpt,
          post.content,
          post.category,
          post.categoryLabel,
          post.author,
          post.date,
          post.readTime,
          post.image ?? null,
        ]
      );
    }
    console.log("[db] blog posts seeded successfully");
  } catch (err) {
    console.error("[db] seed error (non-fatal):", err);
  }
}
