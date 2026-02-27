// src/app/case-studies/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case Study" };
  return {
    title: cs.title,
    description: cs.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) {
    return (
      <main>
        <PageHeader
          eyebrow="Case Studies"
          title="Case study not found"
          subtitle="The link may be wrong or the case study doesn’t exist yet."
        >
          <Link className="btn-base btn-primary" href="/case-studies">
            Back to case studies
          </Link>
        </PageHeader>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        eyebrow={`Case Study • ${cs.industry}`}
        title={cs.title}
        subtitle={cs.summary}
      >
        <div className="flex flex-wrap gap-3">
          <Link className="btn-base btn-primary" href="/contact">
            Book a call
          </Link>
          <Link className="btn-base btn-secondary" href="/case-studies">
            All case studies
          </Link>
        </div>
      </PageHeader>

      <Section title="Results">
        <div className="grid gap-4 md:grid-cols-3">
          {cs.results.map((r) => (
            <div
              key={r.label}
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <p className="text-xs font-semibold text-neutral-500">{r.label}</p>
              <p className="h-font mt-2 text-2xl font-semibold">{r.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Before vs After"
        subtitle="Drag the handle to compare the old vs new experience."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <BeforeAfterSlider
            beforeLabel="Before"
            afterLabel="After"
            before={
              <div className="grid h-full place-items-center p-10">
                <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6">
                  <p className="text-xs font-semibold text-neutral-500">
                    Old experience
                  </p>
                  <h3 className="h-font mt-2 text-lg font-semibold">
                    Too busy, weak hierarchy
                  </h3>
                  <p className="mt-2 text-sm text-neutral-700">
                    Multiple competing buttons, less clarity, less trust near the
                    CTA.
                  </p>
                </div>
              </div>
            }
            after={
              <div className="grid h-full place-items-center p-10">
                <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 ring-yellow">
                  <p className="text-xs font-semibold text-neutral-500">
                    New experience
                  </p>
                  <h3 className="h-font mt-2 text-lg font-semibold">
                    Clear flow + proof near CTA
                  </h3>
                  <p className="mt-2 text-sm text-neutral-700">
                    One primary CTA, stronger message, and cleaner sections.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="badge-yellow">
                      <span className="dot-yellow" />
                      faster
                    </span>
                    <span className="badge-yellow">
                      <span className="dot-yellow" />
                      clearer
                    </span>
                  </div>
                </div>
              </div>
            }
          />

          <div className="grid gap-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="h-font text-lg font-semibold">Before</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                {cs.before.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="h-font text-lg font-semibold">After</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                {cs.after.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}