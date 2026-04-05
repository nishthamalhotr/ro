import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
// @ts-ignore
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

/**
 * Safe Vite middleware
 * - Works even if client folder is missing
 * - Prevents ENOENT crashes
 */
export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Universal catch-all handler
  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html"
      );

      // 🛑 Prevent crash if frontend missing
      if (!fs.existsSync(clientTemplate)) {
        res.status(200).send(`
          <h2>Backend running ✅</h2>
          <p>Frontend dev server not attached.</p>
          <p>Run frontend separately:</p>
          <pre>cd frontend && npm run dev</pre>
        `);
        return;
      }

      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      // cache-busting for dev
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const page = await vite.transformIndexHtml(url, template);

      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

