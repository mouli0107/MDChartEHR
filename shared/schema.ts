import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
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
