const API_BASE = "/api";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
}

// AUTH
export const signup = (email, password) =>
  request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const login = (email, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

// ITINERARIES
export const generateItinerary = (payload) =>
  request("/itineraries/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const saveItinerary = (payload) =>
  request("/itineraries", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const listItineraries = () => request("/itineraries");

export const getItinerary = (id) => request(`/itineraries/${id}`);

export const deleteItinerary = (id) =>
  request(`/itineraries/${id}`, { method: "DELETE" });
