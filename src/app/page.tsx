// src/app/page.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Timeline } from "@/components/ui/Timeline";
import { Accordion } from "@/components/ui/Accordion";
import { caseStudies } from "@/lib/caseStudies";

export default function HomePage() {
  const steps = [
    { title: "Discover", desc: "Understand your offer, audience, and goals." },
    { title: "Structure", desc: "Plan pages and sections that match how people decide." },
    { title: "Design", desc: "Premium UI with spacing, clarity, and subtle arcs." },
    { title: "Build", desc: "Next.js + Tailwind with performance-first components." },
  ];

  const faqs = [
    {
      title: "How fast can you ship a website?",
      content:
        "Most small sites ship in 1–3 weeks depending on pages and content readiness. Bigger builds take longer, but we keep the plan clear from day one.",
    },
    {
      title: "Do you also write copy and content?",
      content:
        "Yes. We can help with section copy, page structure, and conversion messaging. If you already have content, we’ll refine it for clarity and flow.",
    },
    {
      title: "Can you improve an existing website instead of rebuilding?",
      content:
        "Yes. If your foundation is okay, we can do a speed + UX cleanup, improve CTA flow, and fix sections that cause drop-offs.",
    },
    {
      title: "What do you need from me to start?",
      content:
        "Your offer, target audience, examples you like, and any existing branding assets. If you don’t have these, we’ll guide you through it.",
    },
  ];

  const featuredCaseStudies = caseStudies.slice(0, 3);

  return (
    <main className="bg-arc">
      {/* HERO */}
      <Container>
        <section className="py-16 md:py-20">
          <FadeIn>
            <div className="rounded-3xl border border-neutral-200 bg-white/80 p-10 backdrop-blur ring-yellow">
              <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700">
                <span className="dot-yellow" />
                Premium growth websites
              </p>

              <h1 className="h-font mt-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
                A premium website that looks clean and{" "}
                <span className="underline-yellow">converts better</span>.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-700">
                Built with Next.js + Tailwind for speed, clarity, and smooth micro-interactions.
                Perfect for lead gen, landing pages, and conversion improvements.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
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
                <Link
                  className="btn-base border border-neutral-300 bg-white text-neutral-900 hover:-translate-y-0.5"
                  href="/case-studies"
                >
                  See case studies
                </Link>
              </div>

              {/* Proof strip */}
              <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
                <p className="text-xs font-semibold text-neutral-500">
                  Proof (replace with real logos/testimonials later)
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { t: "Faster pages", d: "Better UX on mobile" },
                    { t: "Clearer CTAs", d: "Less friction to enquire" },
                    { t: "Cleaner design", d: "More trust, better flow" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="h-font text-sm font-semibold">{x.t}</p>
                      <p className="mt-1 text-sm text-neutral-700">{x.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </Container>

      {/* SERVICES SNAPSHOT */}
      <Container>
        <section className="pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="h-font text-2xl font-semibold">What we do</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
                Clean builds, conversion-first layouts, and performance improvements.
              </p>
            </div>
            <Link className="hidden sm:inline-flex btn-base btn-secondary" href="/services">
              View services
            </Link>
          </div>

          <Stagger>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { title: "Website Design + Build", desc: "Premium site with strong structure and fast performance." },
                { title: "Landing Pages", desc: "Campaign pages built to drive leads and demo bookings." },
                { title: "Speed + UX Cleanup", desc: "Fix clutter, improve flow, and ship quick upgrades." },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                    <h3 className="h-font text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </section>
      </Container>

      {/* CASE STUDIES PREVIEW */}
      <Container>
        <section className="pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="h-font text-2xl font-semibold">Recent results</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
                A few examples of what changes when structure and UX improve.
              </p>
            </div>
            <Link className="hidden sm:inline-flex btn-base btn-secondary" href="/case-studies">
              All case studies
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featuredCaseStudies.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <p className="text-xs font-semibold text-neutral-500">{c.industry}</p>
                <h3 className="h-font mt-2 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{c.summary}</p>
                <p className="mt-4 text-sm font-semibold text-[rgb(var(--ga-red))]">
                  View →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Container>

      {/* PROCESS PREVIEW */}
      <Container>
        <section className="pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="h-font text-2xl font-semibold">How we ship</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
                Clear steps. Clear outputs. No confusion.
              </p>
            </div>
            <Link className="hidden sm:inline-flex btn-base btn-secondary" href="/process">
              Full process
            </Link>
          </div>

          <div className="mt-6">
            <Timeline steps={steps} />
          </div>
        </section>
      </Container>

      {/* TOOLS CTA */}
      <Container>
        <section className="pb-16">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 ring-yellow">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="badge-yellow">
                  <span className="dot-yellow" />
                  Free tools
                </p>
                <h2 className="h-font mt-3 text-2xl font-semibold">
                  Want a quick answer before you book a call?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                  Use our free calculators to estimate ROI and spot landing page issues.
                </p>
              </div>
              <Link className="btn-base btn-primary" href="/tools">
                Explore tools
              </Link>
            </div>
          </div>
        </section>
      </Container>

      {/* FAQ */}
      <Container>
        <section className="pb-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="h-font text-2xl font-semibold">FAQs</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
                Quick answers before you reach out.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Accordion items={faqs} defaultOpenIndex={0} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="btn-base btn-primary" href="/contact">
              Book a call
            </Link>
            <a className="btn-base btn-primary" href="https://wa.me/" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}