// src/app/tools/landing-page-score/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";

type Q = { key: string; label: string; hint: string };

const questions: Q[] = [
  { key: "headline", label: "Clear headline", hint: "Can someone understand your offer in 5 seconds?" },
  { key: "cta", label: "One primary CTA", hint: "Is there one clear action across the page?" },
  { key: "proof", label: "Proof near CTAs", hint: "Testimonials, logos, results, or credibility signals." },
  { key: "sections", label: "Clean section flow", hint: "Problem → solution → proof → CTA." },
  { key: "speed", label: "Fast enough on mobile", hint: "Does it feel quick and stable?" },
];

export default function LandingScoreTool() {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    headline: true,
    cta: true,
    proof: false,
    sections: true,
    speed: false,
  });

  const score = useMemo(() => {
    const total = questions.length;
    const yes = questions.filter((q) => checks[q.key]).length;
    return Math.round((yes / total) * 100);
  }, [checks]);

  const message = score >= 80 ? "Strong foundation." : score >= 55 ? "Good, but fix a few basics." : "Needs cleanup to convert better.";

  return (
    <main>
      <PageHeader
        eyebrow="Tool"
        title="Landing Page Score"
        subtitle="Tick the basics and get a simple score + next steps."
      >
        <Link className="btn-base btn-secondary" href="/tools">
          Back to tools
        </Link>
      </PageHeader>

      <Section title="Checklist">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {questions.map((q) => (
              <label key={q.key} className="flex gap-3 rounded-2xl border border-neutral-200 p-4">
                <input
                  type="checkbox"
                  checked={checks[q.key]}
                  onChange={(e) => setChecks((p) => ({ ...p, [q.key]: e.target.checked }))}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  <span className="block text-sm font-semibold">{q.label}</span>
                  <span className="block text-sm text-neutral-700">{q.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </Section>

      <section className="pb-12">
        <Container>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8">
            <h2 className="h-font text-2xl font-semibold">Result</h2>
            <p className="mt-2 text-sm text-neutral-700">{message}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Metric label="Score" value={`${score}/100`} />
              <Metric label="Quick next step" value={score >= 80 ? "Polish proof + CTA placement" : "Fix headline, proof, and speed"} />
              <Metric label="Best action" value="Run a short step form" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-base btn-primary" href="/contact">
                Get a better landing page
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <p className="text-xs font-semibold text-neutral-500">{label}</p>
      <p className="h-font mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}