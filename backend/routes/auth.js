import { Router } from "express";
import { getDb } from "../database.js";

const router = Router();
const bedTypes = ["general", "icu", "oxygen"];

function requireAdmin(req, res, next) {
  if (!process.env.ADMIN_API_KEY || req.get("x-admin-key") !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: "Admin access required." });
  }
  next();
}

router.post("/register-hospital", async (req, res, next) => {
  try {
    const { hospitalName, city, state, contactName, email, ownership } = req.body;
    if (![hospitalName, city, state, contactName, email, ownership].every((value) => String(value || "").trim())) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const db = getDb();
    const [result] = await db.execute(
      "INSERT INTO hospital_applications (hospital_name, ownership, city, state, contact_name, email) VALUES (?, ?, ?, ?, ?, ?)",
      [hospitalName, ownership, city, state, contactName, email]
    );
    res.status(201).json({ message: "Registration request received (demo only).", application: { id: result.insertId, status: "pending demo approval" } });
  } catch (error) { next(error); }
});

router.get("/applications", requireAdmin, async (_req, res, next) => {
  try {
    const [applications] = await getDb().query("SELECT * FROM hospital_applications ORDER BY submitted_at DESC");
    res.json({ demo: true, applications });
  } catch (error) { next(error); }
});

router.post("/bed-requests", async (req, res, next) => {
  try {
    const { patientName, phone, hospitalId, hospitalName, bedType } = req.body;
    if (![patientName, phone, hospitalId, hospitalName, bedType].every((value) => String(value || "").trim())) {
      return res.status(400).json({ message: "Please fill in all request details." });
    }
    if (!bedTypes.includes(bedType)) return res.status(400).json({ message: "Unknown bed type" });
    const db = getDb();
    const [result] = await db.execute(
      "INSERT INTO bed_requests (hospital_id, hospital_name, patient_name, phone, bed_type) VALUES (?, ?, ?, ?, ?)",
      [hospitalId, hospitalName, patientName, phone, bedType]
    );
    res.status(201).json({ message: "Bed request received (demo only).", request: { id: result.insertId, status: "pending demo review" } });
  } catch (error) { next(error); }
});

router.get("/bed-requests", requireAdmin, async (_req, res, next) => {
  try {
    const [requests] = await getDb().query("SELECT * FROM bed_requests ORDER BY submitted_at DESC");
    res.json({ demo: true, requests });
  } catch (error) { next(error); }
});

export default router;