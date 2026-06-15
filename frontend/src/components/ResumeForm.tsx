"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useGenerateResume } from "@/hooks/useGenerateResume";
import { useGenerationStore } from "@/store/generationStore";

export function ResumeForm() {
  const router = useRouter();
  const { runGeneration } = useGenerateResume();

  const isLoading = useGenerationStore((state) => state.isLoading);
  const error = useGenerationStore((state) => state.error);

  const [resumeLatex, setResumeLatex] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("");
  const [generateCoverLetter, setGenerateCoverLetter] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await runGeneration({
      resume_latex: resumeLatex,
      job_description: jobDescription,
      role,
      generate_cover_letter: generateCoverLetter,
    });

    router.push("/result");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-rise glass rounded-3xl p-6 shadow-card md:p-8"
    >
      <div className="grid gap-6">
        {/* Role */}
        <label className="grid gap-2" htmlFor="role-input">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-tide/10 text-xs">🎯</span>
            <span className="text-sm font-semibold text-ink">Target Role</span>
          </div>
          <input
            id="role-input"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="e.g. Software Engineer Intern"
            className="rounded-xl border border-ink/10 bg-cloud/60 px-4 py-3 text-sm text-ink outline-none transition focus:border-tide focus:ring-2 focus:ring-tide/20"
            required
            minLength={2}
          />
        </label>

        {/* Job Description */}
        <label className="grid gap-2" htmlFor="jd-input">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ember/10 text-xs">📋</span>
            <span className="text-sm font-semibold text-ink">Job Description</span>
          </div>
          <textarea
            id="jd-input"
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the full job description here..."
            className="min-h-40 rounded-xl border border-ink/10 bg-cloud/60 px-4 py-3 text-sm text-ink outline-none transition focus:border-tide focus:ring-2 focus:ring-tide/20"
            required
          />
        </label>

        {/* Resume LaTeX */}
        <label className="grid gap-2" htmlFor="latex-input">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-tide/10 text-xs">📄</span>
            <span className="text-sm font-semibold text-ink">Resume LaTeX Source</span>
          </div>
          <textarea
            id="latex-input"
            value={resumeLatex}
            onChange={(event) => setResumeLatex(event.target.value)}
            placeholder="Paste your LaTeX resume code here..."
            className="min-h-52 rounded-xl border border-ink/10 bg-cloud/60 px-4 py-3 font-mono text-xs text-ink outline-none transition focus:border-tide focus:ring-2 focus:ring-tide/20 custom-scrollbar"
            required
          />
        </label>

        {/* Cover Letter Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-ink/10 bg-cloud/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ember/10 text-xs">✉️</span>
            <span className="text-sm font-semibold text-ink">Generate cover letter</span>
          </div>
          <button
            type="button"
            onClick={() => setGenerateCoverLetter((prev) => !prev)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
              generateCoverLetter ? "bg-ember" : "bg-ink/20"
            }`}
            aria-label="Toggle cover letter generation"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition ${
                generateCoverLetter ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative overflow-hidden rounded-xl bg-ink px-4 py-4 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                AI Agents Working...
              </span>
            ) : (
              "⚡ Forge Resume"
            )}
          </span>
          {!isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-tide to-ember opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
            <span className="font-semibold">Error:</span> {error}
          </div>
        ) : null}
      </div>
    </form>
  );
}
