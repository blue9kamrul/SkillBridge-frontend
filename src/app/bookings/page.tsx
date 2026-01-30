"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCurrentUser } from "@/lib/use-current-user";


export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useCurrentUser();

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBookings(data.data);
        else toast.error("Failed to load bookings");
      })
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Booking deleted");
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } else {
      toast.error("Failed to delete booking");
    }
  };

  if (loading || userLoading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Bookings</h1>
        {/* Debug: Show current user and role */}
        {user && (
          <div className="mb-4 p-2 bg-gray-100 rounded text-sm text-gray-700">
            <strong>Logged in as:</strong> {user.name || user.email} <br />
            <strong>Role:</strong> {user.role}
            <br />
          </div>
        )}
        <div className="flex gap-4 mb-6">
        </div>
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <p className="text-muted-foreground">No bookings found</p>
          ) : (
            bookings.map((booking) => {
              const otherParty = booking.tutor?.user?.name || booking.student?.name || booking.tutor?.user?.email || booking.student?.email;
              // Admin can delete any booking
              const canDelete = user?.role === "ADMIN";
              // Student can review completed bookings if not already reviewed
              const canReview = user?.role === "STUDENT" && booking.status === "completed" && !booking.reviewedByStudent;
              return (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle>
                      Booking with {otherParty}
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
                      <div className="flex gap-2">
                        <a href={`/bookings/${booking.id}`}>
                          <Button size="sm" variant="outline">View Details</Button>
                        </a>
                        {canReview && (
                          <a href={`/reviews/create?tutorId=${booking.tutorId}`}>
                            <Button size="sm" variant="default">Give Review</Button>
                          </a>
                        )}
                      </div>
                      {canDelete && (
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(booking.id)}>
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
