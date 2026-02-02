/**
 * Get the API base URL.
 * In production (Vercel), uses relative URLs to go through Next.js proxy (avoids third-party cookie issues).
 * In development, uses the NEXT_PUBLIC_API_URL environment variable.
 */
export function getApiBaseUrl(): string {
  // Server-side: always use the full backend URL for server components
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  }

  // Client-side: if on vercel.app domain, use relative URLs (goes through proxy)
  if (window.location.hostname.includes("vercel.app")) {
    return window.location.origin;
  }

  // Client-side in development or other environments: use backend URL directly
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
}
