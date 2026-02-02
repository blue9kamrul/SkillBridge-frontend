import { createAuthClient } from "better-auth/react";
import { getApiBaseUrl } from "./api-url";

export const authClient = createAuthClient({
  baseURL: getApiBaseUrl(),
  basePath: "/api/auth",
  fetchOptions: { credentials: "include" },
});
