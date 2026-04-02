// src/app.ts
import express, { Application,  Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan"; // moragn → fixed
import fs from "fs";
import path from "path";

// Store server start time
const startTime = new Date();

// Read version from package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")
);
const serverVersion = packageJson.version;
import { mainRoutes } from "./app/apiRoutes";
import globalErrorHandler from "./app/middleware/globalErrorHandeller";

import helmet from "helmet";
import rateLimiter from "./app/config/rateLimit";
import { logger } from "./app/utils/logger";
import { sanitizeMiddleware } from "./app/middleware/sanitizeMiddleware";
import { swaggerDoc } from "./app/config/swagger";

// ==============================
// App Configuration
// ==============================
const app: Application = express();

// -------------------------------
// Rate limiter
// -------------------------------
app.use(rateLimiter);

// -------------------------------
// Helmet
// -------------------------------
app.use(helmet());

app.disable("x-powered-by");

// -------------------------------
// Morgan
// -------------------------------
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// -------------------------------
// CORS
// -------------------------------
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// -------------------------------
// Body & Cookie
// -------------------------------
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------------
// Sanitize
// -------------------------------
app.use(sanitizeMiddleware);

// -------------------------------
// Routes
// -------------------------------


app.get("/", (req: Request, res: Response) => {
  const now = new Date();
  const uptimeMs = now.getTime() - startTime.getTime();
  const uptimeSeconds = Math.floor(uptimeMs / 1000);
  const uptimeMinutes = Math.floor(uptimeSeconds / 60);
  const uptimeHours = Math.floor(uptimeMinutes / 60);
  const uptimeDays = Math.floor(uptimeHours / 24);

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server Status</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #0f172a;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: #1e293b;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .status {
          color: #22c55e;
          font-size: 20px;
          margin-top: 10px;
        }
        .info {
          margin-top: 15px;
          font-size: 16px;
          color: #94a3b8;
        }
        a {
          color: #3b82f6;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>👑 Royal Palace Server</h1>
        <p class="status">✅ Server is Running</p>
        <div class="info">
          <p>Version: ${serverVersion}</p>
          <p>Uptime: ${uptimeDays}d ${uptimeHours % 24}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s</p>
          <p>Current Time: ${now.toLocaleString()}</p>
          <p><a href="/api-docs" target="_blank">📄 Documentation</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});



swaggerDoc(app);

mainRoutes(app);

// -------------------------------
// 404
// -------------------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Page Not Found" });
});


// ==============================
// GLOBAL ERROR HANDLER (LAST)
// ==============================
app.use(globalErrorHandler);

export default app;
