"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function TutorDetailsPage() {
  const params = useParams();
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tutors/${params.id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTutor(data.data);
        else toast.error("Failed to load tutor");
      })
      .catch(() => toast.error("Failed to load tutor"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!tutor) return <div className="flex min-h-screen items-center justify-center">Tutor not found</div>;

  const avgRating = tutor.reviews?.length
    ? (tutor.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / tutor.reviews.length).toFixed(1)
    : "N/A";

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{tutor.user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="text-xl font-semibold">${tutor.hourlyRate}/hour</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-xl font-semibold">{tutor.experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-xl font-semibold">⭐ {avgRating}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                  <p className="text-xl font-semibold">{tutor.reviews?.length || 0}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Bio</p>
                <p className="mt-1">{tutor.bio || "No bio available"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {tutor.subjects?.map((subject: string) => (
                    <span key={subject} className="rounded-full bg-primary/10 px-3 py-1 text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
