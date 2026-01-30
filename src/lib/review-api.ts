// Admin: all reviews, Student: only their own
export async function getAllReviews() {
  const res = await fetch(`${API_BASE}/reviews`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}
import { getSession } from "./auth-client";

const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const API_BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

export async function getReviewsByTutorId(tutorId: string) {
  const res = await fetch(`${API_BASE}/reviews/tutor/${tutorId}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function createReview(data: {
  tutorId: string;
  rating: number;
  comment: string;
}) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create review");
  return res.json();
}

export async function deleteReview(id: string) {
  const res = await fetch(`${API_BASE}/reviews/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete review");
  return res.json();
}
