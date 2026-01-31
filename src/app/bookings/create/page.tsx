import CreateBookingForm from "./CreateBookingForm";

export default function CreateBookingPage({ searchParams }: { searchParams?: { tutorId?: string } }) {
  const tutorIdFromQuery = searchParams?.tutorId || "";
  return <CreateBookingForm tutorIdFromQuery={tutorIdFromQuery} />;
}
