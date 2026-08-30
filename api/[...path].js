import app from "../server/src/app.js";
import connectDB from "../server/src/config/db.js";

await connectDB();

export default app;