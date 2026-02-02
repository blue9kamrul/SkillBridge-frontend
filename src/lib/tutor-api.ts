// src/lib/tutor-api.ts
// Simple API functions for tutor routes
import { getApiBaseUrl } from "./api-url";

const API_BASE = (() => {
  const base = getApiBaseUrl();
  return base.endsWith("/api") ? base : `${base}/api`;
})();

export async function getFeaturedTutors(limit = 6) {
  const res = await fetch(`${API_BASE}/tutors/featured?limit=${limit}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch featured tutors");
  return res.json();
}
