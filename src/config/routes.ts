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

export const tutorRoutes: Route[] = [
  {
    title: "Tutor",
    items: [
      {
        title: "My Profile",
        url: "/tutor/profile",
      },
      {
        title: "Find Tutors",
        url: "/tutors",
      },
      {
        title: "Become a Tutor",
        url: "/tutors/become-tutor",
      },
    ],
  },
];

export const publicRoutes: Route[] = [
  {
    title: "Public",
    items: [
      {
        title: "Browse Tutors",
        url: "/tutors",
      },
      {
        title: "About",
        url: "/about",
      },
      {
        title: "Contact",
        url: "/contact",
      },
    ],
  },
];
