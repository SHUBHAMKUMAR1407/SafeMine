import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allow requests only from the frontend URL
    credentials: true, // Include cookies in requests
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import workerRouter from "./routes/worker.routes.js";
import detailRouter from "./routes/detail.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/workers", workerRouter);
app.use("/api/v1/details", detailRouter);

export { app };
