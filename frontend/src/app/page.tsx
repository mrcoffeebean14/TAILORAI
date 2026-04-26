import { ResumeForm } from "@/components/ResumeForm";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 md:px-8">
      <section className="mb-8 animate-rise">
        <p className="mb-3 inline-block rounded-full border border-ink/20 bg-white/80 px-4 py-1 text-xs font-semibold tracking-wide text-ink">
          TAILORAI
        </p>
        <h1 className="font-serif text-4xl font-bold text-ink md:text-6xl">
          Tailor Your Resume for Every Opportunity
        </h1>
        <p className="mt-4 max-w-3xl text-base text-ink/80 md:text-lg">
          Paste your LaTeX resume, add a job description, and let the multi-agent workflow
          customize your impact statements while preserving factual integrity.
        </p>
      </section>

      <ResumeForm />
    </main>
  );
}
