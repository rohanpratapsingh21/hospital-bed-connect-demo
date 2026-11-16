import { Router } from "express";
import { getDb } from "../database.js";

const router = Router();
const bedTypes = ["general", "icu", "oxygen"];

function toHospital(rows) {
  const byId = new Map();
  for (const row of rows) {
    if (!byId.has(row.id)) {
      byId.set(row.id, {
        id: row.id, name: row.name, city: row.city, state: row.state, ownership: row.ownership,
        address: row.address, phone: row.phone, updatedAt: row.updated_at, demo: true, beds: {}
      });
    }
    byId.get(row.id).beds[row.bed_type] = { total: row.total, occupied: row.occupied };
  }
  return [...byId.values()].map((hospital) => ({
    ...hospital,
    availableBeds: Object.fromEntries(Object.entries(hospital.beds).map(([type, beds]) => [type, beds.total - beds.occupied]))
  }));
}

async function findHospitals(query = "", type = "all") {
  const db = getDb();
  const like = `%${query}%`;
  const params = [like, like, like, like];
  let typeClause = "";
  if (type !== "all") { typeClause = " AND EXISTS (SELECT 1 FROM bed_inventory filter_beds WHERE filter_beds.hospital_id = h.id AND filter_beds.bed_type = ?)"; params.push(type); }
  const [rows] = await db.execute(
    `SELECT h.*, b.bed_type, b.total, b.occupied, b.updated_at
     FROM hospitals h JOIN bed_inventory b ON b.hospital_id = h.id
     WHERE (h.name LIKE ? OR h.city LIKE ? OR h.state LIKE ? OR h.address LIKE ?)${typeClause}
     ORDER BY h.name, b.bed_type`,
    params
  );
  return toHospital(rows);
}

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q || "");
    const type = String(req.query.type || "all").toLowerCase();
    if (type !== "all" && !bedTypes.includes(type)) return res.status(400).json({ message: "Unknown bed type" });
    res.json({ demo: true, hospitals: await findHospitals(q, type) });
  } catch (error) { next(error); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const hospitals = await findHospitals("");
    const hospital = hospitals.find((item) => item.id === Number(req.params.id));
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.json(hospital);
  } catch (error) { next(error); }
});

router.patch("/:id/beds", async (req, res, next) => {
  try {
    const { bedType, total, occupied } = req.body;
    if (!bedTypes.includes(bedType)) return res.status(400).json({ message: "Bed type must be general, icu, or oxygen" });
    if (!Number.isInteger(total) || !Number.isInteger(occupied) || total < 0 || occupied < 0 || occupied > total) {
      return res.status(400).json({ message: "Use valid non-negative integer counts; occupied cannot exceed total." });
    }
    const db = getDb();
    const [result] = await db.execute(
      "UPDATE bed_inventory SET total = ?, occupied = ? WHERE hospital_id = ? AND bed_type = ?",
      [total, occupied, Number(req.params.id), bedType]
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Hospital or bed type not found" });
    const hospital = (await findHospitals("")).find((item) => item.id === Number(req.params.id));
    res.json({ message: "Demo bed availability updated", hospital });
  } catch (error) { next(error); }
});

export default router;