// src/components/ui/Accordion.tsx
"use client";

import { useState } from "react";

export type AccordionItem = {
  title: string;
  content: string;
};

export function Accordion({
  items,
  defaultOpenIndex = 0,
}: {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white">
      {items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={item.title} className="border-b border-neutral-200 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open}
            >
              <span className="h-font text-base font-semibold text-neutral-900">
                {item.title}
              </span>
              <span
                className={`grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white transition ${
                  open ? "ring-yellow" : ""
                }`}
                aria-hidden="true"
              >
                <span className="text-lg leading-none">{open ? "−" : "+"}</span>
              </span>
            </button>

            {open ? (
              <div className="px-6 pb-6 text-sm leading-relaxed text-neutral-700">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}