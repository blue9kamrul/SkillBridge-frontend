// src/lib/category-api.ts
// Simple API functions for category routes

const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

export async function getAllCategories() {
  const res = await fetch(`${API_BASE}/categories`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string },
) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
