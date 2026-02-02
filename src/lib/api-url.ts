/**
 * Get the API base URL.
 * In production, uses relative URLs to go through Next.js proxy (avoids third-party cookie issues).
 * In development, uses the NEXT_PUBLIC_API_URL environment variable.
 */
export function getApiBaseUrl(): string {
  // Server-side: always use the full backend URL
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  }

  // Client-side in production: use relative URLs to avoid cross-origin cookie issues
  if (process.env.NODE_ENV === "production") {
    return window.location.origin;
  }

  // Client-side in development: use the backend URL directly
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
}
