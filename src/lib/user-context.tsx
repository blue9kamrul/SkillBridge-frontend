"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type UserType = any | null;
type UserContextType = {
  user: UserType;
  setUser: (u: UserType) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (_user: UserType) => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const url = base.endsWith("/api")
      ? `${base}/user/me`
      : `${base}/api/user/me`;
    fetch(url, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject("Not authenticated")))
      .then((data) => setUser(data.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
