import express from 'express';
import { pool } from './db';
import { createHash } from 'crypto';

export async function setupAuth(app: express.Express) {
  // Create users table if it doesn't exist
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL UNIQUE,
        email TEXT UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✅ Users table ready');
  } catch (err) {
    console.error('Failed to create users table:', err);
  }

  // Get current user
  app.get('/api/auth/user', async (_req, res) => {
    try {
      // For now, return null (no session support yet)
      res.json(null);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get user' });
    }
  });

  // Register new user
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;

      if (!name || !phone || !password) {
        return res.status(400).json({ error: 'Name, phone, and password are required' });
      }

      // Hash password using SHA256
      const passwordHash = createHash('sha256').update(password).digest('hex');

      const result = await pool.query(
        `INSERT INTO users (name, phone, email, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, phone, email, created_at`,
        [name, phone, email || null, passwordHash]
      );

      const user = result.rows[0];
      console.log('✅ User registered:', user.id, user.name);
      res.status(201).json(user);
    } catch (err: any) {
      if (err.code === '23505') { // Unique constraint violation
        return res.status(400).json({ error: 'Phone or email already registered' });
      }
      console.error('❌ Registration error:', err.message);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  // Login user
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({ error: 'Identifier and password are required' });
      }

      // Hash the provided password
      const passwordHash = createHash('sha256').update(password).digest('hex');

      // Find user by phone or email
      const result = await pool.query(
        `SELECT id, name, phone, email, created_at FROM users 
         WHERE (phone = $1 OR email = $1) AND password_hash = $2`,
        [identifier, passwordHash]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = result.rows[0];
      console.log('✅ User logged in:', user.id, user.name);
      res.json(user);
    } catch (err) {
      console.error('❌ Login error:', err);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Logout
  app.post('/api/auth/logout', (_req, res) => {
    res.json({ success: true });
  });
}
