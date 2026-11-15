import React, { useEffect, useState } from "react";
import { getHospitals, updateBeds } from "../api.js";

export default function HospitalDashboard({ refreshKey, onUpdated }) {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState("1");
  const [bedType, setBedType] = useState("general");
  const [total, setTotal] = useState("100");
  const [occupied, setOccupied] = useState("72");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getHospitals().then(({ hospitals }) => {
      setHospitals(hospitals);
      if (hospitals.length) syncFields(hospitals[0], "general");
    }).catch((e) => setError(e.message));
  }, [refreshKey]);

  function syncFields(hospital, type) {
    const b = hospital.beds[type];
    if (!b) return;
    setHospitalId(String(hospital.id)); setBedType(type);
    setTotal(String(b.total)); setOccupied(String(b.occupied));
  }

  function selectHospital(id) {
    const selected = hospitals.find((h) => String(h.id) === id);
    if (selected) syncFields(selected, bedType);
  }

  async function submit(e) {
    e.preventDefault(); setMessage(""); setError("");
    try {
      const result = await updateBeds(Number(hospitalId), { bedType, total: Number(total), occupied: Number(occupied) });
      setMessage(`Updated ${bedType} beds for ${result.hospital.name}.`);
      onUpdated();
    } catch (err) { setError(err.message); }
  }

  return (
    <section className="panel" id="dashboard">
      <div className="section-heading">
        <div><p className="eyebrow">HOSPITAL PORTAL</p><h2>Bed availability dashboard</h2></div>
        <span className="heading-icon">▦</span>
      </div>
      <p className="muted">Demo mode only: no login is enabled. In production, restrict this area to verified hospital staff and connect it to the hospital’s authorised bed-management feed.</p>
      <div className="analytics-strip"><div><span>Facilities</span><strong>{hospitals.length}</strong></div><div><span>Available beds</span><strong>{hospitals.reduce((sum, hospital) => sum + Object.values(hospital.beds).reduce((n, bed) => n + bed.total - bed.occupied, 0), 0)}</strong></div><div><span>Occupancy</span><strong>{hospitals.length ? `${Math.round((hospitals.reduce((sum, hospital) => sum + Object.values(hospital.beds).reduce((n, bed) => n + bed.occupied, 0), 0) / hospitals.reduce((sum, hospital) => sum + Object.values(hospital.beds).reduce((n, bed) => n + bed.total, 0), 0)) * 100)}%` : "—"}</strong></div></div>
      <form className="form-grid" onSubmit={submit}>
        <label className="full-field">Choose demo hospital
          <select value={hospitalId} onChange={(e) => selectHospital(e.target.value)}>
            {hospitals.map((h) => <option key={h.id} value={h.id}>{h.name} — {h.city}</option>)}
          </select>
        </label>
        <label>Bed category<select value={bedType} onChange={(e) => {
          const type = e.target.value; setBedType(type);
          const selected = hospitals.find((h) => String(h.id) === hospitalId);
          if (selected?.beds[type]) { setTotal(String(selected.beds[type].total)); setOccupied(String(selected.beds[type].occupied)); }
        }}><option value="general">General</option><option value="icu">ICU</option><option value="oxygen">Oxygen-supported</option></select></label>
        <label>Total beds<input type="number" min="0" value={total} onChange={(e) => setTotal(e.target.value)} required /></label>
        <label>Occupied beds<input type="number" min="0" max={total} value={occupied} onChange={(e) => setOccupied(e.target.value)} required /></label>
        <div className="available-preview"><span>Available beds</span><strong>{Math.max(0, Number(total || 0) - Number(occupied || 0))}</strong></div>
        <button className="primary-button form-submit">Save demo update</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}
