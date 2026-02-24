import { db } from "./db";
import { 
  users, products, orders, leads, technicians, blogPosts, reviews,
  type UpsertUser, type User,
  type InsertProduct, type Product,
  type InsertOrder, type Order,
  type InsertLead, type Lead,
  type InsertTechnician, type Technician,
  type InsertBlogPost, type BlogPost,
  type InsertReview, type Review
} from "@shared/schema";
import { eq, desc, ilike, or, and } from "drizzle-orm";

export interface IStorage {
  // Users (Auth handles this mostly, but good to have access)
  getUser(id: string): Promise<User | undefined>;
  
  // Products
  getProducts(filters?: {category?: string, search?: string, sort?: string}): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | undefined>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<void>;

  // Orders
  createOrder(order: any): Promise<Order>;
  getOrder(orderNumber: string): Promise<Order | undefined>;
  updateOrder(id: number, updates: any): Promise<Order | undefined>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  
  // Technicians
  getTechnicians(city?: string): Promise<Technician[]>;
  createTechnician(tech: InsertTechnician): Promise<Technician>;
  
  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Reviews
  createReview(review: InsertReview): Promise<Review>;
  getReviews(productId: number): Promise<Review[]>;

  // New features
  getPricing(): Promise<any[]>;
  getSpareParts(): Promise<any[]>;
  getAmcPlans(): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  // Products
  async getProducts(filters?: {category?: string, search?: string, sort?: string}): Promise<Product[]> {
    let query = db.select().from(products);
    const conditions = [];

    if (filters?.category) {
      conditions.push(eq(products.category, filters.category));
    }
    
    if (filters?.search) {
      conditions.push(or(
        ilike(products.name, `%${filters.search}%`),
        ilike(products.brand, `%${filters.search}%`),
        ilike(products.shortDescription, `%${filters.search}%`)
      ));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    if (filters?.sort === 'price_asc') {
      query = query.orderBy(products.salePrice) as any;
    } else if (filters?.sort === 'price_desc') {
      query = query.orderBy(desc(products.salePrice)) as any;
    } else {
      query = query.orderBy(desc(products.createdAt)) as any;
    }

    return await query;
  }

  async getProduct(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(products).set(updates).where(eq(products.id, id)).returning();
    return updated;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Orders
  async createOrder(order: any): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async getOrder(orderNumber: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
    return order;
  }

  async updateOrder(id: number, updates: any): Promise<Order | undefined> {
    const [updated] = await db.update(orders).set(updates).where(eq(orders.id, id)).returning();
    return updated;
  }

  // Leads
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  // Technicians
  async getTechnicians(city?: string): Promise<Technician[]> {
    if (city) {
      return await db.select().from(technicians).where(ilike(technicians.city, `%${city}%`));
    }
    return await db.select().from(technicians);
  }

  async createTechnician(tech: InsertTechnician): Promise<Technician> {
    const [newTech] = await db.insert(technicians).values(tech).returning();
    return newTech;
  }

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  // Reviews
  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }
  
  async getReviews(productId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.approved, true)));
  }

  async getPricing(): Promise<any[]> {
    const { pricing } = await import("@shared/schema");
    return await db.select().from(pricing);
  }

  async getSpareParts(): Promise<any[]> {
    const { spareParts } = await import("@shared/schema");
    return await db.select().from(spareParts);
  }

  async getAmcPlans(): Promise<any[]> {
    const { amcPlans } = await import("@shared/schema");
    return await db.select().from(amcPlans);
  }
}

export const storage = new DatabaseStorage();
