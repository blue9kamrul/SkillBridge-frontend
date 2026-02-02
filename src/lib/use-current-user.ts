import { useEffect, useState } from "react";
import { getApiBaseUrl } from "./api-url";

export function useCurrentUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = getApiBaseUrl();
    const url = base.endsWith("/api")
      ? `${base}/auth/me`
      : `${base}/api/auth/me`;
    fetch(url, {
      credentials: "include",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Not authenticated"),
      )
      .then((data) => setUser(data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
