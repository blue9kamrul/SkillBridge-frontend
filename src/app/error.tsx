"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-xl px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-6 text-muted-foreground">An unexpected error occurred. Try refreshing the page.</p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 rounded bg-primary text-white" onClick={() => reset()}>Try again</button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
