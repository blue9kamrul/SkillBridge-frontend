import CreateReviewForm from "./CreateReviewForm";

export default async function CreateReviewPage({ searchParams }: { searchParams: Promise<{ tutorId?: string }> }) {
  const params = await searchParams;
  const tutorId = params?.tutorId || "";
  return <CreateReviewForm tutorId={tutorId} />;
}