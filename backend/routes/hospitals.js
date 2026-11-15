import { Router } from "express";
import { hospitals } from "../data/hospitals.js";

const router = Router();

router.get("/", (req, res) => {
  const q = String(req.query.q || "").toLowerCase();
  const type = String(req.query.type || "all").toLowerCase();
  const results = hospitals.filter((hospital) => {
    const matchesText = [hospital.name, hospital.city, hospital.state, hospital.address]
      .some((value) => value.toLowerCase().includes(q));
    const matchesType = type === "all" || type === "general" || Object.hasOwn(hospital.beds, type);
    return matchesText && matchesType;
  }).map((hospital) => ({
    ...hospital,
    availableBeds: Object.fromEntries(
      Object.entries(hospital.beds).map(([key, value]) => [key, value.total - value.occupied])
    )
  }));
  res.json({ demo: true, hospitals: results });
});

router.get("/:id", (req, res) => {
  const hospital = hospitals.find((item) => item.id === Number(req.params.id));
  if (!hospital) return res.status(404).json({ message: "Hospital not found" });
  res.json(hospital);
});

router.patch("/:id/beds", (req, res) => {
  const hospital = hospitals.find((item) => item.id === Number(req.params.id));
  if (!hospital) return res.status(404).json({ message: "Hospital not found" });

  const { bedType, total, occupied } = req.body;
  if (!Object.hasOwn(hospital.beds, bedType)) {
    return res.status(400).json({ message: "Bed type must be general, icu, or oxygen" });
  }
  if (!Number.isInteger(total) || !Number.isInteger(occupied) || total < 0 || occupied < 0 || occupied > total) {
    return res.status(400).json({ message: "Use valid non-negative integer counts; occupied cannot exceed total." });
  }
  hospital.beds[bedType] = { total, occupied };
  hospital.updatedAt = new Date().toISOString();
  res.json({ message: "Demo bed availability updated", hospital });
});

export default router;