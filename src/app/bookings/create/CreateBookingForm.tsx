"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateBookingForm({ tutorIdFromQuery }: { tutorIdFromQuery: string }) {
  const [loading, setLoading] = useState(false);
  const [tutor, setTutor] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (tutorIdFromQuery) {
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const url = base.endsWith("/api") ? `${base}/tutors/${tutorIdFromQuery}` : `${base}/api/tutors/${tutorIdFromQuery}`;
      fetch(url, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setTutor(data.data);
        })
        .catch(() => {});
    }
  }, [tutorIdFromQuery]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      tutorId: formData.get("tutorId"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
    };
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
            <CardTitle>Create Booking</CardTitle>
          </CardHeader>
          <CardContent>
            {tutor?.availability && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm font-semibold text-green-800">📅 Tutor Availability</p>
                <p className="text-sm text-green-700 mt-1">{tutor.availability}</p>
                <p className="text-xs text-green-600 mt-1">⚠️ Bookings outside these hours will be rejected</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tutor ID</label>
                <Input name="tutorId" required defaultValue={tutorIdFromQuery} readOnly={!!tutorIdFromQuery} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Start Time</label>
                  <Input name="startTime" type="datetime-local" required />
                </div>
                <div>
                  <label className="text-sm font-medium">End Time</label>
                  <Input name="endTime" type="datetime-local" required />
                </div>
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
