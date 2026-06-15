"use client";

import { useMemo, useState } from "react";

import { useGenerationStore } from "@/store/generationStore";
import { parseLLMOutput } from "@/utils/parseOutput";

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function copyToClipboard(content: string) {
  await navigator.clipboard.writeText(content);
}

function ThoughtsAccordion({ thoughts }: { thoughts: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!thoughts || thoughts.length === 0) return null;

  return (
    <div className="mb-4 rounded-xl border border-tide/20 bg-cloud/50 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-tide transition-colors hover:bg-tide/5"
      >
        <span className="flex items-center gap-2">
          <span>✨</span> View AI Reasoning
        </span>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-tide/10 bg-white/30 px-4 py-3 animate-rise">
          {thoughts.map((thought, idx) => (
            <p key={idx} className="mb-3 text-xs italic leading-relaxed text-ink/70 last:mb-0">
              {thought}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function OutputViewer() {
  const response = useGenerationStore((state) => state.response);

  const parsedResume = useMemo(() => {
    if (!response?.final_resume_latex) return null;
    return parseLLMOutput(response.final_resume_latex);
  }, [response?.final_resume_latex]);

  const parsedCoverLetter = useMemo(() => {
    if (!response?.cover_letter) return null;
    return parseLLMOutput(response.cover_letter);
  }, [response?.cover_letter]);

  const hasCoverLetter = Boolean(parsedCoverLetter?.cleanedText.trim());

  if (!response) {
    return (
      <div className="animate-rise rounded-2xl border border-ink/20 bg-white/80 p-6 text-sm text-ink/80 shadow-card backdrop-blur-md">
        No generated output yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 animate-rise">
      {parsedResume && (
        <section className="rounded-2xl border border-ink/20 bg-white/70 p-6 shadow-card backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-lg">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold text-ink">Customized Resume LaTeX</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(parsedResume.cleanedText)}
                className="rounded-lg border border-ink/20 px-3 py-2 text-xs font-semibold text-ink transition hover:bg-cloud hover:shadow-sm"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={() => downloadTextFile("resume-customized.tex", parsedResume.cleanedText)}
                className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:bg-tide hover:shadow-md"
              >
                Download .tex
              </button>
            </div>
          </div>

          <ThoughtsAccordion thoughts={parsedResume.thoughts} />

          <pre className="max-h-96 overflow-auto rounded-xl bg-ink p-4 text-xs text-cloud shadow-inner custom-scrollbar">
            {parsedResume.cleanedText}
          </pre>
        </section>
      )}

      {hasCoverLetter && parsedCoverLetter && (
        <section className="rounded-2xl border border-ink/20 bg-white/70 p-6 shadow-card backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-lg">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold text-ink">Generated Cover Letter</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(parsedCoverLetter.cleanedText)}
                className="rounded-lg border border-ink/20 px-3 py-2 text-xs font-semibold text-ink transition hover:bg-cloud hover:shadow-sm"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={() => downloadTextFile("cover-letter.txt", parsedCoverLetter.cleanedText)}
                className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:bg-tide hover:shadow-md"
              >
                Download .txt
              </button>
            </div>
          </div>

          <ThoughtsAccordion thoughts={parsedCoverLetter.thoughts} />

          <pre className="whitespace-pre-wrap rounded-xl bg-cloud p-4 text-sm text-ink shadow-inner border border-ink/5">
            {parsedCoverLetter.cleanedText}
          </pre>
        </section>
      )}
    </div>
  );
}
