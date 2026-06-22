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
        og_image TEXT,
        og_title TEXT,
        og_description TEXT,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    await pool.query(`
      ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS og_image TEXT;
      ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS og_title TEXT;
      ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS og_description TEXT;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS redirects (
        id SERIAL PRIMARY KEY,
        from_path TEXT NOT NULL UNIQUE,
        to_path TEXT NOT NULL,
        status_code INTEGER NOT NULL DEFAULT 301,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    // Insert new blog posts that may not exist yet (safe upsert — skips if slug already present)
    await pool.query(`
      INSERT INTO blog_posts (slug, title, excerpt, content, category, category_label, author, published_at, read_time, image, published)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
      ON CONFLICT (slug) DO NOTHING
    `, [
      'patient-collections-reduce-friction',
      'Your Patients Want to Pay You. So Why Are You Making It So Hard?',
      'Patient financial responsibility is rising while collection rates are falling. The problem isn\'t unwilling patients — it\'s friction. Here\'s how to fix it.',
      `I want to tell you about a scenario I've seen play out at more practices than I can count. A patient comes in, the visit goes fine, they leave. A paper statement gets mailed to an address that's two moves out of date. It sits unopened in a stack of mail. Thirty days pass. The practice sends another statement. By the time someone calls, the patient has no memory of the balance and very little motivation to pay quickly.

The patient wasn't trying to avoid the bill. They just never had a real opportunity to pay it. The process failed them before they even had a chance to engage. That's the patient collections problem in one paragraph — not unwilling patients, but friction.

## The Numbers Tell a Difficult Story

Patient financial responsibility has been climbing steadily, while the percentage patients actually pay has been declining. Insured patient yield dropped from 45.1% in 2024 to 42.4% in 2025. The HFMA and PayZen 2026 survey of revenue cycle leaders found that practices are collecting less than a third of total patient billings — two out of every three dollars billed directly to patients isn't making it back.

> **Cedar analyzed 1.5 billion patient financial interactions and found that 90% of patients now receive bills through their preferred channels — yet collection rates remain flat. The problem isn't delivery. It's what stands in the way.**

## What Patients Actually Want

The message from patient preference research is consistent: pay digitally, pay fast, pay from a phone. TrustCommerce's 2024 Healthcare Payment Trends Report found the majority of patients prefer paying by debit or credit card. Inovalon's research found that nearly two-thirds of consumers prefer paying medical bills online. Among patients under 35, nearly three-quarters said they had switched providers — or would — for a better payment experience. Billing experience is now a retention factor, not just a back-office metric.

Text-based payment links are where the real shift is happening. SMS has a 98% open rate compared to roughly 20% for email. Studies on text-based payment reminders consistently show significantly higher payment rates, with a meaningful share of patients paying within minutes of receiving a secure link.

## When You Collect Matters as Much as How

MGMA's 2025 benchmarking data makes something very clear: practices that collect at time of service consistently outperform peers who wait to bill patients after insurance processing. The HFMA/PayZen 2026 survey showed pre-service collections improving year over year as more practices capture payment — or at least a card on file — during the estimate stage.

The patient's motivation to pay is highest right after their visit. Every week that passes between the encounter and the statement is a week of motivation you've lost. A good payment workflow catches the patient at multiple moments — at check-in, immediately post-visit, and again when the balance finalizes.

## What MDCharts Is Doing About This

MDCharts is an integrated EHR and RCM platform, meaning billing isn't a separate system bolted on after the fact. Patient balances, claim statuses, and A/R are visible within the same workflow providers use to document care — removing the handoff delays where balances typically fall through the cracks.

We're now integrating with a payment gateway to complete the patient payment picture. The platform has been recognized as Best in KLAS for Patient Financial Engagement for two consecutive years — 2025 and 2026. Healthcare organizations using the integrated payment tools have reported a 15% to 50% increase in online payments.

Once the integration goes live, MDCharts practices will be able to send patients a secure payment link right after their visit — no portal login required, no paper chase. The patient gets a text or email, taps the link, and pays. The practice gets faster collections and fewer hours spent on follow-up calls.

## Make It Easy or Chase It Forever

Technology alone doesn't fix a broken collections process. But a tight strategy — one that combines early conversations, digital payment links, and a smart follow-up cadence — does. The practices winning on collections right now are doing a few things consistently:

- Collecting or capturing a card on file at time of service, before care is delivered
- Sending a payment link within hours of the visit, while it's still top of mind
- Using text and email together — not just paper statements mailed three weeks later
- Following up once or twice with a simple link, not repeated calls with no easy resolution

Patients are not the problem. Friction is. Remove the friction, and the money follows.

---

## References

1. Kodiak Solutions Revenue Cycle Benchmarking Data, 2025
2. HFMA / PayZen Patient Collections Survey, 2026
3. Cedar 2026 Trends in Healthcare Payments Report
4. TrustCommerce 2024 Healthcare Payment Trends and Future Outlook Report
5. Inovalon / JP Morgan Trends in Healthcare Payments, 2024
6. DrChrono / Curogram Healthcare Billing SMS Research, 2025
7. MGMA Patient Balance Collections Stat Poll, October 2025`,
      'rcm',
      'Revenue Cycle Management',
      'MDCharts RCM Team',
      'June 2026',
      '5 min read',
      '/assets/generated_images/patient_payment_reception.png',
    ]);
    // Patch image on the post if it was already inserted without one
    await pool.query(`
      UPDATE blog_posts
      SET image = '/assets/generated_images/patient_payment_reception.png'
      WHERE slug = 'patient-collections-reduce-friction' AND (image IS NULL OR image = '')
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
