import React, { useState } from "react";
import { createBedRequest } from "../api.js";

export default function BedRequestModal({ request, onClose }) {
  const [form, setForm] = useState({ patientName: "", phone: "" });
  const [status, setStatus] = useState("");
  if (!request) return null;
  async function submit(event) {
    event.preventDefault();
    try { const result = await createBedRequest({ ...form, hospitalId: request.id, hospitalName: request.name, bedType: request.bedType }); setStatus(`Request #${result.request.id} submitted. Status: ${result.request.status}.`); }
    catch (error) { setStatus(error.message); }
  }
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="request-modal"><button className="modal-close" onClick={onClose}>×</button><p className="eyebrow">BED REQUEST DEMO</p><h2>Request {request.bedType.toUpperCase()} bed</h2><p className="muted">{request.name}</p>{status ? <div className="success-message">{status}</div> : <form className="form-grid" onSubmit={submit}><label>Patient name<input required value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} /></label><label>Mobile number<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label><button className="primary-button form-submit">Submit demo request</button></form>}<p className="request-note">This does not reserve a bed or contact the hospital. Call the hospital directly for emergencies.</p></div></div>;
}
