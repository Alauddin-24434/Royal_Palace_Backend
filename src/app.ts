// src/app.ts
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan"; // moragn → fixed

import { envVariable } from "./app/config";
import { mainRoutes } from "./app/apiRoutes";
import globalErrorHandler from "./app/middleware/globalErrorHandeller";
import { RedisStore } from "connect-redis";
import helmet from "helmet";
import rateLimiter from "./app/config/rateLimit";
import { logger } from "./app/utils/logger";
import { sanitizeMiddleware } from "./app/middleware/sanitizeMiddleware";
import { swaggerDoc } from "./app/config/swagger";
import * as Sentry from "@sentry/node";

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
app.get("/api/debug-sentry", function mainHandler(req, res) {
  // Send a log before throwing the error
  Sentry.logger.info('User triggered test error', {
    action: 'test_error_endpoint',
  });
  // Send a test metric before throwing the error
  Sentry.metrics.count('test_counter', 1);
  throw new Error("My first Sentry error!");
})

app.get("/", (req, res) => {
  res.json({ success: true, message: "Royal Palace Server Is Running" });
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
// SENTRY ERROR HANDLER (BEFORE GLOBAL)
// ==============================
// MUST be before your global handler
// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// ==============================
// GLOBAL ERROR HANDLER (LAST)
// ==============================
app.use(globalErrorHandler);

export default app;
