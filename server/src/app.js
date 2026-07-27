import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import projectRoutes from "./routes/project.routes.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Body parser FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS SECOND
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Security
app.use(helmet());

// Logger
app.use(morgan("dev"));
app.use("/api/projects", projectRoutes);
// Cookies
app.use(cookieParser());

// Rate Limit
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 FlowForge API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;