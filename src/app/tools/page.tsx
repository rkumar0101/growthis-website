// src/app/tools/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata: Metadata = {
  title: "Free Tools",
  description: "Free tools by GrowthAlis: quick calculators and scoring tools to guide your next website decisions.",
};

const tools = [
  {
    title: "Website ROI Estimator",
    desc: "Estimate what a better converting site could be worth.",
    href: "/tools/website-roi",
  },
  {
    title: "Landing Page Score",
    desc: "Score your landing page basics and get quick fixes.",
    href: "/tools/landing-page-score",
  },
  {
    title: "Marketing Budget Split",
    desc: "A simple budget split suggestion based on your goal.",
    href: "/tools/marketing-budget",
  },
];

export default function ToolsHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Free Tools"
        title="Quick tools that give you a clear next step."
        subtitle="Simple inputs. Clean results. No nonsense."
      >
        <Link className="btn-base btn-primary" href="/contact">
          Book a call
        </Link>
      </PageHeader>

      <Section title="Tools">
        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <h3 className="h-font text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{t.desc}</p>
              <p className="mt-4 text-sm font-semibold text-[rgb(var(--ga-red))]">
                Open tool →
              </p>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}