"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TutorBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/tutor", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error("API error:", res.status, text);
          toast.error(`Failed to load bookings: ${res.status}`);
          return { success: false };
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) setBookings(data.data);
        else toast.error("Failed to load bookings");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">My Tutor Bookings</h1>
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <p className="text-muted-foreground">No bookings found</p>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle>
                    Booking with {booking.student?.name || booking.student?.email}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="font-medium">Status:</span> {booking.status}
                    </div>
                    <div>
                      <span className="font-medium">Start:</span> {new Date(booking.startTime).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">End:</span> {new Date(booking.endTime).toLocaleString()}
                    </div>
                    <a href={`/bookings/${booking.id}`}>
                      <Button size="sm" variant="outline">View Details</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
