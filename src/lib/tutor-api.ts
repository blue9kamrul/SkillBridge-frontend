// src/lib/tutor-api.ts
// Simple API functions for tutor routes

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

export async function getFeaturedTutors(limit = 6) {
  const res = await fetch(`${API_BASE}/tutors/featured?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch featured tutors");
  return res.json();
}
