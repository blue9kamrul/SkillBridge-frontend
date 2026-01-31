"use client";
import Link from "next/link";
import { useUser } from "@/lib/user-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { user } = useUser();
  const [visible, setVisible] = useState(true);

  let links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
  ];

  if (user) {
    if (user.role === "ADMIN") {
      links = [
        { href: "/admin/dashboard", label: "Admin Dashboard" },
        { href: "/admin/users", label: "Manage Users" },
        { href: "/categories", label: "Categories" },
        { href: "/reviews", label: "All Reviews" },
        { href: "/bookings/all", label: "All Bookings" },
      ];
    } else if (user.role === "TUTOR") {
      links = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/reviews", label: "My Reviews" },
        { href: "/bookings", label: "My Bookings" },
        { href: "/profile", label: "Profile" },
      ];
    } else if (user.role === "STUDENT") {
      links = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/bookings", label: "My Bookings" },
        { href: "/reviews", label: "My Reviews" },
        { href: "/profile", label: "Profile" },
        { href: "/tutors/become-tutor", label: "Become a Tutor" },
      ];
    }
  }

  if (!visible) {
    return (
      <button
        className="fixed top-4 left-4 z-50 bg-muted border px-3 py-2 rounded shadow"
        onClick={() => setVisible(true)}
      >
        Show Sidebar
      </button>
    );
  }
  return (
    <aside className="hidden md:flex w-28 sm:w-48 md:w-56 min-h-screen bg-muted border-r px-3 py-4 sm:py-8 flex-col gap-4 sticky top-0">
      <div className="flex items-center justify-between mb-6">
        <span className="font-bold text-sm sm:text-lg">SkillBridge</span>
        <Button size="sm" variant="ghost" onClick={() => setVisible(false)} title="Hide Sidebar">×</Button>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block py-2 px-2 rounded hover:bg-primary/10">
            <span className="text-xs sm:text-sm truncate max-w-[9rem]">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
