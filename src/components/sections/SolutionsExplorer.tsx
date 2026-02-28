"use client";

import { useMemo, useState } from "react";
import Drawer from "@/components/ui/Drawer";
import { OUTCOMES, SOLUTIONS, type Outcome, type Solution } from "@/lib/solutionsData";

type BudgetBand = "Low" | "Mid" | "High";
type Timeline = "ASAP" | "2-4 weeks" | "1-2 months" | "Flexible";

function scoreSolution(
  sol: Solution,
  outcome: Outcome,
  budget: BudgetBand,
  timeline: Timeline
) {
  let score = 0;

  if (sol.outcomeTags.includes(outcome)) score += 3;

  // light heuristic
  if (sol.id.includes("premium") && (budget === "Mid" || budget === "High")) score += 1;
  if (sol.id.includes("automation") && (budget === "Mid" || budget === "High")) score += 1;
  if (timeline === "ASAP" && sol.id.includes("lead")) score += 1;

  return score;
}

export default function SolutionsExplorer() {
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome>(OUTCOMES[0] ?? "More leads");
  const [drawer, setDrawer] = useState<Solution | null>(null);

  // Wizard states
  const [wizardOutcome, setWizardOutcome] = useState<Outcome>(OUTCOMES[0] ?? "More leads");
  const [wizardBudget, setWizardBudget] = useState<BudgetBand>("Mid");
  const [wizardTimeline, setWizardTimeline] = useState<Timeline>("2-4 weeks");

  const orderedSolutions = useMemo(() => {
    const list = [...SOLUTIONS];
    list.sort((a, b) => {
      const aHas = a.outcomeTags.includes(selectedOutcome) ? 1 : 0;
      const bHas = b.outcomeTags.includes(selectedOutcome) ? 1 : 0;
      return bHas - aHas;
    });
    return list;
  }, [selectedOutcome]);

  const wizardPick = useMemo(() => {
    const scored = SOLUTIONS.map((s) => ({
      s,
      score: scoreSolution(s, wizardOutcome, wizardBudget, wizardTimeline),
    })).sort((a, b) => b.score - a.score);

    return scored[0]?.s ?? null;
  }, [wizardOutcome, wizardBudget, wizardTimeline]);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="mb-6">
        <div className="text-sm font-semibold text-black/60">Solutions</div>
        <h1 className="mt-2 text-3xl font-semibold text-[rgb(var(--ga-black))] md:text-4xl">
          Outcomes first. Build like a product.
        </h1>
        <p className="mt-3 max-w-2xl text-black/70">
          Pick what you want to achieve. We’ll show a blueprint and the fastest path to implementation.
        </p>
      </div>

      {/* Outcome selector */}
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <div className="text-sm font-semibold text-black/70">I want to…</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {OUTCOMES.map((o) => {
            const active = o === selectedOutcome;
            return (
              <button
                key={o}
                type="button"
                onClick={() => setSelectedOutcome(o)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition",
                  active
                    ? "border-[rgb(var(--ga-red))] bg-[rgb(var(--ga-red))] text-white"
                    : "border-black/10 bg-white text-black/80 hover:bg-black/[0.04]",
                ].join(" ")}
              >
                {o}
              </button>
            );
          })}
        </div>
        <div className="mt-3 text-xs text-black/60">
          This reorders recommendations live (no page reload).
        </div>
      </div>

      {/* Solutions grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {orderedSolutions.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-black/10 bg-white p-5 transition hover:bg-black/[0.02]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-lg font-semibold text-[rgb(var(--ga-black))]">
                  {s.title}
                </div>
                <div className="mt-2 text-sm text-black/70">{s.summary}</div>
              </div>

              <div className="flex flex-wrap gap-2">
                {s.outcomeTags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[rgb(var(--ga-yellow))]/15 px-2.5 py-1 text-xs font-semibold text-black/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-semibold text-black/70">Best for</div>
              <ul className="mt-2 space-y-2">
                {s.whoFor.slice(0, 3).map((w) => (
                  <li key={w} className="flex gap-2 text-sm text-black/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDrawer(s)}
                className="inline-flex items-center justify-center rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
              >
                View blueprint
              </button>

              <a
                href={s.primaryCta.href}
                className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
              >
                {s.primaryCta.label}
              </a>

              {s.suggestedTool ? (
                <a
                  href={s.suggestedTool.href}
                  className="inline-flex items-center justify-center rounded-md bg-black/[0.04] px-4 py-2 text-sm hover:bg-black/[0.06]"
                >
                  {s.suggestedTool.title}
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Wizard */}
      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black/60">Quick recommender</div>
            <div className="mt-1 text-xl font-semibold text-[rgb(var(--ga-black))]">
              Get the best-fit path in 10 seconds
            </div>
            <div className="mt-2 text-sm text-black/70">
              This is an on-page wizard. The AI version lives in Tools.
            </div>
          </div>

          <a
            href="/tools/outcome-recommender"
            className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          >
            Use AI recommender
          </a>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <label className="rounded-xl border border-black/10 p-3 text-sm">
            <div className="font-semibold text-black/70">Outcome</div>
            <select
              className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
              value={wizardOutcome}
              onChange={(e) => setWizardOutcome(e.target.value as Outcome)}
            >
              {OUTCOMES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label className="rounded-xl border border-black/10 p-3 text-sm">
            <div className="font-semibold text-black/70">Budget</div>
            <select
              className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
              value={wizardBudget}
              onChange={(e) => setWizardBudget(e.target.value as BudgetBand)}
            >
              {["Low", "Mid", "High"].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="rounded-xl border border-black/10 p-3 text-sm">
            <div className="font-semibold text-black/70">Timeline</div>
            <select
              className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
              value={wizardTimeline}
              onChange={(e) => setWizardTimeline(e.target.value as Timeline)}
            >
              {["ASAP", "2-4 weeks", "1-2 months", "Flexible"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
          {!wizardPick ? (
            <div className="text-sm text-black/70">No match yet.</div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-black/60">Recommended</div>
                <div className="mt-1 text-lg font-semibold text-[rgb(var(--ga-black))]">
                  {wizardPick.title}
                </div>
                <div className="mt-1 text-sm text-black/70">{wizardPick.summary}</div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDrawer(wizardPick)}
                  className="inline-flex items-center justify-center rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
                >
                  View blueprint
                </button>

                <a
                  href={wizardPick.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
                >
                  {wizardPick.primaryCta.label}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blueprint drawer */}
      <Drawer
        open={!!drawer}
        onClose={() => setDrawer(null)}
        title={drawer ? `Blueprint: ${drawer.title}` : "Blueprint"}
      >
        {!drawer ? null : (
          <div className="space-y-6">
            <div>
              <div className="text-sm font-semibold text-black/70">Summary</div>
              <div className="mt-2 text-sm text-black/70">{drawer.summary}</div>
            </div>

            <div>
              <div className="text-sm font-semibold text-black/70">Step flow</div>
              <div className="mt-3 space-y-4">
                {drawer.blueprint.map((step, idx) => (
                  <div
                    key={`${step.title}-${idx}`}
                    className="rounded-2xl border border-black/10 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(var(--ga-yellow))]/20 text-xs font-bold text-black/70">
                        {idx + 1}
                      </span>
                      <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                        {step.title}
                      </div>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex gap-2 text-sm text-black/75">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-black/70">Deliverables</div>
              <ul className="mt-3 space-y-2">
                {drawer.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-black/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={drawer.primaryCta.href}
                className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
              >
                {drawer.primaryCta.label}
              </a>

              {drawer.suggestedTool ? (
                <a
                  href={drawer.suggestedTool.href}
                  className="inline-flex items-center justify-center rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
                >
                  {drawer.suggestedTool.title}
                </a>
              ) : null}
            </div>

            <div className="text-xs text-black/60">
              Note: This blueprint is a high-level plan. Scope is finalized after discovery.
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}