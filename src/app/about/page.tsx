// src/app/about/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card } from "@/components/sections/Cards";
import { Timeline } from "@/components/ui/Timeline";
import { Accordion } from "@/components/ui/Accordion";
import { CTABox } from "@/components/sections/CTABox";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "We make digital solutions that drive real growth. GrowthAlis combines technology, marketing, and automation to help businesses scale confidently.",
};

export default function AboutPage() {
  const steps = [
    { title: "Understand", desc: "We get clear on the offer, audience, and goal." },
    { title: "Design", desc: "Premium UI with strong hierarchy and spacing." },
    { title: "Build", desc: "Fast Next.js build with clean components and SEO basics." },
    { title: "Improve", desc: "Refine CTAs, proof placement, and friction points." },
  ];

  const faqs = [
    {
      title: "What does GrowthAlis actually do?",
      content:
        "We build premium websites, landing pages, and growth systems. The goal is simple: better clarity, better UX, and better conversions.",
    },
    {
      title: "Do you handle marketing too?",
      content:
        "Yes, when needed. We can support funnels and landing pages for campaigns, and set up clean lead capture flows.",
    },
    {
      title: "Do you do automation?",
      content:
        "Yes. We build smart forms and simple automations that reduce manual follow-up and improve lead quality.",
    },
    {
      title: "What kind of clients do you work with?",
      content:
        "Local businesses, B2B services, and SaaS teams that want a clean premium site and a better lead flow.",
    },
  ];

  return (
    <main>
      <PageHeader
        eyebrow="About Us"
        title="We make digital solutions that drive real growth."
        subtitle="We combine technology, marketing, and automation to help businesses improve processes, increase revenue, and scale confidently."
      >
        <div className="flex flex-wrap gap-3">
          <Link className="btn-base btn-primary" href="/contact">
            Book a call
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
        title="What we focus on"
        subtitle="A clean website is not the goal. A better decision flow is."
      >
        <Stagger>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Technology",
                desc: "Fast builds (Next.js + Tailwind), clean components, performance-first structure.",
              },
              {
                title: "Marketing",
                desc: "Clear messaging, proof placement, and CTA flow that reduces drop-offs.",
              },
              {
                title: "Automation",
                desc: "Smart forms and lead handling so enquiries don’t get lost.",
              },
            ].map((x) => (
              <StaggerItem key={x.title}>
                <Card title={x.title} desc={x.desc} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Section>

      <Section
        title="What you get"
        subtitle="Simple outcomes that matter to most businesses."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="badge-yellow">
              <span className="dot-yellow" />
              Clarity
            </p>
            <h3 className="h-font mt-3 text-lg font-semibold">
              Visitors understand you faster
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              Strong hierarchy and clean sections that guide decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="badge-yellow">
              <span className="dot-yellow" />
              Trust
            </p>
            <h3 className="h-font mt-3 text-lg font-semibold">
              Proof at the right time
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              Better placement of testimonials, results, and credibility signals.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="badge-yellow">
              <span className="dot-yellow" />
              Action
            </p>
            <h3 className="h-font mt-3 text-lg font-semibold">
              More enquiries with less friction
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              Clean CTAs, short step forms, and conversion-first flows.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="How we work"
        subtitle="Short, clear, and predictable."
      >
        <FadeIn>
          <Timeline steps={steps} />
        </FadeIn>
      </Section>

      <Section title="FAQs">
        <FadeIn>
          <Accordion items={faqs} defaultOpenIndex={0} />
        </FadeIn>
      </Section>

      <Section>
        <CTABox
          eyebrow="Next step"
          title="Want to build something premium and conversion-ready?"
          subtitle="Book a quick call. We’ll suggest the best structure based on your goal and timeline."
        />
      </Section>
    </main>
  );
}