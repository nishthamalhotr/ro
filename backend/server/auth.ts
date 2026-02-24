/**
 * server/auth.ts
 * Stub auth that matches index.ts (setupAuth)
 */
import express from 'express';

export function setupAuth(app: express.Express) {

  app.get('/api/me', (_req, res) => {
    res.json({ user: null });
  });

  app.post('/api/login', (_req, res) => {
    res.json({ success: true, user: null });
  });

  app.post('/api/register', (_req, res) => {
    res.json({ success: true });
  });

}
