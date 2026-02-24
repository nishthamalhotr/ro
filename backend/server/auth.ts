import express, { type Request, type Response, type NextFunction } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { db } from "./db";
import { users, type User } from "@shared/schema";
import { eq, or } from "drizzle-orm";
import pkg from 'google-libphonenumber';

const { PhoneNumberUtil, PhoneNumberFormat } = pkg;
const phoneUtil = PhoneNumberUtil.getInstance();

function normalizePhone(phone: string): string {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone, 'IN');
    if (!phoneUtil.isValidNumber(number)) {
      throw new Error("Invalid phone number");
    }
    return phoneUtil.format(number, PhoneNumberFormat.E164);
  } catch (err) {
    throw new Error("Invalid phone number format. Please provide a valid number with country code (e.g., +918700762477)");
  }
}

const PostgresStore = connectPg(session);

export function setupAuth(app: express.Express) {
  const sessionSecret = process.env.SESSION_SECRET || "fallback_secret_for_dev_only";
  if (!process.env.SESSION_SECRET) {
    console.warn("Warning: SESSION_SECRET is missing. Using insecure fallback.");
  }

  app.use(
    session({
      store: new PostgresStore({
        conObject: {
          connectionString: process.env.DATABASE_URL,
          ssl: false,
        },
        createTableIfMissing: true,
      }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: app.get("env") === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
    })
  );

  const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { error: "Too many attempts, please try again later" },
  });

  app.use("/api/auth", authLimit);

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { name, email, password, confirmPassword, phone } = req.body;
      
      if (!name || !phone || !password || !confirmPassword) {
        return res.status(400).json({ error: "Missing required fields (name, phone, password, confirmPassword)" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
      }

      let normalized;
      try {
        normalized = normalizePhone(phone);
      } catch (err: any) {
        return res.status(400).json({ error: err.message });
      }

      // Check phone uniqueness
      const [existingPhone] = await db.select().from(users).where(eq(users.phone, normalized)).limit(1);
      if (existingPhone) {
        return res.status(409).json({ error: "Phone number already registered" });
      }

      // Check email uniqueness if provided
      if (email) {
        const [existingEmail] = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (existingEmail) {
          return res.status(409).json({ error: "Email already registered" });
        }
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const [user] = await db.insert(users).values({
        name,
        email: email || null,
        passwordHash,
        phone: normalized,
        updatedAt: new Date(),
      }).returning();

      req.session.userId = user.id;
      const { passwordHash: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      let queryIdentifier = identifier;
      try {
        // Try to normalize if it looks like a phone number
        if (/^\+?[\d\s-]{10,}$/.test(identifier)) {
          queryIdentifier = normalizePhone(identifier);
        }
      } catch (err) {
        // Not a valid phone number, treat as email
      }

      const [user] = await db.select().from(users)
        .where(or(eq(users.phone, queryIdentifier), eq(users.email, queryIdentifier)))
        .limit(1);

      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      const { passwordHash: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Could not log out" });
      res.clearCookie("connect.sid");
      res.sendStatus(200);
    });
  });

  app.get("/api/auth/user", async (req: Request, res: Response) => {
    if (!req.session.userId) return res.json(null);
    try {
      const [user] = await db.select().from(users).where(eq(users.id, req.session.userId)).limit(1);
      if (!user) return res.json(null);
      const { passwordHash: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) return next();
  res.status(401).json({ error: "Authentication required" });
}

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
