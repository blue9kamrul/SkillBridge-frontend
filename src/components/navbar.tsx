"use client";
import Link from "next/link";
import { useCurrentUser } from "@/lib/use-current-user";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navConfig = {
  common: [
    { href: "/", label: "Home" },
    { href: "/tutors", label: "Tutors" },
  ],
  student: [
    { href: "/bookings", label: "My Bookings" },
    { href: "/reviews", label: "My Reviews" },
    { href: "/profile", label: "Profile" },
    { href: "/tutors/become-tutor", label: "Become a Tutor" },
  ],
  tutor: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/reviews", label: "My Reviews" },
    { href: "/tutors", label: "All Tutors" },
    { href: "/bookings", label: "My Bookings" },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/categories", label: "Categories" },
    { href: "/reviews", label: "All Reviews" },
    { href: "/bookings/all", label: "All Bookings" },
    { href: "/profile", label: "Profile" },
  ],
};

export function Navbar() {
  const { user, loading } = useCurrentUser();
  const pathname = usePathname();


  let links = [...navConfig.common];
  if (!loading && user) {
    if (user.role === "ADMIN") links = [...links, ...navConfig.admin];
    else if (user.role === "TUTOR") links = [...links, ...navConfig.tutor];
    else if (user.role === "STUDENT") links = [...links, ...navConfig.student];
  }

  // Remove duplicates by href
  const uniqueLinks = Array.from(new Map(links.map(l => [l.href, l])).values());

  return (
    <nav className="w-full bg-background border-b sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center gap-4 px-4 py-2">
        <span className="font-bold text-lg tracking-tight flex-1">SkillBridge</span>
        {uniqueLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button variant={pathname === link.href ? "secondary" : "ghost"} size="sm">
              {link.label}
            </Button>
          </Link>
        ))}
        {user ? (
          <span className="ml-4 text-xs text-muted-foreground">{user.name} ({user.role})</span>
        ) : (
          <Link href="/auth/login">
            <Button size="sm" variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
