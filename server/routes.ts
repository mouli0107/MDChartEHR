import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema, insertWhitePaperDownloadSchema, insertPageViewSchema, insertNotificationEmailSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail, sendWhitePaperDownloadEmail } from "./resend";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";
// Lazy-load geoip-lite after server starts to avoid blocking Node.js startup.
// Wait 4 minutes so the background tar extraction of node_modules finishes first.
let geoipModule: typeof import("geoip-lite") | null = null;
setTimeout(() => {
  import("geoip-lite").then((mod) => {
    geoipModule = mod.default as typeof import("geoip-lite");
    console.log("[geoip] database loaded successfully");
  }).catch((err) => {
    console.error("[geoip] failed to load:", err);
  });
}, 4 * 60 * 1000);

// All pages for sitemap generation
const SITE_PAGES_FOR_SITEMAP = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/ehr", priority: "0.9", changefreq: "monthly" },
  { path: "/rcm", priority: "0.9", changefreq: "monthly" },
  { path: "/practice-management", priority: "0.8", changefreq: "monthly" },
  { path: "/patient-engagement", priority: "0.8", changefreq: "monthly" },
  { path: "/telehealth", priority: "0.8", changefreq: "monthly" },
  { path: "/mobile-app", priority: "0.7", changefreq: "monthly" },
  { path: "/lab-integration", priority: "0.7", changefreq: "monthly" },
  { path: "/e-prescribing", priority: "0.7", changefreq: "monthly" },
  { path: "/patient-portal", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/dermatology", priority: "0.8", changefreq: "monthly" },
  { path: "/specialties/cardiology", priority: "0.8", changefreq: "monthly" },
  { path: "/specialties/obgyn", priority: "0.8", changefreq: "monthly" },
  { path: "/specialties/pediatrics", priority: "0.8", changefreq: "monthly" },
  { path: "/specialties/urology", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/family-medicine", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/orthopedics", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/ophthalmology", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/ent", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/gastroenterology", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/neurology", priority: "0.7", changefreq: "monthly" },
  { path: "/specialties/psychiatry", priority: "0.7", changefreq: "monthly" },
  { path: "/why-mdcharts", priority: "0.8", changefreq: "monthly" },
  { path: "/pricing", priority: "0.8", changefreq: "monthly" },
  { path: "/book-demo", priority: "0.9", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/case-studies", priority: "0.7", changefreq: "monthly" },
  { path: "/testimonials", priority: "0.7", changefreq: "monthly" },
  { path: "/faqs", priority: "0.7", changefreq: "monthly" },
  { path: "/webinars", priority: "0.6", changefreq: "monthly" },
  { path: "/white-papers", priority: "0.6", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/careers", priority: "0.6", changefreq: "monthly" },
  { path: "/partners", priority: "0.6", changefreq: "monthly" },
  { path: "/hipaa-compliance", priority: "0.7", changefreq: "yearly" },
  { path: "/security", priority: "0.7", changefreq: "yearly" },
];

// Social media / SEO bot user-agents that need server-side meta tags
const BOT_USER_AGENTS = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|slackbot|telegrambot|discordbot|googlebot|bingbot|applebot/i;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

  // ── Dynamic Redirect Middleware (from DB) ────────────────────────────────
  // Cache starts empty — populated in background after startup so the first
  // request is never delayed by a Neon cold start.
  let redirectCache: Map<string, { toPath: string; statusCode: number }> = new Map();
  let redirectCacheTime = 0;

  async function refreshRedirectCache() {
    try {
      redirectCache = await storage.getRedirectMap();
      redirectCacheTime = Date.now();
    } catch {
      // Keep existing cache on DB error — don't reset it
    }
  }

  // Warm up in background after server starts, then refresh every 5 minutes
  setTimeout(() => {
    refreshRedirectCache();
    setInterval(refreshRedirectCache, 5 * 60 * 1000);
  }, 10000); // 10s after startup — DB should be ready by then

  app.use((req, res, next) => {
    // Synchronous cache lookup — no DB call, no await, zero latency
    const match = redirectCache.get(req.path);
    if (match) return res.redirect(match.statusCode, match.toPath);
    next();
  });

  // ── robots.txt ────────────────────────────────────────────────────────────
  app.get("/robots.txt", (_req, res) => {
    const host = process.env.SITE_URL || "https://mdcharts.com";
    res.setHeader("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /

Sitemap: ${host}/sitemap.xml`);
  });

  // ── XML Sitemap ───────────────────────────────────────────────────────────
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const host = process.env.SITE_URL || "https://mdcharts.com";
      const now = new Date().toISOString().split("T")[0];

      // Get published blog posts
      const posts = await storage.getAllBlogPosts(false);

      const staticEntries = SITE_PAGES_FOR_SITEMAP.map(p => `
  <url>
    <loc>${host}${p.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("");

      const blogEntries = posts.map(p => `
  <url>
    <loc>${host}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join("");

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`;

      res.setHeader("Content-Type", "application/xml");
      res.send(xml);
    } catch (err) {
      console.error("[sitemap] error:", err);
      res.status(500).send("Failed to generate sitemap");
    }
  });

  // ── Social Bot OG Tag Prerendering ────────────────────────────────────────
  // When Facebook/LinkedIn/Twitter/Slack bots request a page, inject proper
  // meta tags server-side (bots don't execute JavaScript).
  app.use(async (req, res, next) => {
    // Only intercept HTML page requests from known bots
    if (!BOT_USER_AGENTS.test(req.headers["user-agent"] || "")) return next();
    if (req.path.startsWith("/api") || req.path.startsWith("/assets")) return next();
    if (!["GET", "HEAD"].includes(req.method)) return next();

    // Safety: if DB takes >3s (Neon cold start), fall through to normal serving
    const timeout = setTimeout(() => next(), 3000);

    try {
      const host = process.env.SITE_URL || "https://mdcharts.com";
      const siteDefaults = {
        title: "MDCharts EHR — Click Less, Care More",
        description: "HIPAA-compliant EHR and RCM built for specialty practices. Streamline workflows, boost revenue, and deliver better patient care.",
        image: `${host}/assets/mdcharts_live_logo-BYq-gX04.png`,
      };

      // Check if it's a blog post
      let title = siteDefaults.title;
      let description = siteDefaults.description;
      let image = siteDefaults.image;
      let canonicalUrl = `${host}${req.path}`;

      const blogSlugMatch = req.path.match(/^\/blog\/(.+)$/);
      if (blogSlugMatch) {
        const post = await storage.getBlogPostBySlug(blogSlugMatch[1]);
        if (post) {
          title = post.metaTitle || post.title;
          description = post.metaDescription || post.excerpt;
          if (post.image) image = post.image.startsWith("http") ? post.image : `${host}${post.image}`;
        }
      } else {
        // Check page SEO table
        const seo = await storage.getPageSeo(req.path);
        if (seo) {
          if (seo.ogTitle || seo.metaTitle) title = (seo.ogTitle || seo.metaTitle)!;
          if (seo.ogDescription || seo.metaDescription) description = (seo.ogDescription || seo.metaDescription)!;
          if (seo.ogImage) image = seo.ogImage.startsWith("http") ? seo.ogImage : `${host}${seo.ogImage}`;
          if (seo.canonicalUrl) canonicalUrl = seo.canonicalUrl;
        }
      }

      // Escape for HTML attribute safety
      const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      clearTimeout(timeout);
      if (res.headersSent) return;
      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonicalUrl)}">
<meta property="og:type" content="${blogSlugMatch ? "article" : "website"}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:url" content="${esc(canonicalUrl)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
</head>
<body></body>
</html>`);
    } catch (err) {
      clearTimeout(timeout);
      console.error("[og-bot] error:", err);
      if (!res.headersSent) next();
    }
  });

  // ── Legacy URL 301 Redirects ──────────────────────────────────────────────
  // Old URLs from email campaigns and social media → new URLs
  const LEGACY_REDIRECTS: Record<string, string> = {
    '/dermcharts':       '/specialties/dermatology',
    '/cardiocharts':     '/specialties/cardiology',
    '/obgyncharts':      '/specialties/obgyn',
    '/kidscharts':       '/specialties/pediatrics',
    '/urologycharts':    '/specialties/urology',
    '/familycharts':     '/specialties/family-medicine',
    '/orthocharts':      '/specialties/orthopedics',
    '/ophthalmocharts':  '/specialties/ophthalmology',
    '/entcharts':        '/specialties/ent',
    '/gastrocharts':     '/specialties/gastroenterology',
    '/neurologycharts':  '/specialties/neurology',
    '/psychiatrycharts': '/specialties/psychiatry',
  };

  app.use((req, res, next) => {
    const newPath = LEGACY_REDIRECTS[req.path.toLowerCase()];
    if (newPath) {
      return res.redirect(301, newPath);
    }
    next();
  });
  // ─────────────────────────────────────────────────────────────────────────
  // Contact Request API
  app.post("/api/contact", async (req, res) => {
    try {
      const validated = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validated);
      
      // Send email notification
      const emailResult = await sendContactEmail({
        firstName: validated.name.split(' ')[0] || validated.name,
        lastName: validated.name.split(' ').slice(1).join(' ') || '',
        email: validated.email,
        phone: validated.phone || undefined,
        company: validated.company || undefined,
        message: validated.message || undefined,
        requestType: validated.requestType || 'General Inquiry',
      });
      
      if (!emailResult.success) {
        console.error("Email notification failed:", emailResult.error);
      }
      
      res.status(201).json(contactRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Error creating contact request:", error);
        res.status(500).json({ error: "Failed to submit contact request" });
      }
    }
  });

  app.get("/api/contact-requests", isAuthenticated, async (req, res) => {
    try {
      const requests = await storage.getAllContactRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      res.status(500).json({ error: "Failed to fetch contact requests" });
    }
  });

  app.post("/api/white-paper-download", async (req, res) => {
    try {
      const validated = insertWhitePaperDownloadSchema.parse(req.body);
      const download = await storage.createWhitePaperDownload(validated);
      
      const emailResult = await sendWhitePaperDownloadEmail({
        whitePaperId: validated.whitePaperId,
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        practiceAddress: validated.practiceAddress,
        downloadReason: validated.downloadReason,
      });
      
      if (!emailResult.success) {
        console.error("Email notification failed:", emailResult.error);
      }
      
      res.status(201).json({ success: true, downloadId: download.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Error creating white paper download:", error);
        res.status(500).json({ error: "Failed to process download request" });
      }
    }
  });

  app.get("/api/white-paper-downloads", isAuthenticated, async (req, res) => {
    try {
      const downloads = await storage.getAllWhitePaperDownloads();
      res.json(downloads);
    } catch (error) {
      console.error("Error fetching white paper downloads:", error);
      res.status(500).json({ error: "Failed to fetch downloads" });
    }
  });

  const pageViewLimiter = new Map<string, number[]>();
  setInterval(() => pageViewLimiter.clear(), 60000);

  // Cache IP → location to avoid repeated API calls and stay within rate limits
  const geoCache = new Map<string, { country: string | null; city: string | null; region: string | null }>();

  // Map ISO 3166-1 alpha-2 country codes to full names (common countries)
  const COUNTRY_NAMES: Record<string, string> = {
    US: "United States", CA: "Canada", GB: "United Kingdom", AU: "Australia",
    IN: "India", DE: "Germany", FR: "France", NL: "Netherlands", SG: "Singapore",
    JP: "Japan", BR: "Brazil", MX: "Mexico", PK: "Pakistan", NG: "Nigeria",
    PH: "Philippines", ZA: "South Africa", AE: "United Arab Emirates", IE: "Ireland",
    IT: "Italy", ES: "Spain", SE: "Sweden", NO: "Norway", DK: "Denmark",
    FI: "Finland", PL: "Poland", CH: "Switzerland", NZ: "New Zealand",
    KR: "South Korea", CN: "China", TW: "Taiwan", HK: "Hong Kong",
    IL: "Israel", SA: "Saudi Arabia", EG: "Egypt", KE: "Kenya", GH: "Ghana",
  };

  app.post("/api/page-view", async (req, res) => {
    try {
      // Azure App Service puts the real client IP in X-Forwarded-For.
      // req.ip respects trust proxy and extracts it correctly.
      // Fall back to manual header parsing as a safety net.
      const rawXFF = req.headers["x-forwarded-for"] as string | undefined;
      const ip =
        (req.headers["cf-connecting-ip"] as string | undefined) ||
        rawXFF?.split(",")[0]?.trim() ||
        req.ip ||
        req.socket.remoteAddress ||
        "";

      // DIAGNOSTIC: log raw headers and extracted IP so we can verify in Azure Log Stream
      console.log("[geo-debug] x-forwarded-for:", rawXFF);
      console.log("[geo-debug] cf-connecting-ip:", req.headers["cf-connecting-ip"]);
      console.log("[geo-debug] req.ip:", req.ip);
      console.log("[geo-debug] extracted ip:", ip);

      const now = Date.now();
      const hits = pageViewLimiter.get(ip) || [];
      const recentHits = hits.filter(t => now - t < 10000);
      if (recentHits.length >= 5) {
        return res.status(429).json({ error: "Too many requests" });
      }
      recentHits.push(now);
      pageViewLimiter.set(ip, recentHits);

      const ua = req.headers["user-agent"] || "";
      let deviceType = "Desktop";
      if (/mobile/i.test(ua)) deviceType = "Mobile";
      else if (/tablet|ipad/i.test(ua)) deviceType = "Tablet";

      let browser = "Other";
      if (/edg/i.test(ua)) browser = "Edge";
      else if (/chrome/i.test(ua)) browser = "Chrome";
      else if (/firefox/i.test(ua)) browser = "Firefox";
      else if (/safari/i.test(ua)) browser = "Safari";

      let os = "Other";
      if (/windows/i.test(ua)) os = "Windows";
      else if (/mac/i.test(ua)) os = "macOS";
      else if (/linux/i.test(ua)) os = "Linux";
      else if (/android/i.test(ua)) os = "Android";
      else if (/iphone|ipad/i.test(ua)) os = "iOS";

      // Clean the IP once here — used for both geo lookup and storage
      // Azure App Service appends port to IP in X-Forwarded-For (e.g. "122.172.86.136:18504")
      let cleanIp = ip.replace(/^::ffff:/, "");
      if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(cleanIp)) {
        cleanIp = cleanIp.split(":")[0]; // "122.172.86.136:18504" → "122.172.86.136"
      }

      let country = null;
      let city = null;
      let region = null;

      // Method 1: Cloudflare header (instant, no API call needed)
      const cfCountryCode = (req.headers["cf-ipcountry"] as string || "").toUpperCase();
      if (cfCountryCode && cfCountryCode !== "XX" && cfCountryCode !== "T1") {
        country = COUNTRY_NAMES[cfCountryCode] || cfCountryCode;
      }

      // Method 2: Local geoip-lite database lookup (offline, works on any host)
      if (!country) {
        const isPrivate = /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|100\.|169\.254\.|::1$|localhost$)/.test(cleanIp);
        console.log("[geo-debug] cleanIp:", cleanIp, "| isPrivate:", isPrivate);
        if (cleanIp && !isPrivate) {
          if (geoCache.has(cleanIp)) {
            ({ country, city, region } = geoCache.get(cleanIp)!);
            console.log("[geo-debug] cache hit → country:", country);
          } else {
            const geo = geoipModule ? geoipModule.lookup(cleanIp) : null;
            console.log("[geo-debug] geoip.lookup result:", geo);
            if (geo) {
              country = geo.country ? (COUNTRY_NAMES[geo.country] || geo.country) : null;
              region = geo.region || null;
              city = geo.city || null;
            }
            geoCache.set(cleanIp, { country, city, region });
          }
        } else {
          console.log("[geo-debug] skipped lookup — ip is empty or private");
        }
      }

      console.log("[geo-debug] final location before DB insert → country:", country, "| city:", city, "| region:", region);

      const viewData = {
        path: req.body.path || "/",
        referrer: req.body.referrer || null,
        userAgent: ua,
        language: req.body.language || null,
        screenWidth: req.body.screenWidth || null,
        screenHeight: req.body.screenHeight || null,
        ipAddress: cleanIp || null,
        country,
        city,
        region,
        deviceType,
        browser,
        os,
        sessionId: req.body.sessionId || null,
      };

      await storage.createPageView(viewData);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error logging page view:", error);
      res.status(500).json({ error: "Failed to log page view" });
    }
  });

  app.get("/api/page-views/stats", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getPageViewStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching page view stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Returns distinct countries for the filter dropdown
  app.get("/api/visitors/countries", isAuthenticated, async (_req, res) => {
    try {
      const countries = await storage.getDistinctCountries();
      res.json(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  // Export visitors as CSV filtered by country and/or date range
  app.get("/api/visitors/export", isAuthenticated, async (req, res) => {
    try {
      const { country, startDate, endDate } = req.query;
      const filters: { country?: string; startDate?: Date; endDate?: Date } = {};
      if (country && typeof country === "string") filters.country = country;
      if (startDate && typeof startDate === "string") filters.startDate = new Date(startDate);
      if (endDate && typeof endDate === "string") filters.endDate = new Date(endDate);

      const views = await storage.getFilteredPageViews(filters);

      // Build CSV
      const headers = ["ID", "Page", "IP Address", "Country", "City", "Region", "Device", "Browser", "OS", "Date/Time"];
      const rows = views.map(v => [
        v.id,
        v.path,
        v.ipAddress || "",
        v.country || "",
        v.city || "",
        v.region || "",
        v.deviceType || "",
        v.browser || "",
        v.os || "",
        new Date(v.createdAt).toISOString(),
      ]);

      const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        .join("\n");

      const filename = `visitors_${country || "all"}_${new Date().toISOString().split("T")[0]}.csv`;
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(csv);
    } catch (error) {
      console.error("Error exporting visitors:", error);
      res.status(500).json({ error: "Failed to export visitors" });
    }
  });

  app.get("/api/notification-emails", isAuthenticated, async (req, res) => {
    try {
      const emails = await storage.getNotificationEmails();
      res.json(emails);
    } catch (error) {
      console.error("Error fetching notification emails:", error);
      res.status(500).json({ error: "Failed to fetch notification emails" });
    }
  });

  app.post("/api/notification-emails", isAuthenticated, async (req, res) => {
    try {
      const validated = insertNotificationEmailSchema.parse(req.body);
      const email = await storage.addNotificationEmail(validated);
      res.status(201).json(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid email data", details: error.errors });
      } else {
        console.error("Error adding notification email:", error);
        res.status(500).json({ error: "Failed to add notification email" });
      }
    }
  });

  app.delete("/api/notification-emails/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      await storage.deleteNotificationEmail(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting notification email:", error);
      res.status(500).json({ error: "Failed to delete notification email" });
    }
  });

  app.get("/api/settings/calendly", async (_req, res) => {
    try {
      const value = await storage.getSetting("calendly_url");
      res.json({ url: value || "https://calendly.com/testmouli4/30min" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });

  app.post("/api/settings/calendly", isAuthenticated, async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== "string") return res.status(400).json({ error: "Invalid URL" });
      await storage.setSetting("calendly_url", url);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save setting" });
    }
  });

  app.get("/api/config/ga", (_req, res) => {
    const gaId = process.env.GA_MEASUREMENT_ID || "";
    res.json({ gaId });
  });

  app.get("/api/page-views/recent", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const { country, startDate, endDate } = req.query;

      // If any filters are set, use getFilteredPageViews so we search the full dataset
      if (country || startDate || endDate) {
        const filters: { country?: string; startDate?: Date; endDate?: Date; limit?: number } = { limit };
        if (country && typeof country === "string") filters.country = country;
        if (startDate && typeof startDate === "string") filters.startDate = new Date(startDate);
        if (endDate && typeof endDate === "string") {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          filters.endDate = end;
        }
        const views = await storage.getFilteredPageViews(filters);
        return res.json(views);
      }

      const views = await storage.getRecentPageViews(limit);
      res.json(views);
    } catch (error) {
      console.error("Error fetching recent page views:", error);
      res.status(500).json({ error: "Failed to fetch recent views" });
    }
  });

  // ── Redirects API ────────────────────────────────────────────────────────
  app.get("/api/admin/redirects", isAuthenticated, async (_req, res) => {
    try {
      const all = await storage.getAllRedirects();
      res.json(all);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch redirects" });
    }
  });

  app.post("/api/admin/redirects", isAuthenticated, async (req, res) => {
    try {
      const { fromPath, toPath, statusCode } = req.body;
      if (!fromPath || !toPath) return res.status(400).json({ error: "fromPath and toPath are required" });
      // Normalize paths
      const from = fromPath.startsWith("/") ? fromPath : `/${fromPath}`;
      const redirect = await storage.createRedirect({ fromPath: from, toPath, statusCode: statusCode || 301 });
      redirectCache = new Map(); // invalidate cache immediately
      redirectCacheTime = 0;
      res.status(201).json(redirect);
    } catch (err: any) {
      if (err?.code === "23505") return res.status(409).json({ error: "A redirect from that path already exists" });
      console.error("Error creating redirect:", err);
      res.status(500).json({ error: "Failed to create redirect" });
    }
  });

  app.delete("/api/admin/redirects/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      await storage.deleteRedirect(id);
      redirectCache = new Map(); // invalidate cache
      redirectCacheTime = 0;
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete redirect" });
    }
  });

  // ── Image Upload ──────────────────────────────────────────────────────────
  // Uploaded images are stored in UPLOADS_DIR (default: <cwd>/uploads) and
  // served at /uploads/<filename>.  On Azure App Service set UPLOADS_DIR to
  // a persistent path such as D:\home\uploads (Windows) or /home/uploads (Linux)
  // so images survive redeployments.
  const uploadsDir = process.env.UPLOADS_DIR
    ? path.resolve(process.env.UPLOADS_DIR)
    : path.join(process.cwd(), "uploads");

  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    console.log("[uploads] directory ready:", uploadsDir);
  } catch (err) {
    // Non-fatal — fall back to a safe temp directory so the server keeps running
    console.error("[uploads] could not create uploads dir, falling back to os.tmpdir():", err);
  }

  // Serve uploaded images as static files
  app.use("/uploads", express.static(uploadsDir, { maxAge: "7d" }));

  const multerUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, uploadsDir),
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const name = `blog-${Date.now()}-${Math.random().toString(36).substr(2, 6)}${ext}`;
        cb(null, name);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    fileFilter: (_req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"));
      }
    },
  });

  // POST /api/admin/upload — upload a blog thumbnail image (admin only)
  app.post("/api/admin/upload", isAuthenticated, multerUpload.single("image"), (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No image file received" });
      return;
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  // ── Blog API ──────────────────────────────────────────────────────────────
  // Public: list published posts
  app.get("/api/blog/posts", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts(false);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Public: single post by slug
  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || !post.published) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Admin: list all posts (including drafts)
  app.get("/api/admin/blog/posts", isAuthenticated, async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts(true);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Admin: create post
  app.post("/api/admin/blog/posts", isAuthenticated, async (req, res) => {
    try {
      const post = await storage.createBlogPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  // Admin: update post
  app.put("/api/admin/blog/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const post = await storage.updateBlogPost(id, req.body);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  // Admin: delete post
  app.delete("/api/admin/blog/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // ── SEO API ───────────────────────────────────────────────────────────────
  // Public: get SEO for a specific page path
  app.get("/api/seo", async (req, res) => {
    try {
      const path = req.query.path as string;
      if (!path) return res.status(400).json({ error: "path is required" });
      const seo = await storage.getPageSeo(path);
      res.json(seo || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO data" });
    }
  });

  // Admin: get all page SEO entries
  app.get("/api/admin/seo", isAuthenticated, async (_req, res) => {
    try {
      const all = await storage.getAllPageSeo();
      res.json(all);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO data" });
    }
  });

  // Admin: upsert page SEO
  app.post("/api/admin/seo", isAuthenticated, async (req, res) => {
    try {
      const { path, metaTitle, metaDescription, focusKeyword, canonicalUrl, ogImage, ogTitle, ogDescription } = req.body;
      if (!path) return res.status(400).json({ error: "path is required" });
      const seo = await storage.upsertPageSeo({ path, metaTitle, metaDescription, focusKeyword, canonicalUrl, ogImage, ogTitle, ogDescription });
      res.json(seo);
    } catch (error) {
      console.error("Error saving SEO data:", error);
      res.status(500).json({ error: "Failed to save SEO data" });
    }
  });

  // ── Analytics Report ──────────────────────────────────────────────────────
  // GET /api/admin/analytics/countries — distinct country names in the DB
  app.get("/api/admin/analytics/countries", isAuthenticated, async (_req, res) => {
    try {
      const { pool } = await import("./db");
      const result = await pool.query(
        `SELECT DISTINCT country FROM page_views WHERE country IS NOT NULL AND country <> '' ORDER BY country`
      );
      res.json(result.rows.map((r: { country: string }) => r.country));
    } catch (err) {
      console.error("[analytics countries] error:", err);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  // GET /api/admin/analytics/report?from=YYYY-MM-DD&to=YYYY-MM-DD[&country=NAME]
  // Generates and downloads a self-contained HTML analytics report
  app.get("/api/admin/analytics/report", isAuthenticated, async (req, res) => {
    try {
      const { from, to, country } = req.query as { from: string; to: string; country?: string };
      if (!from || !to) {
        res.status(400).json({ error: "from and to query params are required (YYYY-MM-DD)" });
        return;
      }
      const { buildReportData, generateReportHtml } = await import("./analyticsReport");
      const data = await buildReportData({ from, to, country: country || undefined });
      const html = generateReportHtml(data);
      const safeCountry = country ? `_${country.toLowerCase()}` : "";
      const filename = `mdcharts_analytics_${from}_to_${to}${safeCountry}.html`;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(html);
    } catch (err) {
      console.error("[analytics report] error:", err);
      res.status(500).json({ error: "Failed to generate report" });
    }
  });

  return httpServer;
}
