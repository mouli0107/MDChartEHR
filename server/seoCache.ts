/**
 * In-memory SEO cache
 * Populated from the page_seo DB table and refreshed every 5 minutes.
 * Used by static.ts to inject meta tags into index.html for EVERY request
 * so that SEO crawlers (Screaming Frog, Ahrefs, SEMrush, Google, Bing, etc.)
 * all see the correct title/description/OG tags in the raw HTML.
 */
import { pool } from "./db";

export type SeoEntry = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
};

let cache: Map<string, SeoEntry> = new Map();

export function getSeoEntry(pagePath: string): SeoEntry | undefined {
  return cache.get(pagePath);
}

export async function refreshSeoCache() {
  try {
    const result = await pool.query("SELECT * FROM page_seo");
    const next = new Map<string, SeoEntry>();
    for (const row of result.rows) {
      next.set(row.path, {
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        focusKeyword: row.focus_keyword,
        canonicalUrl: row.canonical_url,
        ogTitle: row.og_title,
        ogDescription: row.og_description,
        ogImage: row.og_image,
      });
    }
    cache = next;
    console.log(`[seoCache] refreshed — ${next.size} entries`);
  } catch (err) {
    // non-fatal: keep using the existing cache
    console.error("[seoCache] refresh error (non-fatal):", err);
  }
}

// Warm up 15 s after startup, then every 5 minutes
setTimeout(() => {
  refreshSeoCache();
  setInterval(refreshSeoCache, 5 * 60 * 1000);
}, 15_000);
