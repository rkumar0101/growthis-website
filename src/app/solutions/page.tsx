// src/app/solutions/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card } from "@/components/sections/Cards";
import { Accordion } from "@/components/ui/Accordion";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { CTABox } from "@/components/sections/CTABox";
import { caseStudies } from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Solutions by GrowthAlis: lead generation websites, landing page systems, performance upgrades, and conversion improvements.",
};

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Lead Generation Website",
      desc: "Best if you want more enquiries, calls, and WhatsApp leads.",
      points: [
        "Clear hero + primary CTA",
        "Short step form for higher completion",
        "Proof blocks placed near decision points",
      ],
    },
    {
      title: "B2B SaaS Landing System",
      desc: "Best if you sell demos, trials, or consultations.",
      points: [
        "Outcome-first messaging",
        "Feature → benefit → proof structure",
        "Clean sections that guide decisions",
      ],
    },
    {
      title: "Local Business Growth Site",
      desc: "Best if most traffic comes from mobile and local intent.",
      points: [
        "Fast mobile experience",
        "Sticky CTAs (call/WhatsApp)",
        "Trust sections: reviews, FAQs, proof",
      ],
    },
    {
      title: "Speed + UX Refresh",
      desc: "Best if your site is slow or feels cluttered.",
      points: [
        "Performance fixes + stable layout",
        "Cleaner UI and stronger hierarchy",
        "CTA clarity + friction reduction",
      ],
    },
    {
      title: "Campaign Launch Pages",
      desc: "Best for ads and offers with a short conversion path.",
      points: [
        "One primary CTA",
        "Fast load, minimal distractions",
        "Tracking-ready structure",
      ],
    },
    {
      title: "Careers + Hiring Pages",
      desc: "Best if you want a modern, premium hiring presence.",
      points: [
        "Clean role pages + apply flow",
        "Simple structure for trust",
        "Better candidate experience",
      ],
    },
  ];

  const howToChoose = [
    {
      title: "Pick the outcome",
      content:
        "More leads? More demos? Faster site? The outcome decides the page structure and CTAs.",
    },
    {
      title: "Pick the funnel",
      content:
        "Website for overall trust + navigation, or landing page for one focused conversion action.",
    },
    {
      title: "Pick the timeline",
      content:
        "If you need speed, we start with a small set of pages and expand after launch.",
    },
    {
      title: "Then we optimize",
      content:
        "Once the foundation is clean, we refine CTAs, proof placement, and friction points.",
    },
  ];

  const featured = caseStudies.slice(0, 2);

  return (
    <main>
      <PageHeader
        eyebrow="Solutions"
        title="Solutions built around outcomes, not buzzwords."
        subtitle="Choose a solution based on your goal. We’ll structure pages to move users to action."
      >
        <div className="flex flex-wrap gap-3">
          <Link className="btn-base btn-primary" href="/contact">
            Book a call
          </Link>
          <Link className="btn-base btn-secondary" href="/tools">
            Try free tools
          </Link>
        </div>
      </PageHeader>

      <Section
        title="Choose what you need"
        subtitle="Each solution is a proven structure. We tailor the content and sections to your offer."
      >
        <Stagger>
          <div className="grid gap-4 md:grid-cols-3">
            {solutions.map((s) => (
              <StaggerItem key={s.title}>
                <Card title={s.title} desc={s.desc}>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Section>

      <Section
        title="How to pick the right solution"
        subtitle="If you’re unsure, this is the fastest way to decide."
      >
        <FadeIn>
          <Accordion items={howToChoose} defaultOpenIndex={0} />
        </FadeIn>
      </Section>

      <Section
        title="Examples"
        subtitle="A couple of quick examples from our case studies."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <p className="text-xs font-semibold text-neutral-500">
                {c.industry}
              </p>
              <h3 className="h-font mt-2 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                {c.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {c.services.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm font-semibold text-[rgb(var(--ga-red))]">
                View case study →
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <CTABox
          eyebrow="Best next step"
          title="Not sure which solution fits?"
          subtitle="Book a quick call and we’ll recommend the right structure based on your goal and timeline."
        />
      </Section>
    </main>
  );
}