/**
 * Universal-safe routes.ts
 * Works whether index.ts passes Express app or HTTP server
 */
import express from 'express';
import { storage } from './storage';

function resolveExpressApp(appOrServer: any): express.Express {
  // If already express
  if (typeof appOrServer.get === 'function') return appOrServer;

  // If http server
  if (appOrServer?.listeners) {
    const listeners = appOrServer.listeners('request');
    if (listeners?.length) return listeners[0];
  }

  throw new Error('Could not resolve Express app');
}

export function registerRoutes(appOrServer: any) {
  const app = resolveExpressApp(appOrServer);

  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  app.get('/api/products', async (req, res) => {
    const data = await storage.getProducts(req.query);
    res.json(data);
  });

  app.get('/api/products/:slug', async (req, res) => {
    const product = await storage.getProduct(req.params.slug);
    res.json(product ?? null);
  });

  app.post('/api/orders', async (req, res) => {
    const order = await storage.createOrder(req.body);
    res.json(order);
  });

  app.post('/api/leads', async (req, res) => {
    const lead = await storage.createLead(req.body);
    res.json(lead);
  });

  app.get('/api/technicians', async (req, res) => {
    const techs = await storage.getTechnicians(req.query.city as string | undefined);
    res.json(techs);
  });

  return app;
}
