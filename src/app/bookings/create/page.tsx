import CreateBookingForm from "./CreateBookingForm";

export default async function CreateBookingPage({ searchParams }: { searchParams: Promise<{ tutorId?: string }> }) {
  const params = await searchParams;
  const tutorIdFromQuery = params?.tutorId || "";
  return <CreateBookingForm tutorIdFromQuery={tutorIdFromQuery} />;
}
