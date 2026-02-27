// src/components/sections/Section.tsx
import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function Section({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-12">
      <Container>
        {title ? (
          <div className="mb-6">
            <h2 className="h-font text-2xl font-semibold">{title}</h2>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}