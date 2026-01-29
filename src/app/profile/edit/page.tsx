"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phone: "", image: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/students/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormData({
            name: data.data.name || "",
            phone: data.data.phone || "",
            image: data.data.image || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/students/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    
    if (data.success) {
      toast.success("Profile updated!");
      router.push("/profile");
    } else {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Update Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </Field>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">Save</Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => router.push("/profile")}>
                    Cancel
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
