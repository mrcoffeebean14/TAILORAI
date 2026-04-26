"use client";

import { useMemo } from "react";

import { useGenerationStore } from "@/store/generationStore";

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

export function OutputViewer() {
  const response = useGenerationStore((state) => state.response);

  const hasCoverLetter = useMemo(() => Boolean(response?.cover_letter.trim()), [response]);

  if (!response) {
    return (
      <div className="rounded-2xl border border-ink/20 bg-white/80 p-6 text-sm text-ink/80 shadow-card">
        No generated output yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-ink/20 bg-white/90 p-6 shadow-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">Customized Resume LaTeX</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => copyToClipboard(response.final_resume_latex)}
              className="rounded-lg border border-ink/20 px-3 py-2 text-xs font-semibold text-ink transition hover:bg-cloud"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={() => downloadTextFile("resume-customized.tex", response.final_resume_latex)}
              className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:bg-tide"
            >
              Download .tex
            </button>
          </div>
        </div>
        <pre className="max-h-96 overflow-auto rounded-xl bg-ink p-4 text-xs text-cloud">
          {response.final_resume_latex}
        </pre>
      </section>

      {hasCoverLetter ? (
        <section className="rounded-2xl border border-ink/20 bg-white/90 p-6 shadow-card">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold text-ink">Generated Cover Letter</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(response.cover_letter)}
                className="rounded-lg border border-ink/20 px-3 py-2 text-xs font-semibold text-ink transition hover:bg-cloud"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={() => downloadTextFile("cover-letter.txt", response.cover_letter)}
                className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:bg-tide"
              >
                Download .txt
              </button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-cloud p-4 text-sm text-ink">
            {response.cover_letter}
          </pre>
        </section>
      ) : null}
    </div>
  );
}
