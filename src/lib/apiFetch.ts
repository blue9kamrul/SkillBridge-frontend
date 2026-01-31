export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const finalInit: RequestInit = { credentials: "include", ...init };
  const res = await fetch(input, finalInit);
  const contentType = res.headers.get("content-type") || "";

  let body: any = null;
  if (contentType.includes("application/json")) {
    try {
      body = await res.json();
    } catch (e) {
      body = null;
    }
  } else {
    try {
      body = await res.text();
    } catch (e) {
      body = null;
    }
  }

  if (!res.ok) {
    const message =
      body?.message || body?.error || res.statusText || "Request failed";
    const err: any = new Error(
      typeof message === "string" ? message : JSON.stringify(message),
    );
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}
