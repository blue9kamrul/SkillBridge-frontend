import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeaturedTutorsSection from "@/components/featured-tutors-section";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-start">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/80 to-secondary/80 py-20 flex flex-col items-center justify-center text-center shadow-lg">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6">
          Unlock Your Learning Potential
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
          SkillBridge connects students with expert tutors for personalized, effective, and flexible learning experiences.
        </p>
        <div className="flex gap-6 justify-center">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-4 shadow-xl">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-2 border-white text-white bg-black/40 hover:bg-white hover:text-black hover:border-white transition-colors duration-200 shadow-xl font-semibold"
              style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
            >
              Sign In
            </Button>
          </Link>
        </div>
      </section>
                  {/* How It Works Section */}
                  <section className="w-full py-20 bg-background flex flex-col items-center justify-center text-center border-t border-border">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-primary">How SkillBridge Empowers You</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-5xl w-full px-4">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 text-primary w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 border-2 border-primary">1</div>
                        <h3 className="font-semibold text-lg mb-2">Find Your Match</h3>
                        <p className="text-muted-foreground">Smart filters help you find tutors who fit your style and goals.</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 text-primary w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 border-2 border-primary">2</div>
                        <h3 className="font-semibold text-lg mb-2">Connect Instantly</h3>
                        <p className="text-muted-foreground">Message tutors directly to ask questions and connect fast.</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 text-primary w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 border-2 border-primary">3</div>
                        <h3 className="font-semibold text-lg mb-2">Personalized Sessions</h3>
                        <p className="text-muted-foreground">Book sessions your way: video, chat, or in-person.</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 text-primary w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 border-2 border-primary">4</div>
                        <h3 className="font-semibold text-lg mb-2">Grow & Celebrate</h3>
                        <p className="text-muted-foreground">Track progress, earn badges, and share reviews.</p>
                      </div>
                    </div>
                  </section>

                  {/* Why Choose SkillBridge Section */}
                  <section className="w-full py-20 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center text-center border-t border-border">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-primary">Why Choose SkillBridge?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full px-4">
                      <div className="flex flex-col items-center bg-white rounded-lg shadow p-8 border-t-4 border-black">
                        <h3 className="font-semibold text-lg mb-2">Verified Tutors</h3>
                        <p className="text-muted-foreground">Every tutor is screened for expertise and teaching ability, so you can book with confidence.</p>
                      </div>
                      <div className="flex flex-col items-center bg-white rounded-lg shadow p-8 border-t-4 border-black">
                        <h3 className="font-semibold text-lg mb-2">Secure & Flexible</h3>
                        <p className="text-muted-foreground">Your data and payments are protected. Learn online or in-person, on your schedule.</p>
                      </div>
                      <div className="flex flex-col items-center bg-white rounded-lg shadow p-8 border-t-4 border-black">
                        <h3 className="font-semibold text-lg mb-2">Support That Cares</h3>
                        <p className="text-muted-foreground">Our team is here to help you succeed, with responsive support every step of the way.</p>
                      </div>
                    </div>
                  </section>

                  {/* Featured Tutors Section */}
                  <FeaturedTutorsSection />

                  {/* Student Success Stories Section */}
                  <section className="w-full py-20 bg-background flex flex-col items-center justify-center text-center border-t border-border">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-primary">Student Success Stories</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full px-4">
                      <div className="flex flex-col items-center bg-white rounded-lg shadow p-8">
                        <p className="italic text-muted-foreground mb-4">“SkillBridge helped me finally understand calculus. My tutor was patient and made learning fun!”</p>
                        <span className="font-semibold text-primary">— Maya, High School Student</span>
                      </div>
                      <div className="flex flex-col items-center bg-white rounded-lg shadow p-8">
                        <p className="italic text-muted-foreground mb-4">“Booking sessions is so easy, and I love tracking my progress. I feel more confident every week.”</p>
                        <span className="font-semibold text-primary">— Alex, College Freshman</span>
                      </div>
                      <div className="flex flex-col items-center bg-white rounded-lg shadow p-8">
                        <p className="italic text-muted-foreground mb-4">“The support team really cares. They matched me with the perfect tutor for my learning style.”</p>
                        <span className="font-semibold text-primary">— Priya, Adult Learner</span>
                      </div>
                    </div>
                  </section>
    </main>
  );
}
