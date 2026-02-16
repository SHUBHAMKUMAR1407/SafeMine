import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

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
  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || []
  });
});

export { app };
