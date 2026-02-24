import { z } from "zod";

// USER
export const insertUserSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  password: z.string(),
});

// LEAD
export const insertLeadSchema = z.object({
  name: z.string(),
  phone: z.string(),
  service: z.string(),
});

// PRODUCT
export const insertProductSchema = z.object({
  title: z.string(),
  price: z.number(),
});

// ORDER
export const insertOrderSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});
