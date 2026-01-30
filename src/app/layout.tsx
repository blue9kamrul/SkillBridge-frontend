import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "SkillBridge",
  description: "Connect tutors with students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
