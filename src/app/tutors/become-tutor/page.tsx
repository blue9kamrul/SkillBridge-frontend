"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BecomeTutorPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      bio: formData.get("bio"),
      subjects: (formData.get("subjects") as string).split(",").map((s) => s.trim()),
      hourlyRate: parseFloat(formData.get("hourlyRate") as string),
      experience: parseInt(formData.get("experience") as string),
    };

    const response = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/api$/, "") + "/api/tutors/become-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      toast.success("Tutor profile created!");
      router.push("/");
    } else {
      toast.error(result.message || "Failed to create profile");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Become a Tutor</h1>
          <p className="mt-2 text-gray-600">Share your expertise and help students succeed</p>
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  rows={4}
                  placeholder="Tell students about your teaching experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subjects</label>
                <Input 
                  name="subjects" 
                  required 
                  placeholder="Math, Physics, Chemistry" 
                  className="h-11"
                />
                <p className="mt-1 text-xs text-gray-500">Separate subjects with commas</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate ($)</label>
                  <Input 
                    name="hourlyRate" 
                    type="number" 
                    step="0.01" 
                    required 
                    placeholder="25.00"
                    className="h-11"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience (years)</label>
                  <Input 
                    name="experience" 
                    type="number" 
                    required 
                    placeholder="5"
                    className="h-11"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 text-base font-semibold">
                {loading ? "Creating Profile..." : "Create Tutor Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
