import express from "express";
import { chatWithAI } from "../controllers/ai.controller.js";

console.log("✅ AI ROUTES LOADED");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Route Working",
  });
});

router.post("/chat", chatWithAI);

export default router;