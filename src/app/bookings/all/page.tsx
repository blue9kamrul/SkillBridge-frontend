"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCurrentUser } from "@/lib/use-current-user";

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useCurrentUser();

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const url = base.endsWith("/api") ? `${base}/bookings` : `${base}/api/bookings`;
    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBookings(data.data);
        else toast.error("Failed to load bookings");
      })
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading || userLoading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">All Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-muted-foreground">No bookings found.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle>
                    {booking.student?.name || "Student"} booked {booking.tutor?.user?.name || "Tutor"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-sm text-muted-foreground">
                    <span>Start: {new Date(booking.startTime).toLocaleString()}</span>
                    <span className="ml-4">End: {new Date(booking.endTime).toLocaleString()}</span>
                    <span className="ml-4">Status: {booking.status}</span>
                  </div>
                  <div className="text-base">Booking ID: {booking.id}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
