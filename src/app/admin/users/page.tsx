"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const url = base.endsWith("/api") ? `${base}/admin/users` : `${base}/api/admin/users`;
    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.data);
        else toast.error("Failed to load users");
      })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (userId: string, status: string) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const url = base.endsWith("/api") ? `${base}/admin/users/${userId}/ban-status` : `${base}/api/admin/users/${userId}/ban-status`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    const data = await response.json();

    if (data.success) {
      toast.success(`User ${status === "BANNED" ? "banned" : "activated"}`);
      loadUsers();
    } else {
      toast.error(data.message || "Failed to update status");
    }
  };

  const updateRole = async (userId: string, role: string) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const url = base.endsWith("/api") ? `${base}/admin/users/${userId}` : `${base}/api/admin/users/${userId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role }),
    });
    const data = await response.json();
    
    if (data.success) {
      toast.success("Role updated");
      loadUsers();
    } else {
      toast.error("Failed to update role");
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle className="text-lg">{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="capitalize">{user.role.toLowerCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="capitalize">{user.status?.toLowerCase() || "Active"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Verified</p>
                      <p>{user.emailVerified ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {user.status !== "BANNED" ? (
                      <LoadingButton
                        size="sm"
                        variant="destructive"
                        className="w-full sm:w-auto"
                        onClick={async () => {
                          if (!confirm('Ban this user?')) return;
                          await updateStatus(user.id, "BANNED");
                        }}
                      >
                        Ban User
                      </LoadingButton>
                    ) : (
                      <LoadingButton
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={async () => {
                          if (!confirm('Unban this user?')) return;
                          await updateStatus(user.id, "ACTIVE");
                        }}
                      >
                        Unban User
                      </LoadingButton>
                    )}
                    
                    {user.role !== "TUTOR" && (
                      <LoadingButton
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={async () => {
                          if (!confirm('Promote user to Tutor?')) return;
                          await updateRole(user.id, "TUTOR");
                        }}
                      >
                        Make Tutor
                      </LoadingButton>
                    )}
                    
                    {user.role !== "STUDENT" && (
                      <LoadingButton
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={async () => {
                          if (!confirm('Demote user to Student?')) return;
                          await updateRole(user.id, "STUDENT");
                        }}
                      >
                        Make Student
                      </LoadingButton>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
