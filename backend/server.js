import express from "express";
import cors from "cors";
import hospitalRoutes from "./routes/hospitals.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 5400;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", message: "Hospital Bed Connect demo API is running" }));
app.use("/api/hospitals", hospitalRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));