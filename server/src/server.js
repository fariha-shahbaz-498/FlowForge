import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Listen locally if not in production on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("====================================");
    console.log("🚀 FlowForge Backend Started Locally");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("====================================");
  });
}

// Export app for Vercel Serverless execution
export default app;