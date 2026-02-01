"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BecomeTutorPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      bio: formData.get("bio"),
      subjects: (formData.get("subjects") as string).split(",").map((s) => s.trim()),
      hourlyRate: parseFloat(formData.get("hourlyRate") as string),
      experience: parseInt(formData.get("experience") as string),
    };

    const response = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/api$/, "") + "/api/tutors/become-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      toast.success("Tutor profile created!");
      router.push("/tutor/profile");
    } else {
      toast.error(result.message || "Failed to create profile");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Become a Tutor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  required
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Subjects (comma separated)</label>
                <Input name="subjects" required placeholder="Math, Physics, Chemistry" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Hourly Rate ($)</label>
                  <Input name="hourlyRate" type="number" step="0.01" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Experience (years)</label>
                  <Input name="experience" type="number" required />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
