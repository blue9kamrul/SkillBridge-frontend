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
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const tutorUrl = base.endsWith("/api") ? `${base}/tutors/${params.id}` : `${base}/api/tutors/${params.id}`;
    
    // Fetch tutor details
    fetch(tutorUrl, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTutor(data.data);
          
          // Fetch tutor bookings
          const bookingsUrl = base.endsWith("/api") ? `${base}/bookings/tutor/${params.id}` : `${base}/api/bookings/tutor/${params.id}`;
          return fetch(bookingsUrl, { credentials: "include" });
        } else {
          toast.error("Failed to load tutor");
        }
      })
      .then((res) => res?.json())
      .then((data) => {
        if (data?.success) setBookings(data.data || []);
      })
      .catch(() => toast.error("Failed to load tutor"))
      .finally(() => setLoading(false));
  }, [params.id]);

  const deleteReview = async (reviewId: string | number) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const url = base.endsWith("/api") ? `${base}/reviews/${reviewId}` : `${base}/api/reviews/${reviewId}`;
    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to delete review");
    return data;
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!tutor) return <div className="flex min-h-screen items-center justify-center">Tutor not found</div>;

  const avgRating = tutor.reviews?.length
    ? (tutor.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / tutor.reviews.length).toFixed(1)
    : "N/A";

  // Calculate booking statistics
  const now = new Date();
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const upcomingBookings = confirmedBookings.filter(b => new Date(b.startTime) > now);
  const totalBookedHours = upcomingBookings.reduce((sum, b) => {
    const duration = (new Date(b.endTime).getTime() - new Date(b.startTime).getTime()) / (1000 * 60 * 60);
    return sum + duration;
  }, 0);
  const totalBookedDays = Math.ceil(totalBookedHours / 24);

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <button
            className="w-full sm:w-auto px-4 py-2 rounded bg-muted hover:bg-muted/70 border border-border text-base text-center"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          {(user as any)?.role === "STUDENT" && (
            <a
              href={`/bookings/create?tutorId=${params.id}`}
              className="w-full sm:w-auto px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 border border-primary text-base text-center"
            >
              Create Booking
            </a>
          )}
          {!user && (
            <span
              className="w-full sm:w-auto mt-2 sm:mt-0 text-base font-bold text-white bg-red-600 border-2 border-red-800 px-4 py-2 rounded shadow-lg animate-pulse text-center"
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
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
                  <p className="text-xl font-semibold text-orange-600">{upcomingBookings.length} sessions</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booked Hours</p>
                  <p className="text-xl font-semibold text-blue-600">{totalBookedHours.toFixed(1)} hrs ({totalBookedDays} days)</p>
                </div>
              </div>


              {/* Bio and Subjects */}
              <div>
                <p className="text-sm text-muted-foreground">Bio</p>
                <p className="mt-1">{tutor.bio || "No bio available"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {tutor.categories?.map((category: any) => (
                    <span key={category.id} className="rounded-full bg-primary/10 px-3 py-1 text-sm">
                      {category.name}
                    </span>
                  ))}
                  {(!tutor.categories || tutor.categories.length === 0) && (
                    <span className="text-sm text-muted-foreground">No categories selected</span>
                  )}
                </div>
              </div>

              {tutor.availability && (
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className="mt-1 text-green-600 font-medium">📅 {tutor.availability}</p>
                  <p className="text-xs text-muted-foreground mt-1">Please book within these hours</p>
                </div>
              )}

              {/* Reviews */}
              {tutor.reviews && tutor.reviews.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-2">Reviews</h3>
                  <div className="space-y-4">
                    {tutor.reviews.map((review: any) => {
                      const canDelete = user && (((user as any).role === "ADMIN") || ((user as any).id === review.studentId));
                      return (
                        <Card key={review.id} className="bg-muted">
                          <CardContent className="py-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-1">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-semibold truncate">{review.student?.name || "Student"}</span>
                                  <span className="text-yellow-500 text-sm flex-shrink-0">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                  <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap flex-shrink-0">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              {canDelete && (
                                <div className="w-full sm:w-auto">
                                  <button
                                    className="mt-2 sm:mt-0 ml-0 sm:ml-4 px-2 py-1 rounded bg-destructive text-white text-xs hover:bg-destructive/80 w-full sm:w-auto"
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
                                </div>
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
