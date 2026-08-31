import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// ===============================
// CORS
// ===============================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

// ===============================
// HEALTH / TEST ROUTES
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FlowForge API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FlowForge API is healthy",
  });
});

// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/users", userRoutes);
// Vercel serverless compatibility routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "FlowForge API is healthy",
  });
});

app.get("/api/debug", (req, res) => {
  res.json({
    success: true,
    url: req.url,
    originalUrl: req.originalUrl,
    path: req.path,
    method: req.method,
  });
});
// ===============================
// EXPORT
// ===============================

export default app;