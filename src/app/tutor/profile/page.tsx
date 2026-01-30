"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function TutorProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    fetch("http://localhost:5000/api/tutors/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProfile(data.data);
        else toast.error("Failed to load profile");
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: any = {
        bio: formData.get("bio"),
        subjects: (formData.get("subjects") as string).split(",").map((s) => s.trim()),
        hourlyRate: parseFloat(formData.get("hourlyRate") as string),
        experience: parseInt(formData.get("experience") as string),
      };
      if (formData.get("availability")) {
        try {
          data.availability = JSON.parse(formData.get("availability") as string);
        } catch {
          toast.error("Availability must be valid JSON");
          return;
        }
      }
      const response = await fetch("http://localhost:5000/api/tutors/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Profile updated!");
        setEditing(false);
        loadProfile();
      } else {
        toast.error("Failed to update profile");
      }
    };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!profile) return <div className="flex min-h-screen items-center justify-center">No tutor profile found</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Tutor Profile</CardTitle>
              <Button variant="outline" onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    name="bio"
                    defaultValue={profile.bio}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Subjects</label>
                  <Input name="subjects" defaultValue={profile.subjects?.join(", ")} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Hourly Rate</label>
                    <Input name="hourlyRate" type="number" step="0.01" defaultValue={profile.hourlyRate} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Experience</label>
                    <Input name="experience" type="number" defaultValue={profile.experience} />
                  </div>
                </div>
                  <div>
                    <label className="text-sm font-medium">Availability (JSON)</label>
                    <textarea
                      name="availability"
                      defaultValue={profile.availability ? JSON.stringify(profile.availability, null, 2) : ""}
                      className="mt-1 w-full rounded-md border px-3 py-2"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">Example: {`{"monday": ["10:00-12:00", "14:00-16:00"]}`}</p>
                  </div>
                <Button type="submit" className="w-full">Save Changes</Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Bio</p>
                  <p>{profile.bio}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p>{profile.subjects?.join(", ")}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="text-xl font-semibold">${profile.hourlyRate}/hr</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="text-xl font-semibold">{profile.experience} years</p>
                  </div>
                </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <pre className="bg-muted rounded p-2 text-xs whitespace-pre-wrap">{profile.availability ? JSON.stringify(profile.availability, null, 2) : "Not set"}</pre>
                  </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
