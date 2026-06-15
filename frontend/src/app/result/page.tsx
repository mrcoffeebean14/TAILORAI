"use client";

import Link from "next/link";

import { OutputViewer } from "@/components/OutputViewer";
import { useGenerationStore } from "@/store/generationStore";

export default function ResultPage() {
  const response = useGenerationStore((state) => state.response);

  return (
    <div className="min-h-screen form-gradient">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✦</span>
            <span className="font-serif text-xl font-bold text-ink">TailorAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/generate"
              className="rounded-full border border-ink/20 bg-white/60 px-4 py-2 text-sm font-semibold text-ink backdrop-blur-sm transition hover:bg-white hover:shadow-md"
            >
              ← New Resume
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8 animate-rise">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/60 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold tracking-wide text-emerald-700">
              GENERATION COMPLETE
            </span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-ink md:text-5xl">
            Your Tailored Resume
          </h1>
          <p className="mt-3 text-base text-ink/70">
            Download the .tex file and paste it into Overleaf to compile.
          </p>
        </div>

        {!response ? (
          <div className="glass rounded-2xl p-8 shadow-card">
            <p className="text-base text-ink/60">
              No generated output available.{" "}
              <Link href="/generate" className="font-semibold text-tide hover:underline">
                Start from the generator
              </Link>{" "}
              and submit a request.
            </p>
          </div>
        ) : (
          <OutputViewer />
        )}
      </main>
    </div>
  );
}
