"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [subjects, setSubjects] = useState("");
  const router = useRouter();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/user/me`, { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401) {
          setProfile(null);
          router.push("/login");
          return;
        }
        const data = await res.json();
        if (data.success) {
          setProfile(data.data);
          if (data.data.tutorProfile) {
            setBio(data.data.tutorProfile.bio || "");
            setSubjects(Array.isArray(data.data.tutorProfile.subjects) ? data.data.tutorProfile.subjects.join(", ") : data.data.tutorProfile.subjects);
          }
        } else {
          toast.error("Failed to load dashboard");
        }
        setLoading(false);
      });
  }, [router]);

  const handleUpdateTutorProfile = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const url = apiUrl.endsWith("/api") ? `${apiUrl}/tutors/profile` : `${apiUrl}/api/tutors/profile`;
    
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        bio,
        subjects: subjects.split(",").map((s) => s.trim()),
      }),
    });
    
    const data = await res.json();
    if (data.success) {
      toast.success("Profile updated successfully");
      setEditing(false);
      // Refresh profile
      const refreshRes = await fetch(`${apiUrl}/api/user/me`, { credentials: "include" });
      const refreshData = await refreshRes.json();
      if (refreshData.success) {
        setProfile(refreshData.data);
      }
    } else {
      toast.error(data.message || "Failed to update profile");
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <main className="px-6 py-16">
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
                <div className="flex items-center justify-between">
                  <CardTitle>Profile</CardTitle>
                  {profile.role === "TUTOR" && !editing && (
                    <Button size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
                  )}
                </div>
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
                      <div className="sm:col-span-2">
                        <p className="text-sm text-muted-foreground mb-2">Bio</p>
                        {editing ? (
                          <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            rows={3}
                          />
                        ) : (
                          <p className="font-medium">{profile.tutorProfile.bio}</p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm text-muted-foreground mb-2">Subjects</p>
                        {editing ? (
                          <>
                            <Input
                              value={subjects}
                              onChange={(e) => setSubjects(e.target.value)}
                              placeholder="Math, Physics, Chemistry"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Separate subjects with commas</p>
                          </>
                        ) : (
                          <p className="font-medium">{Array.isArray(profile.tutorProfile.subjects) ? profile.tutorProfile.subjects.join(", ") : profile.tutorProfile.subjects}</p>
                        )}
                      </div>
                      {editing && (
                        <div className="sm:col-span-2 flex gap-2">
                          <Button onClick={handleUpdateTutorProfile}>Save Changes</Button>
                          <Button variant="outline" onClick={() => {
                            setEditing(false);
                            setBio(profile.tutorProfile.bio || "");
                            setSubjects(Array.isArray(profile.tutorProfile.subjects) ? profile.tutorProfile.subjects.join(", ") : profile.tutorProfile.subjects);
                          }}>Cancel</Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
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
          {/* ...existing code... */}
        </div>
      </main>
    </div>
  );
 

}
