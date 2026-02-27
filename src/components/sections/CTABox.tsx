// src/components/sections/CTABox.tsx
import Link from "next/link";

export function CTABox({
  eyebrow = "Ready to move?",
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 ring-yellow">
      <p className="badge-yellow">
        <span className="dot-yellow" />
        {eyebrow}
      </p>

      <h3 className="h-font mt-3 text-2xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
        {subtitle}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
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
        <Link className="btn-base btn-secondary" href="/case-studies">
          See case studies
        </Link>
      </div>
    </div>
  );
}