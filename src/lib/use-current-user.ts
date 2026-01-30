import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") +
        "/api/auth/me",
      {
        credentials: "include",
      },
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Not authenticated"),
      )
      .then((data) => setUser(data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
