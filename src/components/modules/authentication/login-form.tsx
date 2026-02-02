"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useUser } from "@/lib/user-context";
import { useEffect } from "react";
import { getApiBaseUrl } from "@/lib/api-url";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { setUser } = useUser();

  // Clear any URL query parameters on mount to prevent auto-fill from persisted state
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        // Store token in localStorage if present
        if (data && data.token) {
          localStorage.setItem("token", data.token);
        }

        // Fetch user data and update context immediately
        try {
          const base = getApiBaseUrl();
          const url = base.endsWith("/api") ? `${base}/user/me` : `${base}/api/user/me`;
          const userRes = await fetch(url, { credentials: "include" });
          if (userRes.status === 403) {
            // User is banned
            const userData = await userRes.json();
            toast.error(userData.message || "Your account has been banned", { id: toastId });
            await authClient.signOut({ fetchOptions: { credentials: 'include' } });
            return;
          }
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData.data);
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }

        toast.success("Signed in successfully!", { id: toastId });
        router.push("/");
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const result = z.string().email("Invalid email address").safeParse(value);
                  if (!result.success) {
                    return result.error.issues[0].message;
                  }
                  return undefined;
                },
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="john@example.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const result = z.string().min(1, "Password is required").safeParse(value);
                  if (!result.success) {
                    return result.error.issues[0].message;
                  }
                  return undefined;
                },
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button form="login-form" type="submit" className="w-full">
          Sign In
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
