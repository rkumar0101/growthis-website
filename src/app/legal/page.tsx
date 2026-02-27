// src/app/legal/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal pages for GrowthAlis: Terms and Privacy.",
};

export default function LegalHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Legal"
        title="Terms and Privacy"
        subtitle="Simple and transparent policies."
      >
        <div className="flex flex-wrap gap-3">
          <Link className="btn-base btn-primary" href="/legal/terms">
            Terms
          </Link>
          <Link className="btn-base btn-secondary" href="/legal/privacy">
            Privacy
          </Link>
        </div>
      </PageHeader>

      <Section>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700">
          We’ll plug your final Terms & Privacy content here. For now these pages exist so routes don’t break.
        </div>
      </Section>
    </main>
  );
}