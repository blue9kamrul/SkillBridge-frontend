"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/admin/dashboard`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
        else toast.error("Failed to load dashboard");
      })
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!stats) return <div className="flex min-h-screen items-center justify-center">No data</div>;

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/users">
            <Button className="w-full sm:w-auto">Manage Users</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totals.users}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Tutors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totals.tutors}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totals.bookings}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totals.categories}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totals.reviews}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.usersByRole.map((item: any) => (
                <div key={item.role} className="flex justify-between">
                  <span className="capitalize">{item.role.toLowerCase()}</span>
                  <span className="font-semibold">{item._count.role}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookings by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.bookingsByStatus.map((item: any) => (
                <div key={item.status} className="flex justify-between">
                  <span className="capitalize">{item.status}</span>
                  <span className="font-semibold">{item._count.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
