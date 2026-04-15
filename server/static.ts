import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { getSeoEntry } from "./seoCache";

const DEFAULT_TITLE = "MDcharts EHR - Click Less, Care More";
const DEFAULT_DESC  = "Comprehensive EHR and RCM solution for modern medical practices. Streamline your workflow and maximize revenue.";
const SITE_URL      = "https://mdchartsehr.com";

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Inject SEO meta tags into the index.html string so every crawler —
 * Screaming Frog, Ahrefs, SEMrush, Googlebot, Bingbot, social bots — sees
 * the correct title / description / OG tags in the raw HTML source.
 */
function injectSeoTags(html: string, pagePath: string): string {
  const seo = getSeoEntry(pagePath);

  const title       = seo?.metaTitle      || DEFAULT_TITLE;
  const description = seo?.metaDescription || DEFAULT_DESC;
  const ogTitle     = seo?.ogTitle         || title;
  const ogDesc      = seo?.ogDescription   || description;
  const ogImage     = seo?.ogImage         || "";
  const canonical   = seo?.canonicalUrl    || `${SITE_URL}${pagePath}`;

  // Strip any existing duplicate tags the Vite template may already include
  let out = html
    .replace(/<title>[^<]*<\/title>/,                    `<title>${escapeAttr(title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/gi,       "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi,          "")
    .replace(/<meta\s+property="og:title"[^>]*>/gi,      "")
    .replace(/<meta\s+property="og:description"[^>]*>/gi,"")
    .replace(/<meta\s+property="og:url"[^>]*>/gi,        "")
    .replace(/<meta\s+property="og:image"[^>]*>/gi,      "")
    .replace(/<meta\s+name="twitter:title"[^>]*>/gi,     "")
    .replace(/<meta\s+name="twitter:description"[^>]*>/gi,"")
    .replace(/<meta\s+name="twitter:image"[^>]*>/gi,     "");

  const injection = [
    `<meta name="description" content="${escapeAttr(description)}">`,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    `<meta property="og:title" content="${escapeAttr(ogTitle)}">`,
    `<meta property="og:description" content="${escapeAttr(ogDesc)}">`,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    `<meta property="og:type" content="website">`,
    ogImage ? `<meta property="og:image" content="${escapeAttr(ogImage)}">` : "",
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(ogTitle)}">`,
    `<meta name="twitter:description" content="${escapeAttr(ogDesc)}">`,
    ogImage ? `<meta name="twitter:image" content="${escapeAttr(ogImage)}">` : "",
  ].filter(Boolean).join("\n  ");

  return out.replace("</head>", `  ${injection}\n</head>`);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const indexHtmlPath = path.resolve(distPath, "index.html");

  // Cache hashed assets (JS/CSS/images) for 1 year; HTML never cached
  app.use(express.static(distPath, {
    maxAge: "1y",
    immutable: true,
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }));

  // Catch-all: serve index.html with SEO tags injected for every page request.
  // This makes meta title/description/OG tags visible to ALL crawlers in raw HTML.
  app.use((req, res) => {
    try {
      const html = fs.readFileSync(indexHtmlPath, "utf-8");
      // req.url preserves the full path in a bare app.use() (no mount prefix)
      const pagePath = (req.url || "/").split("?")[0];
      const modified = injectSeoTags(html, pagePath);
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Cache-Control", "no-cache");
      res.send(modified);
    } catch {
      // Fallback: just send the file as-is
      res.sendFile(indexHtmlPath);
    }
  });
}
