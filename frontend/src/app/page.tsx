import Link from "next/link";

/* ---------- Feature cards data ---------- */
const features = [
  {
    icon: "🤖",
    title: "Multi-Agent Pipeline",
    description:
      "Parallel AI agents customize each resume section concurrently — Skills, Experience, Projects, and Education are tailored simultaneously for speed.",
  },
  {
    icon: "🔒",
    title: "Factual Integrity",
    description:
      "Strict guardrails ensure the AI never invents projects, employers, or metrics. Company names, titles, and dates stay untouched.",
  },
  {
    icon: "📄",
    title: "Full LaTeX Preservation",
    description:
      "Your document structure, preamble, heading block, and custom formatting are preserved exactly — only the relevant sections are enhanced.",
  },
  {
    icon: "⚡",
    title: "Provider-Agnostic LLM",
    description:
      "Seamlessly switch between OpenAI, Anthropic Claude, Google Gemini, and Groq — decoupled architecture lets you choose any model.",
  },
  {
    icon: "✉️",
    title: "Cover Letter Generation",
    description:
      "Optionally generate a professional cover letter grounded in your actual resume and the specific job description.",
  },
  {
    icon: "🎯",
    title: "Section-Specific Rules",
    description:
      "Skills get reordered, project bullets get rewritten, experience wording gets sharpened — each section follows its own tailoring strategy.",
  },
];

/* ---------- How it works steps ---------- */
const steps = [
  {
    step: "01",
    title: "Paste Your Resume",
    description: "Drop in your LaTeX resume source code. Your formatting stays intact.",
  },
  {
    step: "02",
    title: "Add the Job Description",
    description: "Paste the full job posting and target role title.",
  },
  {
    step: "03",
    title: "AI Tailors Every Section",
    description: "Multi-agent pipeline rewrites bullet points to align with the JD.",
  },
  {
    step: "04",
    title: "Download & Apply",
    description: "Get a complete .tex file ready for Overleaf — plus an optional cover letter.",
  },
];

/* ---------- Stats ---------- */
const stats = [
  { value: "4", label: "LLM Providers" },
  { value: "5+", label: "Sections Customized" },
  { value: "70-80%", label: "Manual Effort Reduced" },
  { value: "<30s", label: "Generation Time" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✦</span>
            <span className="font-serif text-xl font-bold text-ink">TailorAI</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="hidden text-sm font-medium text-ink/70 transition hover:text-ink md:block"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hidden text-sm font-medium text-ink/70 transition hover:text-ink md:block"
            >
              How It Works
            </a>
            <Link
              href="/generate"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-tide hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="float-slow absolute left-[10%] top-[20%] h-3 w-3 rounded-full bg-ember/30" />
          <div className="float-med absolute right-[15%] top-[30%] h-2 w-2 rounded-full bg-tide/40" />
          <div className="float-fast absolute left-[70%] top-[60%] h-4 w-4 rounded-full bg-ember/20" />
          <div className="float-slow absolute left-[30%] top-[70%] h-2 w-2 rounded-full bg-tide/30" />
          <div className="float-med absolute right-[25%] top-[15%] h-3 w-3 rounded-full bg-tide/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-32 md:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-tide/20 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-ink/80">
                POWERED BY MULTI-AGENT AI
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-slide-up font-serif text-5xl font-bold leading-tight text-ink md:text-7xl">
              Tailor Your Resume
              <br />
              <span className="shimmer-text">for Every Opportunity</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg text-ink/70 md:text-xl" style={{ animationDelay: "0.15s" }}>
              Paste your LaTeX resume, add a job description, and let the multi-agent pipeline
              customize your impact statements while{" "}
              <span className="font-semibold text-ink">preserving factual integrity</span>.
            </p>

            {/* CTA Buttons */}
            <div className="animate-slide-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/generate"
                className="group relative overflow-hidden rounded-full bg-ink px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-xl hover:shadow-ink/20"
              >
                <span className="relative z-10">Start Tailoring →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-tide to-ember opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <a
                href="#how-it-works"
                className="rounded-full border border-ink/20 bg-white/60 px-8 py-4 text-base font-semibold text-ink backdrop-blur-sm transition hover:bg-white hover:shadow-md"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-rise mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8" style={{ animationDelay: "0.5s" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 text-center transition hover:shadow-lg"
              >
                <div className="font-serif text-3xl font-bold text-ember">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-ink/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative bg-white/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-ember">FEATURES</p>
            <h2 className="font-serif text-3xl font-bold text-ink md:text-5xl">
              Everything You Need to Stand Out
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink/60">
              A production-grade AI system with guardrails, not a generic prompt wrapper.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ember/10 to-tide/10 text-2xl transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="hero-gradient py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-tide">HOW IT WORKS</p>
            <h2 className="font-serif text-3xl font-bold text-ink md:text-5xl">
              Four Steps to a Tailored Resume
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="glass rounded-2xl p-6 transition-all hover:shadow-lg">
                  <div className="mb-4 font-serif text-4xl font-bold text-ember/20">{step.step}</div>
                  <h3 className="mb-2 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/60">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-ink/20 lg:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION RULES ===== */}
      <section className="bg-white/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-ember">TAILORING RULES</p>
            <h2 className="font-serif text-3xl font-bold text-ink md:text-5xl">
              Smart Constraints, Real Results
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink/60">
              Each section follows its own set of rules — so nothing gets fabricated, ever.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Skills */}
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-tide/10 text-xl">⚙️</span>
                <h3 className="text-lg font-bold text-ink">Skills</h3>
              </div>
              <ul className="space-y-2 text-sm text-ink/70">
                <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span> Reorder &amp; emphasize skills matching the JD</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span> Restructure categories for relevance</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Never adds skills you don&apos;t have</li>
              </ul>
            </div>

            {/* Experience */}
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember/10 text-xl">💼</span>
                <h3 className="text-lg font-bold text-ink">Experience</h3>
              </div>
              <ul className="space-y-2 text-sm text-ink/70">
                <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span> Rewrites bullet points for job alignment</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Company names, titles &amp; dates stay locked</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Never adds fake employers or positions</li>
              </ul>
            </div>

            {/* Projects */}
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-tide/10 text-xl">🚀</span>
                <h3 className="text-lg font-bold text-ink">Projects</h3>
              </div>
              <ul className="space-y-2 text-sm text-ink/70">
                <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span> Rewrites descriptions to match the role</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Project names &amp; links stay unchanged</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Never invents new projects</li>
              </ul>
            </div>

            {/* Education */}
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember/10 text-xl">🎓</span>
                <h3 className="text-lg font-bold text-ink">Education</h3>
              </div>
              <ul className="space-y-2 text-sm text-ink/70">
                <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span> Minimal wording adjustments only</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Institution, degree, dates &amp; GPA stay locked</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Nothing gets fabricated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-ink md:text-5xl">
            Ready to Tailor Your Resume?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink/60">
            Stop sending the same resume to every job. Let TailorAI customize each application in seconds.
          </p>
          <div className="mt-10">
            <Link
              href="/generate"
              className="group relative inline-flex overflow-hidden rounded-full bg-ink px-10 py-4 text-base font-semibold text-white transition-all hover:shadow-xl hover:shadow-ink/20"
            >
              <span className="relative z-10">Start Tailoring for Free →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-tide to-ember opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-ink/10 bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg">✦</span>
            <span className="font-serif text-sm font-bold text-ink">TailorAI</span>
            <span className="text-xs text-ink/40">v1.0.0</span>
          </div>
          <p className="text-xs text-ink/50">
            Built with LangGraph, FastAPI &amp; Next.js — Multi-Agent Resume Tailoring
          </p>
          <a
            href="https://github.com/mrcoffeebean14/TAILORAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-tide transition hover:text-ember"
          >
            GitHub →
          </a>
        </div>
      </footer>
    </div>
  );
}
