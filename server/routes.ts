import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema, insertWhitePaperDownloadSchema, insertPageViewSchema, insertNotificationEmailSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail, sendWhitePaperDownloadEmail } from "./resend";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import geoip from "geoip-lite";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

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
        // Azure App Service appends port to IP in X-Forwarded-For (e.g. "122.172.86.136:18504")
        // Strip IPv4-mapped IPv6 prefix, then strip the port if present
        let cleanIp = ip.replace(/^::ffff:/, "");
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(cleanIp)) {
          cleanIp = cleanIp.split(":")[0]; // "122.172.86.136:18504" → "122.172.86.136"
        }
        const isPrivate = /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|100\.|169\.254\.|::1$|localhost$)/.test(cleanIp);
        console.log("[geo-debug] cleanIp:", cleanIp, "| isPrivate:", isPrivate);
        if (cleanIp && !isPrivate) {
          if (geoCache.has(cleanIp)) {
            ({ country, city, region } = geoCache.get(cleanIp)!);
            console.log("[geo-debug] cache hit → country:", country);
          } else {
            const geo = geoip.lookup(cleanIp);
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
      const headers = ["ID", "Page", "Country", "City", "Region", "Device", "Browser", "OS", "Date/Time"];
      const rows = views.map(v => [
        v.id,
        v.path,
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
      const views = await storage.getRecentPageViews(limit);
      res.json(views);
    } catch (error) {
      console.error("Error fetching recent page views:", error);
      res.status(500).json({ error: "Failed to fetch recent views" });
    }
  });

  return httpServer;
}
