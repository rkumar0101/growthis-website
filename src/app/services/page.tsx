// src/app/services/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card } from "@/components/sections/Cards";
import { Accordion } from "@/components/ui/Accordion";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { CTABox } from "@/components/sections/CTABox";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Services by GrowthAlis: premium websites, landing pages, performance fixes, and conversion upgrades.",
};

export default function ServicesPage() {
  const serviceDetails = [
    {
      title: "Website Design + Build",
      content:
        "Best for: lead generation and credibility. Includes page structure, UI design, responsive build, basic SEO setup, and a clean handover. Goal: a site that looks premium and pushes users to enquire.",
    },
    {
      title: "Landing Pages (Campaign-ready)",
      content:
        "Best for: ads, offers, and product launches. Includes message + section structure, conversion-first layout, fast build, and a short lead capture flow. Goal: fewer distractions, more signups/calls.",
    },
    {
      title: "Speed + UX Cleanup",
      content:
        "Best for: sites that are ‘almost good’ but feel slow or messy. Includes performance fixes, layout polish, CTA clarity, and section cleanup. Goal: faster pages, cleaner flow, better conversions.",
    },
    {
      title: "Automation + Forms",
      content:
        "Best for: reducing drop-offs and manual work. Includes multi-step forms, lead routing logic, and clean submission handling (API). Goal: better lead quality and smoother follow-up.",
    },
  ];

  const faqs = [
    {
      title: "Do you work with existing branding?",
      content:
        "Yes. If you have a logo/colors/typography, we’ll apply it cleanly. If not, we’ll keep it minimal and premium and can refine branding later.",
    },
    {
      title: "Will the site be fast and SEO-ready?",
      content:
        "Yes. We build with performance in mind and ship SEO basics like metadata, sitemap, clean structure, and mobile-first layouts.",
    },
    {
      title: "Can you just fix my current site?",
      content:
        "Yes. If the foundation is okay, a speed + UX cleanup is often the fastest win. If the structure is broken, we’ll recommend a rebuild.",
    },
    {
      title: "What do you need from me?",
      content:
        "Your offer, your target audience, examples you like, and any existing content. If you don’t have content yet, we’ll help shape the sections.",
    },
  ];

  return (
    <main>
      <PageHeader
        eyebrow="Services"
        title="Clear services. Clean deliverables. Built to convert."
        subtitle="Pick a service or combine them into a complete growth website build."
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
        title="Core services"
        subtitle="These are the most common ways we help clients improve leads and conversions."
      >
        <Stagger>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Website Design + Build",
                desc: "Premium UI, strong structure, fast performance.",
              },
              {
                title: "Landing Pages",
                desc: "Campaign-ready pages built for signups and enquiries.",
              },
              {
                title: "Speed + UX Cleanup",
                desc: "Fix friction, improve flow, and polish key pages.",
              },
              {
                title: "Automation + Forms",
                desc: "Multi-step forms + lead capture that reduces drop-offs.",
              },
              {
                title: "SEO Basics",
                desc: "Metadata, sitemap, internal structure, clean headings.",
              },
              {
                title: "CRO Improvements",
                desc: "Better CTAs, proof placement, and decision flow.",
              },
            ].map((s) => (
              <StaggerItem key={s.title}>
                <Card title={s.title} desc={s.desc} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Section>

      <Section
        title="What’s included"
        subtitle="Expandable details so the scope stays clear."
      >
        <FadeIn>
          <Accordion items={serviceDetails} defaultOpenIndex={0} />
        </FadeIn>
      </Section>

      <Section
        title="Engagement options"
        subtitle="Simple packages you can choose from. We’ll confirm scope on a call."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="badge-yellow">
              <span className="dot-yellow" />
              Popular
            </p>
            <h3 className="h-font mt-3 text-lg font-semibold">
              Full Website Build
            </h3>
            <p className="mt-2 text-sm text-neutral-700">
              Best if you want a complete premium website with core pages.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              <li>Structure + page layout</li>
              <li>UI design + build</li>
              <li>Basic SEO + performance</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="h-font text-lg font-semibold">Landing Page Sprint</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Best for ads and offers. Clear CTA flow and fast load.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              <li>Message + sections</li>
              <li>Conversion-first layout</li>
              <li>Lead capture setup</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="h-font text-lg font-semibold">Speed + UX Cleanup</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Best if your site is slow or feels messy but you don’t need a rebuild.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              <li>Performance fixes</li>
              <li>CTA + section cleanup</li>
              <li>Mobile polish</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="FAQs">
        <FadeIn>
          <Accordion items={faqs} defaultOpenIndex={0} />
        </FadeIn>
      </Section>

      <Section>
        <CTABox
          title="Want the fastest path to a premium site that converts?"
          subtitle="Book a quick call. We’ll suggest the best approach based on your goal, timeline, and budget."
        />
      </Section>
    </main>
  );
}