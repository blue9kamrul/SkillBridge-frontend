export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About SkillBridge
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Connecting tutors with students
            </p>
          </div>

          <div className="space-y-6 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              SkillBridge makes it easy to find the right tutor for your needs. 
             
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-8">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">Verified Tutors</h3>
                <p className="text-sm text-muted-foreground">
                  Experienced tutors across multiple subjects
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">Flexible Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule sessions that fit your lifestyle
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">Secure Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Safe and transparent booking system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
