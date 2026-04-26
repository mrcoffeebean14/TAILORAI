"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useGenerateResume } from "@/hooks/useGenerateResume";
import { useGenerationStore } from "@/store/generationStore";

export function ResumeForm() {
  const router = useRouter();
  const { runGeneration } = useGenerateResume();

  const storedRequest = useGenerationStore((state) => state.request);
  const isLoading = useGenerationStore((state) => state.isLoading);
  const error = useGenerationStore((state) => state.error);

  const [resumeLatex, setResumeLatex] = useState(storedRequest.resume_latex);
  const [jobDescription, setJobDescription] = useState(storedRequest.job_description);
  const [role, setRole] = useState(storedRequest.role);
  const [generateCoverLetter, setGenerateCoverLetter] = useState(
    storedRequest.generate_cover_letter,
  );

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
      className="animate-rise rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card backdrop-blur md:p-8"
    >
      <div className="grid gap-6">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Role</span>
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="Senior Backend Engineer"
            className="rounded-xl border border-ink/20 bg-cloud px-4 py-3 text-sm text-ink outline-none transition focus:border-ember"
            required
            minLength={2}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Job Description</span>
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the full job description"
            className="min-h-40 rounded-xl border border-ink/20 bg-cloud px-4 py-3 text-sm text-ink outline-none transition focus:border-ember"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Resume LaTeX</span>
          <textarea
            value={resumeLatex}
            onChange={(event) => setResumeLatex(event.target.value)}
            placeholder="Paste your LaTeX resume source"
            className="min-h-52 rounded-xl border border-ink/20 bg-cloud px-4 py-3 font-mono text-xs text-ink outline-none transition focus:border-ember"
            required
          />
        </label>

        <label className="flex items-center justify-between rounded-xl border border-ink/20 bg-cloud px-4 py-3">
          <span className="text-sm font-semibold text-ink">Generate cover letter</span>
          <button
            type="button"
            onClick={() => setGenerateCoverLetter((prev) => !prev)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
              generateCoverLetter ? "bg-ember" : "bg-ink/20"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                generateCoverLetter ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-tide disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Generating..." : "Forge Resume"}
        </button>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </div>
    </form>
  );
}
