import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Lightweight health endpoint for external checks
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
// Robust CORS handling: allow when CORS_ORIGIN is not configured, otherwise restrict
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // No origin (server-to-server or same-origin) -> allow
  if (!origin) return next();

  // If no allowed origins configured, allow all origins
  if (allowedOrigins.length === 0) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    return next();
  }

  // If origin included in allowed list, allow it
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    return next();
  }

  // Disallowed origin
  return res.status(403).json({ success: false, message: 'CORS origin not allowed' });
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import workerRouter from "./routes/worker.routes.js";
import detailRouter from "./routes/detail.routes.js";
import contactRouter from "./routes/contact.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/workers", workerRouter);
app.use("/api/v1/details", detailRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/feedback", feedbackRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // Ensure CORS headers on error responses so browsers don't block them
  try {
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
  } catch (e) {
    // ignore
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || []
  });
});

export { app };
