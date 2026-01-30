"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/tutors", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTutors(data.data);
        else toast.error("Failed to load tutors");
      })
      .catch(() => toast.error("Failed to load tutors"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Find a Tutor</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => {
            const avgRating = tutor.reviews?.length
              ? (tutor.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / tutor.reviews.length).toFixed(1)
              : "N/A";

            return (
              <Link key={tutor.id} href={`/tutors/${tutor.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{tutor.user.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{tutor.bio || "No bio"}</p>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">${tutor.hourlyRate}/hr</span>
                        <span>⭐ {avgRating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tutor.experience} years exp</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
