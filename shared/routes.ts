import { z } from 'zod';
import { 
  insertProductSchema, 
  insertOrderSchema, 
  insertLeadSchema, 
  insertTechnicianSchema, 
  insertBlogPostSchema, 
  insertReviewSchema,
  products,
  orders,
  leads,
  technicians,
  blogPosts,
  reviews
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products',
      input: z.object({
        category: z.string().optional(),
        search: z.string().optional(),
        sort: z.enum(['price_asc', 'price_desc', 'newest']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:slug',
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    getById: {
      method: 'GET' as const,
      path: '/api/products/id/:id',
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: { // Admin only
      method: 'POST' as const,
      path: '/api/products',
      input: insertProductSchema,
      responses: {
        201: z.custom<typeof products.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: { // Admin only
      method: 'PUT' as const,
      path: '/api/products/:id',
      input: insertProductSchema.partial(),
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: { // Admin only
      method: 'DELETE' as const,
      path: '/api/products/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    }
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders',
      input: insertOrderSchema.extend({
        cartItems: z.array(z.object({
          productId: z.number(),
          qty: z.number(),
        })),
      }),
      responses: {
        201: z.custom<typeof orders.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/orders/:orderNumber',
      responses: {
        200: z.custom<typeof orders.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    verifyPayment: {
      method: 'POST' as const,
      path: '/api/orders/verify-payment',
      input: z.object({
        orderId: z.string(), // Razorpay Order ID
        paymentId: z.string(), // Razorpay Payment ID
        signature: z.string(),
      }),
      responses: {
        200: z.object({ success: z.boolean() }),
        400: errorSchemas.validation,
      },
    }
  },
  leads: {
    create: {
      method: 'POST' as const,
      path: '/api/leads',
      input: insertLeadSchema,
      responses: {
        201: z.custom<typeof leads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  technicians: {
    list: {
      method: 'GET' as const,
      path: '/api/technicians',
      input: z.object({ city: z.string().optional() }).optional(),
      responses: {
        200: z.array(z.custom<typeof technicians.$inferSelect>()),
      },
    },
  },
  blog: {
    list: {
      method: 'GET' as const,
      path: '/api/blog',
      responses: {
        200: z.array(z.custom<typeof blogPosts.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/blog/:slug',
      responses: {
        200: z.custom<typeof blogPosts.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  pricing: {
    list: {
      method: 'GET' as const,
      path: '/api/pricing',
      responses: {
        200: z.array(z.custom<any>()),
      },
    },
  },
  spareParts: {
    list: {
      method: 'GET' as const,
      path: '/api/spare-parts',
      responses: {
        200: z.array(z.custom<any>()),
      },
    },
  },
  amcPlans: {
    list: {
      method: 'GET' as const,
      path: '/api/amc-plans',
      responses: {
        200: z.array(z.custom<any>()),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
