export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1 px-4 md:px-6">{children}</main>
    </div>
  );
}
