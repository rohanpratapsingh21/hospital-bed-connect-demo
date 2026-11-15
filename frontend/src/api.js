const API_BASE = "http://localhost:5400/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const getHospitals = (q = "", type = "all") =>
  request(`/hospitals?q=${encodeURIComponent(q)}&type=${encodeURIComponent(type)}`);

export const updateBeds = (id, payload) =>
  request(`/hospitals/${id}/beds`, { method: "PATCH", body: JSON.stringify(payload) });

export const registerHospital = (payload) =>
  request("/register-hospital", { method: "POST", body: JSON.stringify(payload) });

export const createBedRequest = (payload) =>
  request("/bed-requests", { method: "POST", body: JSON.stringify(payload) });
