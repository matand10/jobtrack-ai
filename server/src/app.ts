import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { healthRouter } from "./routes/health.routes";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRouter } from "./routes/auth.route";
import { applicationRouter } from "./routes/application.routes";
import { authMiddleware } from "./middleware/auth.middleware";

export const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use(healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/applications", authMiddleware, applicationRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
