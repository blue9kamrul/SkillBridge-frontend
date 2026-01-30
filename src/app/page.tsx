import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to SkillBridge
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect tutors with students and bridge the gap in education
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
