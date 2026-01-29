"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    fetch("http://localhost:5000/api/admin/users", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.data);
        else toast.error("Failed to load users");
      })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (userId: string, status: string) => {
    const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/ban-status`, {
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
      toast.error("Failed to update status");
    }
  };

  const updateRole = async (userId: string, role: string) => {
    const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
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
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
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

                  <div className="flex gap-2">
                    {user.status !== "BANNED" ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateStatus(user.id, "BANNED")}
                      >
                        Ban User
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(user.id, "ACTIVE")}
                      >
                        Unban User
                      </Button>
                    )}
                    
                    {user.role !== "TUTOR" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateRole(user.id, "TUTOR")}
                      >
                        Make Tutor
                      </Button>
                    )}
                    
                    {user.role !== "STUDENT" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateRole(user.id, "STUDENT")}
                      >
                        Make Student
                      </Button>
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
