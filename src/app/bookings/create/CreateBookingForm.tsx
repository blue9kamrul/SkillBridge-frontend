"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api-url";

export default function CreateBookingForm({ tutorIdFromQuery }: { tutorIdFromQuery: string }) {
  const [loading, setLoading] = useState(false);
  const [tutor, setTutor] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (tutorIdFromQuery) {
      const base = getApiBaseUrl();
      const tutorUrl = base.endsWith("/api") ? `${base}/tutors/${tutorIdFromQuery}` : `${base}/api/tutors/${tutorIdFromQuery}`;
      const bookingsUrl = base.endsWith("/api") ? `${base}/bookings/tutor/${tutorIdFromQuery}` : `${base}/api/bookings/tutor/${tutorIdFromQuery}`;
      
      // Fetch tutor details
      fetch(tutorUrl, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setTutor(data.data);
        })
        .catch(() => {});
      
      // Fetch tutor bookings
      fetch(bookingsUrl, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setBookings(data.data || []);
        })
        .catch(() => {});
    }
  }, [tutorIdFromQuery]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const startTime = new Date(formData.get("bookingTime") as string);
    const duration = parseInt(formData.get("duration") as string);
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
    
    const data = {
      tutorId: formData.get("tutorId"),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
    const base = getApiBaseUrl();
    const url = base.endsWith("/api") ? `${base}/bookings` : `${base}/api/bookings`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    let result;
    try {
      result = await res.json();
    } catch {
      result = {};
    }
    if (res.status === 401 || res.status === 403) {
      toast.error("You must login before creating a booking.");
      router.push("/login");
    } else if (result.success) {
      toast.success("Booking created!");
      router.push("/bookings");
    } else {
      toast.error(result.message || "Failed to create booking");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Booking{tutor ? ` with ${tutor.user.name}` : ''}</CardTitle>
          </CardHeader>
          <CardContent>
            {tutor && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm font-semibold text-blue-800">👨‍🏫 Tutor: {tutor.user.name}</p>
                <p className="text-xs text-blue-600 mt-1">{tutor.categories?.map((c: any) => c.name).join(', ') || 'No categories'} • ${tutor.hourlyRate}/hr</p>
              </div>
            )}
            {tutor?.availability && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm font-semibold text-green-800">📅 Tutor Availability</p>
                <p className="text-sm text-green-700 mt-1">{tutor.availability}</p>
                <p className="text-xs text-green-600 mt-1">⚠️ Bookings outside these hours will be rejected (Weekends: Friday & Saturday)</p>
              </div>
            )}
            {bookings.length > 0 && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-sm font-semibold text-orange-800">📋 Already Booked Time Slots</p>
                <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                  {bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').map((booking) => (
                    <p key={booking.id} className="text-xs text-orange-700">
                      • {new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-orange-600 mt-2">⚠️ Avoid booking during these times</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tutor ID</label>
                <Input name="tutorId" required defaultValue={tutorIdFromQuery} readOnly={!!tutorIdFromQuery} />
              </div>
              <div>
                <label className="text-sm font-medium">Booking Time</label>
                <Input name="bookingTime" type="datetime-local" required />
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <select name="duration" required className="w-full rounded-md border px-3 py-2">
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Booking"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => (window.location.href = "/bookings")}>Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
