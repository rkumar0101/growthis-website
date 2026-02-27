// src/components/sections/LegalLayout.tsx
import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABox } from "@/components/sections/CTABox";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function LegalLayout({
  eyebrow = "Legal",
  title,
  subtitle,
  updatedAt,
  sections,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: LegalSection[];
}) {
  return (
    <main>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* TOC */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                <p className="text-xs font-semibold text-neutral-500">
                  Last updated: <span className="text-neutral-900">{updatedAt}</span>
                </p>

                <p className="mt-4 text-sm font-semibold text-neutral-900">
                  On this page
                </p>

                <nav className="mt-3 space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-800 transition hover:-translate-y-0.5"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-5 text-sm">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[rgb(var(--ga-red))] px-4 py-3 font-semibold text-white"
                  >
                    Contact for questions
                  </Link>
                </div>
              </div>

              {/* Mobile quick links */}
              <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-800"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-8">
              <div className="rounded-3xl border border-neutral-200 bg-white p-8">
                {sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="h-font text-xl font-semibold text-neutral-900">
                      {s.title}
                    </h2>
                    <div className="mt-3 text-sm leading-relaxed text-neutral-700">
                      {s.content}
                    </div>
                    <div className="my-8 border-t border-neutral-200" />
                  </section>
                ))}
              </div>

              <CTABox
                eyebrow="Need clarification?"
                title="If you have questions, ask us directly."
                subtitle="We’ll reply quickly and keep it simple."
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}