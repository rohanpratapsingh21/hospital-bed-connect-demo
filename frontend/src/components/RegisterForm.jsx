import React, { useState } from "react";
import { registerHospital } from "../api.js";

const initial = { hospitalName: "", ownership: "Private", city: "", state: "", contactName: "", email: "" };

export default function RegisterForm() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setMessage(""); setError("");
    try {
      const result = await registerHospital(form);
      setMessage(`${result.message} Request #${result.application.id}`);
      setForm(initial);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return (
    <section className="panel" id="register">
      <div className="section-heading">
        <div><p className="eyebrow">PARTNER WITH US</p><h2>Register your hospital</h2></div>
        <span className="heading-icon">＋</span>
      </div>
      <p className="muted">Submit a registration request. Admin verification is required before any hospital information can be published.</p>
      <form className="form-grid" onSubmit={submit}>
        <label>Hospital name<input name="hospitalName" value={form.hospitalName} onChange={change} required /></label>
        <label>Ownership<select name="ownership" value={form.ownership} onChange={change}><option>Private</option><option>Government</option></select></label>
        <label>City<input name="city" value={form.city} onChange={change} required /></label>
        <label>State<input name="state" value={form.state} onChange={change} required /></label>
        <label>Contact person<input name="contactName" value={form.contactName} onChange={change} required /></label>
        <label>Contact email<input name="email" type="email" value={form.email} onChange={change} required /></label>
        <button className="primary-button form-submit" disabled={busy}>{busy ? "Submitting..." : "Submit registration"}</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}
