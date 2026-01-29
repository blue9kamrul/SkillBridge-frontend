import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard",
      },
      {
        title: "Manage Users",
        url: "/admin/users",
      },
    ],
  },
];

export const studentRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Dashboard",
        url: "/dashboard",
      },
      {
        title: "My Profile",
        url: "/profile",
      },
      {
        title: "Edit Profile",
        url: "/profile/edit",
      },
    ],
  },
];
