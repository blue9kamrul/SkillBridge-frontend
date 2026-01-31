"use client";

import { useUser } from "@/lib/user-context";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ProfilePage() {
  const { user, setUser } = useUser();

  if (!user) {
    return <div className="flex min-h-screen items-center justify-center">Not logged in</div>;
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        credentials: "include",
      },
    });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16 flex flex-col justify-between">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Link href="/profile/edit">
            <Button>Edit</Button>
          </Link>
        </div>
        <Card className="pr-4 sm:pr-0">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pr-4 sm:pr-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-muted" />
                )}
              </div>
              <div className="w-full">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{user.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="capitalize">{user.role?.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mx-auto max-w-2xl w-full flex justify-center sm:justify-end mt-8">
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
