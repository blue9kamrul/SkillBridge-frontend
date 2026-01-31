export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="w-full max-w-4xl px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
