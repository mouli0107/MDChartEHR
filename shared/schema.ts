import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  requestType: text("request_type").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequests.$inferSelect;

export const whitePaperDownloads = pgTable("white_paper_downloads", {
  id: serial("id").primaryKey(),
  whitePaperId: text("white_paper_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  practiceAddress: text("practice_address").notNull(),
  downloadReason: text("download_reason").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWhitePaperDownloadSchema = createInsertSchema(whitePaperDownloads).omit({
  id: true,
  createdAt: true,
});

export type InsertWhitePaperDownload = z.infer<typeof insertWhitePaperDownloadSchema>;
export type WhitePaperDownload = typeof whitePaperDownloads.$inferSelect;

export const notificationEmails = pgTable("notification_emails", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNotificationEmailSchema = createInsertSchema(notificationEmails).omit({
  id: true,
  createdAt: true,
});

export type InsertNotificationEmail = z.infer<typeof insertNotificationEmailSchema>;
export type NotificationEmail = typeof notificationEmails.$inferSelect;

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  language: text("language"),
  screenWidth: integer("screen_width"),
  screenHeight: integer("screen_height"),
  ipAddress: text("ip_address"),
  country: text("country"),
  city: text("city"),
  region: text("region"),
  deviceType: text("device_type"),
  browser: text("browser"),
  os: text("os"),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  createdAt: true,
});

export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type PageView = typeof pageViews.$inferSelect;

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  categoryLabel: text("category_label").notNull(),
  author: text("author").notNull(),
  publishedAt: text("published_at").notNull(),
  readTime: text("read_time").notNull(),
  image: text("image"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export const pageSeo = pgTable("page_seo", {
  path: text("path").primaryKey(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  canonicalUrl: text("canonical_url"),
  ogImage: text("og_image"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageSeoSchema = createInsertSchema(pageSeo);
export type InsertPageSeo = z.infer<typeof insertPageSeoSchema>;
export type PageSeo = typeof pageSeo.$inferSelect;

export const redirects = pgTable("redirects", {
  id: serial("id").primaryKey(),
  fromPath: text("from_path").notNull().unique(),
  toPath: text("to_path").notNull(),
  statusCode: integer("status_code").default(301).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRedirectSchema = createInsertSchema(redirects).omit({ id: true, createdAt: true });
export type InsertRedirect = z.infer<typeof insertRedirectSchema>;
export type Redirect = typeof redirects.$inferSelect;

export const trialEnrollments = pgTable("trial_enrollments", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull(),
  practiceName: text("practice_name").notNull(),
  specialty: text("specialty").notNull(),
  street: text("street").notNull(),
  suite: text("suite"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  officePhone: text("office_phone").notNull(),
  cellPhone: text("cell_phone").notNull(),
  email: text("email").notNull(),
  mfaMethod: text("mfa_method").notNull(),
  billingType: text("billing_type"),
  insuranceProcessing: text("insurance_processing"),
  encountersPerMonth: text("encounters_per_month"),
  selectedAddons: text("selected_addons"),
  labIntegration: text("lab_integration"),
  labNames: text("lab_names"),
  dataMigration: text("data_migration"),
  migrationSource: text("migration_source"),
  migrationEhrName: text("migration_ehr_name"),
  providers: text("providers"),
  idVerificationMethod: text("id_verification_method"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTrialEnrollmentSchema = createInsertSchema(trialEnrollments).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertTrialEnrollment = z.infer<typeof insertTrialEnrollmentSchema>;
export type TrialEnrollment = typeof trialEnrollments.$inferSelect;

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  tokenPrefix: text("token_prefix").notNull(),
  allowedIp: text("allowed_ip"),
  isActive: boolean("is_active").default(true).notNull(),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ApiKey = typeof apiKeys.$inferSelect;
