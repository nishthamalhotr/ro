import cors from "cors";
import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { setupAuth } from "./auth";

const app = express();
app.set("trust proxy", 1);

/* ================= CORS FIX ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
/* ============================================ */

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const httpServer = createServer(app);

/* ================= BODY PARSING ================= */
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/* =============================================== */

/* ================= LOGGER ================= */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  const originalJson = res.json;
  res.json = function (body: any, ...args: any[]) {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
    return originalJson.apply(res, [body]);
  };

  next();
});
/* ========================================== */

/* ================= MAIN BOOTSTRAP ================= */
(async () => {
  /* AUTH */
  await setupAuth(app);

  /* ROUTES — your routes expect server */
  await registerRoutes(httpServer);

  /* ERROR HANDLER */
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) return next(err);
    res.status(status).json({ message });
  });

  /* ================= VITE FIX ================= */
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    try {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    } catch (err) {
      console.log("Vite not attached (safe mode)");
    }
  }
  /* ============================================ */

  const port = parseInt(process.env.PORT || "5000", 10);

  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();