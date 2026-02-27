// src/app/tools/marketing-budget/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";

type Goal = "leads" | "brand" | "launch";

export default function MarketingBudgetTool() {
  const [budget, setBudget] = useState(50000);
  const [goal, setGoal] = useState<Goal>("leads");

  const split = useMemo(() => {
    const map: Record<Goal, { label: string; pct: number }[]> = {
      leads: [
        { label: "Performance ads", pct: 45 },
        { label: "Landing pages + CRO", pct: 25 },
        { label: "Content + SEO basics", pct: 20 },
        { label: "Tools + tracking", pct: 10 },
      ],
      brand: [
        { label: "Content + design", pct: 35 },
        { label: "Distribution", pct: 25 },
        { label: "Website polish", pct: 25 },
        { label: "Community + partnerships", pct: 15 },
      ],
      launch: [
        { label: "Launch landing + messaging", pct: 30 },
        { label: "Performance push", pct: 35 },
        { label: "Creators/partners", pct: 20 },
        { label: "PR + assets", pct: 15 },
      ],
    };

    return map[goal].map((x) => ({
      ...x,
      amount: Math.round((budget * x.pct) / 100),
    }));
  }, [budget, goal]);

  return (
    <main>
      <PageHeader
        eyebrow="Tool"
        title="Marketing Budget Split"
        subtitle="Pick a goal and get a simple split suggestion you can actually use."
      >
        <Link className="btn-base btn-secondary" href="/tools">
          Back to tools
        </Link>
      </PageHeader>

      <Section title="Inputs">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold">Monthly budget (₹)</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Primary goal</span>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as Goal)}
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
              >
                <option value="leads">More leads</option>
                <option value="brand">Brand building</option>
                <option value="launch">Product launch</option>
              </select>
            </label>
          </div>
        </div>
      </Section>

      <section className="pb-12">
        <Container>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8">
            <h2 className="h-font text-2xl font-semibold">Result</h2>
            <p className="mt-2 text-sm text-neutral-700">
              A practical split. Adjust based on what’s already working for you.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {split.map((s) => (
                <div key={s.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="mt-2 text-sm text-neutral-700">
                    {s.pct}% • ₹{s.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-base btn-primary" href="/contact">
                Build a better funnel
              </Link>
              <a className="btn-base btn-secondary" href="https://wa.me/" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}