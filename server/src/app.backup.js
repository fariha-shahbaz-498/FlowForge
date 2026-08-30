import express from "express";
import cors from "cors";

const app = express();

// Allow local frontend to communicate with backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

export default app;