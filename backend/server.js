import express from "express";
import cors from "cors";
import hospitalRoutes from "./routes/hospitals.js";
import authRoutes from "./routes/auth.js";
import { initializeDatabase } from "./database.js";

const app = express();
const PORT = process.env.PORT || 5400;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", message: "Hospital Bed Connect demo API is running" }));
app.use("/api/hospitals", hospitalRoutes);
app.use("/api", authRoutes);
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Database request failed. Check MySQL configuration." });
});

initializeDatabase()
  .then(() => app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`)))
  .catch((error) => { console.error("Database initialization failed:", error.message); process.exit(1); });