"use client";

import Link from "next/link";

import { OutputViewer } from "@/components/OutputViewer";
import { useGenerationStore } from "@/store/generationStore";

export default function ResultPage() {
  const response = useGenerationStore((state) => state.response);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-bold text-ink">Generated Result</h1>
        <Link
          href="/"
          className="rounded-lg border border-ink/20 bg-white/80 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-cloud"
        >
          Back to Home
        </Link>
      </div>

      {!response ? (
        <div className="rounded-2xl border border-ink/20 bg-white/80 p-6 shadow-card">
          <p className="text-sm text-ink/80">
            No generated output available. Start from the home page and submit a request.
          </p>
        </div>
      ) : (
        <OutputViewer />
      )}
    </main>
  );
}
