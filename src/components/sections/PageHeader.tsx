// src/components/sections/PageHeader.tsx
import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-arc">
      <Container>
        <div className="py-12 md:py-16">
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700">
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--ga-red))]" />
              {eyebrow}
            </p>
          ) : null}

          <h1 className="h-font mt-5 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              {subtitle}
            </p>
          ) : null}

          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}