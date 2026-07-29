import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for localhost and Vercel
app.use(cors({
  origin: "*", // Allows requests from Vite/Vercel during development
  credentials: true,
}));

app.use(express.json());

export default app;