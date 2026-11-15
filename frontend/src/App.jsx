import React, { useEffect, useMemo, useState } from "react";
import { getHospitals } from "./api.js";
import SearchBar from "./components/SearchBar.jsx";
import HospitalCard from "./components/HospitalCard.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import HospitalDashboard from "./components/HospitalDashboard.jsx";
import EmergencyMatch from "./components/EmergencyMatch.jsx";
import BedRequestModal from "./components/BedRequestModal.jsx";

const specialtyByHospital = {
  1: ["Trauma", "Cardiology"], 2: ["Cardiology", "Neurology"], 3: ["Cancer", "Transplant"], 4: ["Cancer", "Oncology"],
  5: ["Multi-speciality", "Trauma"], 6: ["Multi-speciality", "Pediatric"], 7: ["Cardiology", "Cancer"], 8: ["Neurology", "Trauma"],
  9: ["Multi-speciality", "Trauma"], 10: ["Transplant", "Neurology"], 11: ["Pediatric", "Cancer"], 12: ["Multi-speciality", "Trauma"]
};

export default function App() {
  const [page, setPage] = useState("directory");
  const [query, setQuery] = useState("");
  const [bedType, setBedType] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [language, setLanguage] = useState("en");
  const [bedRequest, setBedRequest] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    getHospitals(query, bedType).then((data) => { setHospitals(data.hospitals); setError(""); })
      .catch((err) => setError(`${err.message}. Is the backend running on port 5400?`));
  }, [query, bedType, refreshKey]);

  const stats = useMemo(() => ({
    hospitals: hospitals.length,
    beds: hospitals.reduce((sum, h) => sum + Object.values(h.beds).reduce((n, b) => n + b.total, 0), 0),
    available: hospitals.reduce((sum, h) => sum + Object.values(h.beds).reduce((n, b) => n + b.total - b.occupied, 0), 0)
  }), [hospitals]);

  const navigate = (nextPage) => { setPage(nextPage); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const enrichedHospitals = useMemo(() => hospitals.map((hospital) => ({ ...hospital, specialties: specialtyByHospital[hospital.id] || ["Multi-speciality"] })), [hospitals]);
  const displayedHospitals = useMemo(() => enrichedHospitals.filter((hospital) => specialty === "all" || hospital.specialties.includes(specialty)), [enrichedHospitals, specialty]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand brand-button" onClick={() => navigate("directory")}><span className="brand-mark">✚</span><span>Bed<span className="brand-accent">Connect</span><small>INDIA HOSPITAL DIRECTORY</small></span></button>
        <nav><button className={page === "directory" ? "active" : ""} onClick={() => navigate("directory")}>{language === "hi" ? "बेड खोजें" : "Find beds"}</button><button className={page === "hospital" ? "active" : ""} onClick={() => navigate("hospital")}>{language === "hi" ? "हॉस्पिटल पोर्टल" : "Hospital portal"}</button><button className="language-toggle" onClick={() => setLanguage(language === "en" ? "hi" : "en")}>{language === "en" ? "हिंदी" : "English"}</button><button className="nav-cta" onClick={() => navigate("register")}>{language === "hi" ? "हॉस्पिटल जोड़ें" : "Register hospital ↗"}</button></nav>
      </header>

      <main>
        {page === "directory" && <><section className="hero">
          <div className="hero-copy">
            <span className="pill"><span className="live-dot"></span> PAN-INDIA HOSPITAL DIRECTORY</span>
            <h1>{language === "hi" ? "देखभाल खोजें।" : "Find care."}<br /><span>{language === "hi" ? "पूरे भारत में।" : "Across India."}</span></h1>
            <p>{language === "hi" ? "शहर, राज्य या bed category से hospitals खोजें। यात्रा से पहले उपलब्धता की अस्पताल से सीधे पुष्टि करें।" : "Search recognised hospitals by city, state, or bed category. Always confirm availability directly with the hospital before travelling."}</p>
            <button className="hero-link" onClick={() => document.getElementById("hospitals")?.scrollIntoView({ behavior: "smooth" })}>{language === "hi" ? "हॉस्पिटल देखें" : "Explore hospitals"} <span>↓</span></button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-circle circle-one"></div><div className="art-circle circle-two"></div>
            <div className="cross-card"><span>✚</span><strong>Care, connected.</strong><small>Hospital discovery platform</small></div>
              <div className="floating-card"><span className="floating-icon">⌖</span><div><strong>Pan-India directory</strong><small>12 major cities covered</small></div></div>
          </div>
        </section>

        <section className="stats-row">
          <div><span>Hospitals in results</span><strong>{stats.hospitals}</strong></div>
          <div><span>Listed bed capacity*</span><strong>{stats.beds.toLocaleString("en-IN")}</strong></div>
          <div><span>Illustrative availability*</span><strong>{stats.available.toLocaleString("en-IN")}</strong></div>
          <p>*Demo availability, not live data.</p>
        </section>

        <EmergencyMatch hospitals={enrichedHospitals} onRequest={(hospital, type) => setBedRequest({ ...hospital, bedType: type })} language={language} />

        <section className="directory-section" id="hospitals">
          <div className="section-heading">
            <div><p className="eyebrow">HOSPITAL DIRECTORY</p><h2>Care options, city by city</h2></div>
            <span className="result-count">{hospitals.length} hospitals</span>
          </div>
          <SearchBar query={query} setQuery={setQuery} bedType={bedType} setBedType={setBedType} specialty={specialty} setSpecialty={setSpecialty} />
          <div className="city-map"><div><p className="eyebrow">EXPLORE BY CITY</p><h3>India care map</h3></div><div className="city-pins">{[...new Set(enrichedHospitals.map((h) => h.city))].map((city) => <button key={city} onClick={() => setQuery(city)}>⌖ {city}</button>)}</div></div>
          {error && <div className="error-banner">{error}</div>}
          {!error && hospitals.length === 0 && <div className="empty-state">No hospitals match this search. Try another city, state, or category.</div>}
          <div className="hospital-grid">{displayedHospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} onRequest={(selected, type) => setBedRequest({ ...selected, bedType: type })} />)}</div>
        </section></>}
        {page === "hospital" && <section className="portal-page"><div className="portal-intro"><p className="eyebrow">SECURE PARTNER AREA</p><h1>Hospital partner portal</h1><p>Update your facility’s displayed bed position from a dedicated workspace.</p></div><HospitalDashboard refreshKey={refreshKey} onUpdated={() => setRefreshKey((v) => v + 1)} /></section>}
        {page === "register" && <section className="portal-page"><div className="portal-intro"><p className="eyebrow">HOSPITAL ONBOARDING</p><h1>Join the BedConnect network</h1><p>Submit your hospital’s details to request directory access.</p></div><RegisterForm /></section>}
        <section className="notice"><span>ⓘ</span><p><strong>Important availability note</strong> Hospital names and locations in this directory are real. Bed counts are illustrative project data only, are not connected to hospital systems, and must not be used for emergency or medical decisions. Call the hospital directly before travelling.</p></section>
      </main>
      <footer><button className="brand brand-button footer-brand" onClick={() => navigate("directory")}><span className="brand-mark">✚</span><span>Bed<span className="brand-accent">Connect</span><small>COLLEGE PROJECT DEMO</small></span></button><span>Designed to make hospital discovery clearer.</span></footer>
      <BedRequestModal request={bedRequest} onClose={() => setBedRequest(null)} />
    </div>
  );
}
