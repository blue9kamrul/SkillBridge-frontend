import { Sidebar } from "@/components/sidebar";

export default function BookingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
