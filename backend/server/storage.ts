/**
 * server/storage.ts
 * Schema-free safe storage stub — returns fallbacks so backend can run.
 * Replace with real DB code after you restore shared/schema.
 */
import { pool } from "./db";

async function ensureLeadsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      city TEXT NOT NULL,
      message TEXT,
      service_type TEXT,
      status TEXT DEFAULT 'new',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `);
}

/* keep types locally minimal to avoid schema dependency */
export interface IStorage {
  getUser(id: string): Promise<any | undefined>;
  getProducts(filters?: any): Promise<any[]>;
  getProduct(slug: string): Promise<any | undefined>;
  getProductById(id: number): Promise<any | undefined>;
  createProduct(product: any): Promise<any>;
  updateProduct(id: number, updates: any): Promise<any | undefined>;
  deleteProduct(id: number): Promise<void>;

  createOrder(order: any): Promise<any>;
  getOrder(orderNumber: string): Promise<any | undefined>;
  updateOrder(id: number, updates: any): Promise<any | undefined>;

  createLead(lead: any): Promise<any>;

  getTechnicians(city?: string): Promise<any[]>;
  createTechnician(tech: any): Promise<any>;

  getBlogPosts(): Promise<any[]>;
  getBlogPost(slug: string): Promise<any | undefined>;
  createBlogPost(post: any): Promise<any>;

  createReview(review: any): Promise<any>;
  getReviews(productId: number): Promise<any[]>;

  getPricing(): Promise<any[]>;
  getSpareParts(): Promise<any[]>;
  getAmcPlans(): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // NOTE: these are stubs — they let the server run until you restore the real schema.
  async getUser(id: string) { return undefined; }

  async getProducts(filters?: any) { return []; }
  async getProduct(slug: string) { return undefined; }
  async getProductById(id: number) { return undefined; }
  async createProduct(product: any) { return { id: Date.now(), ...product }; }
  async updateProduct(id: number, updates: any) { return { id, ...updates }; }
  async deleteProduct(id: number) { /* noop */ }

  async createOrder(order: any) { return { id: Date.now(), ...order }; }
  async getOrder(orderNumber: string) { return undefined; }
  async updateOrder(id: number, updates: any) { return { id, ...updates }; }

  async createLead(lead: any) {
    await ensureLeadsTable();

    const result = await pool.query(
      `INSERT INTO leads (name, phone, email, city, message, service_type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, phone, email, city, message, service_type AS "serviceType", status, created_at AS "createdAt"`,
      [
        lead.name,
        lead.phone,
        lead.email ?? null,
        lead.city,
        lead.message ?? null,
        lead.serviceType,
      ],
    );

    return result.rows[0];
  }

  async getTechnicians(city?: string) { return []; }
  async createTechnician(tech: any) { return { id: Date.now(), ...tech }; }

  // Blog fallbacks
  async getBlogPosts() { return []; }
  async getBlogPost(slug: string) { return undefined; }
  async createBlogPost(post: any) { return { id: Date.now(), ...post }; }

  // Reviews fallbacks
  async createReview(review: any) { return { id: Date.now(), ...review }; }
  async getReviews(productId: number) { return []; }

  // Pricing / spare parts / amc plans fallbacks
  async getPricing() { return []; }
  async getSpareParts() { return []; }
  async getAmcPlans() { return []; }
}

export const storage = new DatabaseStorage();
