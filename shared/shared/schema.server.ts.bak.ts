import { pgTable, text, serial, integer, boolean, timestamp, jsonb, doublePrecision, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations, sql } from "drizzle-orm";

// --- Users ---
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(), // primary identifier
  phoneVerified: boolean("phone_verified").default(false),
  email: text("email").unique(), // optional
  emailVerified: boolean("email_verified").default(false),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("user"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  role: true, 
  isActive: true,
  phoneVerified: true,
  emailVerified: true
}).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// --- Enums ---
export const CATEGORIES = ["RO", "UV", "UF", "Industrial", "Filter"] as const;
export const PAYMENT_STATUS = ["pending", "paid", "failed"] as const;
export const ORDER_STATUS = ["placed", "confirmed", "shipped", "installed", "completed", "cancelled"] as const;
export const ROLES = ["customer", "admin", "technician"] as const;

// --- Products ---
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  category: text("category").notNull(), // One of CATEGORIES
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description"), // HTML
  specs: jsonb("specs").$type<Record<string, string>>().default({}),
  price: doublePrecision("price").notNull(), // MRP
  salePrice: doublePrecision("sale_price").notNull(),
  warrantyMonths: integer("warranty_months").default(12),
  images: text("images").array().default([]),
  stock: integer("stock").default(0),
  sku: text("sku"),
  tags: text("tags").array().default([]),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Orders ---
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  userId: varchar("user_id").references(() => users.id), // Link to Auth User
  guestInfo: jsonb("guest_info").$type<{name: string, email: string, phone: string, address: string}>(), // For guest checkout
  items: jsonb("items").notNull().$type<{productId: number, qty: number, price: number, name: string}[]>(),
  subtotal: doublePrecision("subtotal").notNull(),
  tax: doublePrecision("tax").notNull(),
  shipping: doublePrecision("shipping").notNull(),
  totalAmount: doublePrecision("total_amount").notNull(),
  paymentStatus: text("payment_status").default("pending"),
  orderStatus: text("order_status").default("placed"),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Leads (Contact Forms) ---
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  city: text("city").notNull(),
  message: text("message"),
  serviceType: text("service_type"), // 'Installation', 'Repair', 'AMC'
  status: text("status").default("new"), // new, contacted, converted, closed
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Technicians ---
export const technicians = pgTable("technicians", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  city: text("city").notNull(),
  areas: text("areas").array().default([]),
  rating: doublePrecision("rating").default(5.0),
  isAvailable: boolean("is_available").default(true),
});

// --- Blog Posts ---
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(), // HTML
  coverImage: text("cover_image"),
  author: text("author").default("AquaShield Team"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Reviews ---
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  userId: varchar("user_id").references(() => users.id),
  userName: text("user_name"), // Fallback if user deleted
  rating: integer("rating").notNull(),
  comment: text("comment"),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Pricing Table ---
export const pricing = pgTable("pricing", {
  id: serial("id").primaryKey(),
  serviceName: text("service_name").notNull(),
  category: text("category").notNull(), // 'Domestic', 'Commercial'
  price: integer("price").notNull(),
  description: text("description"),
});

// --- Spare Parts ---
export const spareParts = pgTable("spare_parts", {
  id: serial("id").primaryKey(),
  partName: text("part_name").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
});

// --- AMC Plans ---
export const amcPlans = pgTable("amc_plans", {
  id: serial("id").primaryKey(),
  planName: text("plan_name").notNull(),
  price: integer("price").notNull(),
  features: text("features").array().default([]),
  coverage: text("coverage"), // Details about membrane/electrical coverage
});

export const insertPricingSchema = createInsertSchema(pricing).omit({ id: true });
export const insertSparePartSchema = createInsertSchema(spareParts).omit({ id: true });
export const insertAmcPlanSchema = createInsertSchema(amcPlans).omit({ id: true });

export type Pricing = typeof pricing.$inferSelect;
export type SparePart = typeof spareParts.$inferSelect;
export type AmcPlan = typeof amcPlans.$inferSelect;
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, orderNumber: true, paymentStatus: true, orderStatus: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true, status: true });
export const insertTechnicianSchema = createInsertSchema(technicians).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true, approved: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Technician = typeof technicians.$inferSelect;
export type InsertTechnician = z.infer<typeof insertTechnicianSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
