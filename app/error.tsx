"use client";

import { AlertTriangle } from "lucide-react";

// Fallback 500 page — not present in BabyCare-1.0.0 (see SOURCE_AUDIT.md §11).
// Reuses the 404 page's visual composition with the brief's required copy.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-light px-4 py-20 text-center">
      <AlertTriangle size={48} className="mb-4 text-primary" />
      <h1 className="mb-4 text-3xl text-dark sm:text-4xl">Something broke. We are fixing it!</h1>
      <p className="mb-8 max-w-md text-body text-ink">
        Our little helpers have been notified. Please try again in a moment, or
        head back home.
      </p>
      <div className="flex gap-4">
        <button onClick={() => reset()} className="btn-eden btn-eden-primary min-h-[48px]">
          Try Again
        </button>
        <a href="/" className="btn-eden border-2 border-dark bg-transparent text-dark hover:bg-white min-h-[48px]">
          Back to Fun
        </a>
      </div>
    </div>
  );
}
