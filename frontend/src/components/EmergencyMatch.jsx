import React, { useMemo, useState } from "react";

const label = { general: "General", icu: "ICU", oxygen: "Oxygen-supported" };

export default function EmergencyMatch({ hospitals, onRequest, language }) {
  const [city, setCity] = useState("");
  const [need, setNeed] = useState("icu");
  const [urgency, setUrgency] = useState("urgent");
  const [searched, setSearched] = useState(false);
  const matches = useMemo(() => hospitals.map((hospital) => {
    const available = hospital.beds[need].total - hospital.beds[need].occupied;
    const local = city && hospital.city.toLowerCase().includes(city.toLowerCase());
    return { ...hospital, available, score: available * 2 + (local ? 40 : 0) + (urgency === "critical" && need === "icu" ? 15 : 0) };
  }).filter((hospital) => hospital.available > 0).sort((a, b) => b.score - a.score).slice(0, 3), [hospitals, city, need, urgency]);

  return <section className="emergency-match">
    <div className="emergency-title"><div><p className="eyebrow">EMERGENCY BED MATCH</p><h2>{language === "hi" ? "सही bed, जल्दी खोजें" : "Find the right bed, faster."}</h2><p>Smart demo ranking based on availability, required care and city.</p></div><span className="emergency-badge">24 × 7 DEMO</span></div>
    <div className="match-controls">
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Patient city (optional)" />
      <select value={need} onChange={(e) => setNeed(e.target.value)}><option value="icu">ICU</option><option value="oxygen">Oxygen-supported</option><option value="general">General</option></select>
      <select value={urgency} onChange={(e) => setUrgency(e.target.value)}><option value="critical">Critical</option><option value="urgent">Urgent</option><option value="standard">Standard</option></select>
      <button className="emergency-button" onClick={() => setSearched(true)}>Find best matches</button>
    </div>
    {searched && <div className="match-results">{matches.map((hospital, index) => <article key={hospital.id} className="match-card"><span className="match-rank">#{index + 1}</span><div><strong>{hospital.name}</strong><small>{hospital.city}, {hospital.state} · {label[need]}</small></div><b>{hospital.available} <small>available</small></b><button onClick={() => onRequest(hospital, need)}>Request</button></article>)}{!matches.length && <p className="empty-state">No illustrative match found. Contact emergency services or nearby hospitals directly.</p>}</div>}
  </section>;
}
