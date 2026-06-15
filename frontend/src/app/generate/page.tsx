"use client";

import Link from "next/link";

import { ResumeForm } from "@/components/ResumeForm";

export default function GeneratePage() {
  return (
    <div className="min-h-screen form-gradient">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✦</span>
            <span className="font-serif text-xl font-bold text-ink">TailorAI</span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-ink/20 bg-white/60 px-4 py-2 text-sm font-semibold text-ink backdrop-blur-sm transition hover:bg-white hover:shadow-md"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
        <section className="mb-8 animate-rise">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-tide/20 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-ink/80">
              MULTI-AGENT PIPELINE
            </span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-ink md:text-5xl">
            Generate Tailored Resume
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink/70">
            Paste your LaTeX resume, add the job description and role, and let the AI agents
            customize every section while keeping your facts intact.
          </p>
        </section>

        <ResumeForm />
      </main>
    </div>
  );
}
