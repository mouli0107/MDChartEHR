import { contactRequests, whitePaperDownloads, pageViews, notificationEmails, siteSettings, blogPosts, pageSeo, redirects, type ContactRequest, type InsertContactRequest, type WhitePaperDownload, type InsertWhitePaperDownload, type PageView, type InsertPageView, type NotificationEmail, type InsertNotificationEmail, type BlogPost, type InsertBlogPost, type PageSeo, type InsertPageSeo, type Redirect, type InsertRedirect } from "@shared/schema";
import { db } from "./db";
import { desc, sql, gte, lte, count, eq, and, isNotNull } from "drizzle-orm";

export interface VisitorFilters {
  country?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export interface IStorage {
  createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest>;
  getAllContactRequests(): Promise<ContactRequest[]>;
  createWhitePaperDownload(insertDownload: InsertWhitePaperDownload): Promise<WhitePaperDownload>;
  getAllWhitePaperDownloads(): Promise<WhitePaperDownload[]>;
  createPageView(insertView: InsertPageView): Promise<PageView>;
  getRecentPageViews(limit: number): Promise<PageView[]>;
  getFilteredPageViews(filters: VisitorFilters): Promise<PageView[]>;
  getDistinctCountries(): Promise<string[]>;
  getNotificationEmails(): Promise<NotificationEmail[]>;
  addNotificationEmail(data: InsertNotificationEmail): Promise<NotificationEmail>;
  deleteNotificationEmail(id: number): Promise<void>;
  getSetting(key: string): Promise<string | null>;
  setSetting(key: string, value: string): Promise<void>;
  // Blog
  getAllBlogPosts(includeUnpublished?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getBlogPostById(id: number): Promise<BlogPost | null>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  // Page SEO
  getAllPageSeo(): Promise<PageSeo[]>;
  getPageSeo(path: string): Promise<PageSeo | null>;
  upsertPageSeo(data: InsertPageSeo): Promise<PageSeo>;
  // Redirects
  getAllRedirects(): Promise<Redirect[]>;
  createRedirect(data: InsertRedirect): Promise<Redirect>;
  deleteRedirect(id: number): Promise<void>;
  getRedirectMap(): Promise<Map<string, { toPath: string; statusCode: number }>>;
  getPageViewStats(): Promise<{
    totalViews: number;
    todayViews: number;
    topPages: { path: string; views: number }[];
    deviceBreakdown: { deviceType: string; views: number }[];
    browserBreakdown: { browser: string; views: number }[];
    locationBreakdown: { country: string; views: number }[];
    hourlyViews: { hour: string; views: number }[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const [request] = await db
      .insert(contactRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return await db.select().from(contactRequests).orderBy(desc(contactRequests.createdAt));
  }

  async createWhitePaperDownload(insertDownload: InsertWhitePaperDownload): Promise<WhitePaperDownload> {
    const [download] = await db
      .insert(whitePaperDownloads)
      .values(insertDownload)
      .returning();
    return download;
  }

  async getAllWhitePaperDownloads(): Promise<WhitePaperDownload[]> {
    return await db.select().from(whitePaperDownloads).orderBy(desc(whitePaperDownloads.createdAt));
  }

  async createPageView(insertView: InsertPageView): Promise<PageView> {
    const [view] = await db
      .insert(pageViews)
      .values(insertView)
      .returning();
    return view;
  }

  async getRecentPageViews(limit: number): Promise<PageView[]> {
    return await db.select().from(pageViews).orderBy(desc(pageViews.createdAt)).limit(limit);
  }

  async getFilteredPageViews(filters: VisitorFilters): Promise<PageView[]> {
    const conditions = [];
    if (filters.country) {
      conditions.push(eq(pageViews.country, filters.country));
    }
    if (filters.startDate) {
      conditions.push(gte(pageViews.createdAt, filters.startDate));
    }
    if (filters.endDate) {
      // Include the full end day by setting time to 23:59:59
      const endOfDay = new Date(filters.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      conditions.push(lte(pageViews.createdAt, endOfDay));
    }
    const query = db.select().from(pageViews).orderBy(desc(pageViews.createdAt));
    if (conditions.length > 0) {
      return await query.where(and(...conditions)).limit(filters.limit || 10000);
    }
    return await query.limit(filters.limit || 10000);
  }

  async getDistinctCountries(): Promise<string[]> {
    const rows = await db
      .selectDistinct({ country: pageViews.country })
      .from(pageViews)
      .where(isNotNull(pageViews.country))
      .orderBy(pageViews.country);
    return rows.map(r => r.country!).filter(Boolean);
  }

  async getNotificationEmails(): Promise<NotificationEmail[]> {
    return await db.select().from(notificationEmails).orderBy(desc(notificationEmails.createdAt));
  }

  async addNotificationEmail(data: InsertNotificationEmail): Promise<NotificationEmail> {
    const [email] = await db.insert(notificationEmails).values(data).returning();
    return email;
  }

  async deleteNotificationEmail(id: number): Promise<void> {
    await db.delete(notificationEmails).where(eq(notificationEmails.id, id));
  }

  async getSetting(key: string): Promise<string | null> {
    const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return row?.value ?? null;
  }

  async setSetting(key: string, value: string): Promise<void> {
    await db.insert(siteSettings).values({ key, value })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } });
  }

  async getPageViewStats() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [totalResult] = await db.select({ count: count() }).from(pageViews);
    const [todayResult] = await db.select({ count: count() }).from(pageViews).where(gte(pageViews.createdAt, startOfToday));

    const topPages = await db
      .select({ path: pageViews.path, views: count() })
      .from(pageViews)
      .groupBy(pageViews.path)
      .orderBy(desc(count()))
      .limit(10);

    const deviceBreakdown = await db
      .select({ deviceType: pageViews.deviceType, views: count() })
      .from(pageViews)
      .groupBy(pageViews.deviceType)
      .orderBy(desc(count()));

    const browserBreakdown = await db
      .select({ browser: pageViews.browser, views: count() })
      .from(pageViews)
      .groupBy(pageViews.browser)
      .orderBy(desc(count()))
      .limit(5);

    const locationBreakdown = await db
      .select({ country: pageViews.country, views: count() })
      .from(pageViews)
      .groupBy(pageViews.country)
      .orderBy(desc(count()))
      .limit(10);

    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const hourlyViews = await db
      .select({
        hour: sql<string>`to_char(${pageViews.createdAt}, 'HH24:00')`,
        views: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, last24h))
      .groupBy(sql`to_char(${pageViews.createdAt}, 'HH24:00')`)
      .orderBy(sql`to_char(${pageViews.createdAt}, 'HH24:00')`);

    return {
      totalViews: totalResult.count,
      todayViews: todayResult.count,
      topPages: topPages.map(p => ({ path: p.path, views: p.views })),
      deviceBreakdown: deviceBreakdown.map(d => ({ deviceType: d.deviceType || "Unknown", views: d.views })),
      browserBreakdown: browserBreakdown.map(b => ({ browser: b.browser || "Unknown", views: b.views })),
      locationBreakdown: locationBreakdown.map(l => ({ country: l.country || "Unknown", views: l.views })),
      hourlyViews: hourlyViews.map(h => ({ hour: h.hour, views: h.views })),
    };
  }

  async getAllBlogPosts(includeUnpublished = false): Promise<BlogPost[]> {
    if (includeUnpublished) {
      return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    }
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post ?? null;
  }

  async getBlogPostById(id: number): Promise<BlogPost | null> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post ?? null;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getAllPageSeo(): Promise<PageSeo[]> {
    return await db.select().from(pageSeo).orderBy(pageSeo.path);
  }

  async getPageSeo(path: string): Promise<PageSeo | null> {
    const [row] = await db.select().from(pageSeo).where(eq(pageSeo.path, path));
    return row ?? null;
  }

  async upsertPageSeo(data: InsertPageSeo): Promise<PageSeo> {
    const [row] = await db
      .insert(pageSeo)
      .values(data)
      .onConflictDoUpdate({
        target: pageSeo.path,
        set: {
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          focusKeyword: data.focusKeyword,
          canonicalUrl: data.canonicalUrl,
          ogImage: data.ogImage,
          ogTitle: data.ogTitle,
          ogDescription: data.ogDescription,
          updatedAt: new Date(),
        },
      })
      .returning();
    return row;
  }

  async getAllRedirects(): Promise<Redirect[]> {
    return await db.select().from(redirects).orderBy(desc(redirects.createdAt));
  }

  async createRedirect(data: InsertRedirect): Promise<Redirect> {
    const [row] = await db.insert(redirects).values(data).returning();
    return row;
  }

  async deleteRedirect(id: number): Promise<void> {
    await db.delete(redirects).where(eq(redirects.id, id));
  }

  async getRedirectMap(): Promise<Map<string, { toPath: string; statusCode: number }>> {
    const rows = await db.select().from(redirects);
    const map = new Map<string, { toPath: string; statusCode: number }>();
    for (const row of rows) {
      map.set(row.fromPath, { toPath: row.toPath, statusCode: row.statusCode });
    }
    return map;
  }
}

export const storage = new DatabaseStorage();

