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

function CopyButton({ onClick, label }: { onClick: () => void; label: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    onClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2 text-xs font-semibold text-ink backdrop-blur-sm transition hover:bg-white hover:shadow-sm"
    >
      {copied ? "✓ Copied" : label}
    </button>
  );
}

function ThoughtsAccordion({ thoughts }: { thoughts: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!thoughts || thoughts.length === 0) return null;

  return (
    <div className="mb-4 rounded-xl border border-tide/20 bg-tide/5 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-tide transition-colors hover:bg-tide/10"
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
      <div className="animate-rise glass rounded-2xl p-6 text-sm text-ink/80 shadow-card">
        No generated output yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 animate-rise">
      {parsedResume && (
        <section className="min-w-0 glass rounded-2xl p-6 shadow-card transition-all hover:shadow-lg">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tide/10 text-xl">📄</span>
              <h2 className="font-serif text-2xl font-semibold text-ink">Customized Resume</h2>
            </div>
            <div className="flex gap-2">
              <CopyButton
                onClick={() => copyToClipboard(parsedResume.cleanedText)}
                label="Copy"
              />
              <button
                type="button"
                onClick={() => downloadTextFile("resume-customized.tex", parsedResume.cleanedText)}
                className="group relative overflow-hidden rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:shadow-md"
              >
                <span className="relative z-10">Download .tex</span>
                <div className="absolute inset-0 bg-gradient-to-r from-tide to-ember opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>
          </div>

          <ThoughtsAccordion thoughts={parsedResume.thoughts} />

          <pre className="max-h-96 w-full overflow-auto whitespace-pre-wrap break-words rounded-xl bg-ink p-4 text-xs text-cloud shadow-inner custom-scrollbar">
            {parsedResume.cleanedText}
          </pre>
        </section>
      )}

      {hasCoverLetter && parsedCoverLetter && (
        <section className="glass rounded-2xl p-6 shadow-card transition-all hover:shadow-lg">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember/10 text-xl">✉️</span>
              <h2 className="font-serif text-2xl font-semibold text-ink">Cover Letter</h2>
            </div>
            <div className="flex gap-2">
              <CopyButton
                onClick={() => copyToClipboard(parsedCoverLetter.cleanedText)}
                label="Copy"
              />
              <button
                type="button"
                onClick={() => downloadTextFile("cover-letter.txt", parsedCoverLetter.cleanedText)}
                className="group relative overflow-hidden rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:shadow-md"
              >
                <span className="relative z-10">Download .txt</span>
                <div className="absolute inset-0 bg-gradient-to-r from-tide to-ember opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>
          </div>

          <ThoughtsAccordion thoughts={parsedCoverLetter.thoughts} />

          <pre className="whitespace-pre-wrap rounded-xl bg-cloud/80 p-4 text-sm leading-relaxed text-ink shadow-inner border border-ink/5">
            {parsedCoverLetter.cleanedText}
          </pre>
        </section>
      )}
    </div>
  );
}
