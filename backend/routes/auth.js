import { Router } from "express";

const router = Router();
const applications = [];
const bedRequests = [];

router.post("/register-hospital", (req, res) => {
  const { hospitalName, city, state, contactName, email, ownership } = req.body;
  if (![hospitalName, city, state, contactName, email, ownership].every((v) => String(v || "").trim())) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }
  const application = {
    id: applications.length + 1,
    hospitalName, city, state, contactName, email, ownership,
    status: "pending demo approval",
    submittedAt: new Date().toISOString()
  };
  applications.push(application);
  res.status(201).json({ message: "Registration request received (demo only).", application });
});

router.get("/applications", (_req, res) => {
  res.json({ demo: true, applications });
});

router.post("/bed-requests", (req, res) => {
  const { patientName, phone, hospitalId, hospitalName, bedType } = req.body;
  if (![patientName, phone, hospitalId, hospitalName, bedType].every((value) => String(value || "").trim())) {
    return res.status(400).json({ message: "Please fill in all request details." });
  }
  const request = { id: bedRequests.length + 1, patientName, phone, hospitalId, hospitalName, bedType, status: "pending demo review", submittedAt: new Date().toISOString() };
  bedRequests.push(request);
  res.status(201).json({ message: "Bed request received (demo only).", request });
});

router.get("/bed-requests", (_req, res) => res.json({ demo: true, requests: bedRequests }));

export default router;
