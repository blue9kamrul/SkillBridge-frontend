"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
export default function TutorDetailsPage() {
  const { user } = useUser();
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
        <div className="flex items-center gap-4 mb-4">
          <button
            className="px-4 py-2 rounded bg-muted hover:bg-muted/70 border border-border text-base"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          {user?.role === "STUDENT" && (
            <a
              href={`/bookings/create?tutorId=${params.id}`}
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 border border-primary text-base"
            >
              Create Booking
            </a>
          )}
          {!user && (
            <span
              className="ml-4 text-base font-bold text-white bg-red-600 border-2 border-red-800 px-4 py-2 rounded shadow-lg animate-pulse"
              style={{ letterSpacing: '0.05em' }}
            >
              ⚠️ Please <a href='/login' className="underline text-yellow-200 hover:text-white">login</a> to create a new booking!
            </span>
          )}
        </div>
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


              {/* Bio and Subjects */}
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

              {/* Reviews */}
              {tutor.reviews && tutor.reviews.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-2">Reviews</h3>
                  <div className="space-y-4">
                    {tutor.reviews.map((review: any) => {
                      const canDelete = user && (user.role === "ADMIN" || user.id === review.studentId);
                      return (
                        <Card key={review.id} className="bg-muted">
                          <CardContent className="py-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{review.student?.name || "Student"}</span>
                              <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                              <span className="text-xs text-muted-foreground ml-2">{new Date(review.createdAt).toLocaleDateString()}</span>
                              {canDelete && (
                                <button
                                  className="ml-4 px-2 py-1 rounded bg-destructive text-white text-xs hover:bg-destructive/80"
                                  onClick={async () => {
                                    if (!confirm("Are you sure you want to delete this review?")) return;
                                    try {
                                      await deleteReview(review.id);
                                      toast.success("Review deleted");
                                      // Remove review from UI
                                      setTutor((prev: any) => ({
                                        ...prev,
                                        reviews: prev.reviews.filter((r: any) => r.id !== review.id),
                                      }));
                                    } catch (e: any) {
                                      toast.error(e.message || "Failed to delete review");
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                            <div className="text-base">{review.comment || <span className="text-muted-foreground">No comment</span>}</div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
