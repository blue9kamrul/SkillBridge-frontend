"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile(data.data);
        } else {
          toast.error("Failed to load dashboard");
        }
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => window.history.back()} className="mr-4">Back</Button>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/profile/edit">
            <Button>Edit Profile</Button>
          </Link>
        </div>

        {profile && (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{profile.role?.toLowerCase()}</p>
                </div>
                {profile.role === "TUTOR" && profile.tutorProfile && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Subjects</p>
                      <p className="font-medium">{Array.isArray(profile.tutorProfile.subjects) ? profile.tutorProfile.subjects.join(", ") : profile.tutorProfile.subjects}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bio</p>
                      <p className="font-medium">{profile.tutorProfile.bio}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
        {(profile && profile.role === "STUDENT") && (
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <p className="text-muted-foreground">No bookings yet</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{booking.tutor?.user?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.scheduledAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm capitalize">
                          {booking.status.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
          </Card>
        )}
      </div>
    </div>

  );

}
