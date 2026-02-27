// src/app/careers/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { CTABox } from "@/components/sections/CTABox";
import { jobs } from "@/lib/jobs";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at GrowthAlis. Explore roles and apply.",
};

export default function CareersPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Careers"
        title="Work on premium, conversion-first websites."
        subtitle="Small team, clear work, and high standards. If you care about quality, you’ll fit in."
      >
        <div className="flex flex-wrap gap-3">
          <Link className="btn-base btn-primary" href="/contact">
            Contact
          </Link>
          <a
            className="btn-base btn-primary"
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </PageHeader>

      <Section
        title="Open roles"
        subtitle="Click a role to see details and apply."
      >
        <Stagger>
          <div className="grid gap-4 md:grid-cols-3">
            {jobs.map((j) => (
              <StaggerItem key={j.slug}>
                <Link
                  href={`/careers/${j.slug}`}
                  className="block rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-yellow">
                      <span className="dot-yellow" />
                      {j.type}
                    </span>
                    <span className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700">
                      {j.location}
                    </span>
                    <span className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700">
                      {j.experience}
                    </span>
                  </div>

                  <h3 className="h-font mt-4 text-lg font-semibold">
                    {j.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {j.summary}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-[rgb(var(--ga-red))]">
                    View role →
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Section>

      <Section>
        <CTABox
          eyebrow="Don’t see your role?"
          title="Send us your profile anyway."
          subtitle="If you’re strong at design, frontend, marketing, or automation, we’ll consider you."
        />
      </Section>
    </main>
  );
}