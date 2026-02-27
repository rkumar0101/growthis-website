// src/app/contact/page.tsx
import { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { ContactStepForm } from "@/components/sections/ContactStepForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GrowthAlis to discuss your website, landing page, or growth project.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you’re building. We’ll reply with a clear next step."
        subtitle="Short form. Clean questions. Built to reduce drop-offs."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <ContactStepForm />
          <div className="rounded-3xl border border-neutral-200 bg-white p-8">
            <p className="badge-yellow">
              <span className="dot-yellow" />
              Fast response
            </p>

            <h2 className="h-font mt-4 text-2xl font-semibold">
              Prefer WhatsApp?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              If you already know what you need, message us directly and we’ll
              reply quickly.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn-base btn-primary"
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
              <a className="btn-base btn-secondary" href="mailto:hello@growthis.in">
                Email
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
              <p className="font-semibold text-neutral-900">What you’ll get</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>A simple plan (no long docs)</li>
                <li>Clear timeline + deliverables</li>
                <li>Pricing range based on scope</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}