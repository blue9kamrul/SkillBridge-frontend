"use client";
import { useEffect, useState } from "react";
import { getAllReviews } from "@/lib/review-api";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/lib/use-current-user";

export default function AllReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, loading: userLoading } = useCurrentUser();

  useEffect(() => {
    getAllReviews()
      .then((res) => {
        if (Array.isArray(res)) setReviews(res);
        else if (res && Array.isArray(res.data)) setReviews(res.data);
        else setReviews([]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading || userLoading) return <div className="flex justify-center items-center min-h-[200px]">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{user?.role === "ADMIN" ? "All Reviews" : "My Reviews"}</h1>
      {reviews.length === 0 ? (
        <div className="text-muted-foreground">No reviews found.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-muted">
              <CardContent className="py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.student?.name || "Student"}</span>
                  <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  <span className="text-xs text-muted-foreground ml-2">{new Date(review.createdAt).toLocaleDateString()}</span>
                  <span className="ml-4 text-sm text-muted-foreground">Tutor: {review.tutor?.user?.name || "Tutor"}</span>
                </div>
                <div className="text-base">{review.comment || <span className="text-muted-foreground">No comment</span>}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
