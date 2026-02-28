import Link from "next/link";

const TOOLS = [
  {
    title: "Website ROI Estimator",
    desc: "Estimate business impact of improving your website.",
    href: "/tools/website-roi",
    time: "3–5 min",
  },
  {
    title: "Landing Page Score",
    desc: "Quick checklist score to spot conversion gaps.",
    href: "/tools/landing-page-score",
    time: "2–4 min",
  },
  {
    title: "Marketing Budget Split",
    desc: "Suggested budget allocation based on goals.",
    href: "/tools/marketing-budget",
    time: "2–4 min",
  },
  {
    title: "AI Project Brief Builder",
    desc: "Generate a structured brief in under 90 seconds.",
    href: "/tools/brief-builder",
    time: "5–8 min",
    tag: "AI",
  },
  {
    title: "Outcome Recommender (AI)",
    desc: "Get the best-fit service/solution path for your goal.",
    href: "/tools/outcome-recommender",
    time: "2–4 min",
    tag: "AI",
  },
  {
    title: "Instant Website Audit (Heuristic)",
    desc: "Fast audit with practical fixes (no measured claims).",
    href: "/tools/website-audit",
    time: "2–4 min",
    tag: "AI",
  },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <div className="text-sm font-semibold text-black/60">Free Tools</div>
        <h1 className="mt-2 text-3xl font-semibold text-[rgb(var(--ga-black))] md:text-4xl">
          Lead magnets that feel like a product
        </h1>
        <p className="mt-3 max-w-2xl text-black/70">
          Use these to get quick answers, then move to an implementation plan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-2xl border border-black/10 bg-white p-5 transition hover:bg-black/[0.02]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-lg font-semibold text-[rgb(var(--ga-black))]">
                  {t.title}
                </div>
                <div className="mt-2 text-sm text-black/70">{t.desc}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {t.tag ? (
                  <span className="rounded-full bg-[rgb(var(--ga-yellow))]/15 px-2.5 py-1 text-xs font-semibold text-black/70">
                    {t.tag}
                  </span>
                ) : null}
                <span className="rounded-full border border-black/10 px-2.5 py-1 text-xs text-black/60">
                  {t.time}
                </span>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[rgb(var(--ga-red))]">
              Open tool <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}