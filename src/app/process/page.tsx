// src/app/process/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Timeline } from "@/components/ui/Timeline";

export const metadata: Metadata = {
  title: "Process",
  description: "How GrowthAlis delivers premium websites and lead conversion improvements.",
};

const steps = [
  {
    title: "Discover",
    desc: "We understand your offer, audience, and what success looks like.",
  },
  {
    title: "Structure",
    desc: "We map pages and sections to match how people decide.",
  },
  {
    title: "Design",
    desc: "Clean UI with bold accents, spacing, and subtle arcs.",
  },
  {
    title: "Build",
    desc: "Next.js + Tailwind with performance-friendly components.",
  },
  {
    title: "Launch",
    desc: "QA, SEO basics, analytics readiness, and handover.",
  },
];

export default function ProcessPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Process"
        title="A simple process that keeps things fast and predictable."
        subtitle="No chaos, no endless revisions. Just a clear flow that gets you a premium site that converts."
      >
        <Link className="btn-base btn-primary" href="/contact">
          Book a call
        </Link>
      </PageHeader>

      <Section
        title="How we work"
        subtitle="Each step has a clear output. You always know what’s next."
      >
        <Timeline steps={steps} />
      </Section>
    </main>
  );
}