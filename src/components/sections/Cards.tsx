// src/components/sections/Cards.tsx
import { ReactNode } from "react";

export function Card({
  title,
  desc,
  icon,
  children,
}: {
  title: string;
  desc?: string;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="mt-0.5 rounded-xl bg-[rgba(var(--ga-yellow),0.25)] p-2">
            {icon}
          </div>
        ) : null}
        <div>
          <h3 className="h-font text-lg font-semibold">{title}</h3>
          {desc ? (
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {desc}
            </p>
          ) : null}
        </div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}