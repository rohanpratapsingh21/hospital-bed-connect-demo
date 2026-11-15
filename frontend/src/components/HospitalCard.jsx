import React from "react";

const labels = { general: "General", icu: "ICU", oxygen: "Oxygen" };

export default function HospitalCard({ hospital, onRequest }) {
  return (
    <article className="hospital-card">
      <div className="card-top">
        <div className="hospital-icon">✚</div>
        <span className={`tag ${hospital.ownership === "Government" ? "government" : "private"}`}>{hospital.ownership}</span>
      </div>
      <h3>{hospital.name}</h3>
      <p className="muted">⌖ {hospital.city}, {hospital.state}</p>
      <p className="address">{hospital.address}</p>
      <div className="specialty-list">{hospital.specialties?.map((specialty) => <span key={specialty}>{specialty}</span>)}</div>
      <div className="bed-grid">
        {Object.entries(hospital.beds).map(([type, beds]) => (
          <div className="bed-stat" key={type}>
            <span>{labels[type]}</span>
            <strong>{beds.total - beds.occupied}</strong>
            <small>available / {beds.total} total</small>
          </div>
        ))}
      </div>
      <div className="card-bottom">
        <a href={`tel:${hospital.phone.replace(/[^+\d]/g, "")}`}>☎ Call hospital</a>
        <span className="demo-status">ILLUSTRATIVE AVAILABILITY</span>
      </div>
      <button className="request-button" onClick={() => onRequest?.(hospital, "icu")}>Request a bed →</button>
      <p className="updated">Last illustrative update: {new Date(hospital.updatedAt).toLocaleString()}</p>
    </article>
  );
}
