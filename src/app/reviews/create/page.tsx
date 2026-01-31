import CreateReviewForm from "./CreateReviewForm";

export default function CreateReviewPage({ searchParams }: { searchParams?: { tutorId?: string } }) {
  const tutorId = searchParams?.tutorId || "";
  return <CreateReviewForm tutorId={tutorId} />;
}
