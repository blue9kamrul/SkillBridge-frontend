// src/lib/tutor-api.ts
// Simple API functions for tutor routes

const API_BASE = (() => {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return base.endsWith("/api") ? base : `${base}/api`;
})();

export async function getFeaturedTutors(limit = 6) {
  const res = await fetch(`${API_BASE}/tutors/featured?limit=${limit}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch featured tutors");
  return res.json();
}
