import { z } from "zod";

// USER
export const insertUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be valid"),
  email: z.string().email().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type User = z.infer<typeof insertUserSchema>;

// LEAD
export const insertLeadSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  city: z.string(),
  message: z.string(),
  serviceType: z.string(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;

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
