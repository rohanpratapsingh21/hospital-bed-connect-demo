import React from "react";

export default function SearchBar({ query, setQuery, bedType, setBedType, specialty, setSpecialty }) {
  return (
    <div className="searchbar">
      <label className="search-field">
        <span>Search by city, state or hospital</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try Sonipat, Delhi, Jaipur..." />
      </label>
      <label className="type-field">
        <span>Bed category</span>
        <select value={bedType} onChange={(e) => setBedType(e.target.value)}>
          <option value="all">All categories</option>
          <option value="general">General</option>
          <option value="icu">ICU</option>
          <option value="oxygen">Oxygen-supported</option>
        </select>
      </label>
      <label className="type-field">
        <span>Speciality</span>
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="all">All specialities</option><option>Trauma</option><option>Cardiology</option><option>Cancer</option><option>Neurology</option><option>Pediatric</option><option>Transplant</option><option>Multi-speciality</option>
        </select>
      </label>
    </div>
  );
}
