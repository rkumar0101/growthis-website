// src/components/sections/CaseStudiesList.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { CTABox } from "@/components/sections/CTABox";

export function CaseStudiesList({ items }: { items: CaseStudy[] }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>("All");
  const [service, setService] = useState<string>("All");

  const industries = useMemo(() => {
    const set = new Set(items.map((x) => x.industry));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const services = useMemo(() => {
    const set = new Set(items.flatMap((x) => x.services));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((c) => {
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.services.some((s) => s.toLowerCase().includes(q));

      const matchIndustry = industry === "All" || c.industry === industry;
      const matchService = service === "All" || c.services.includes(service);

      return matchQuery && matchIndustry && matchService;
    });
  }, [items, query, industry, service]);

  function clearFilters() {
    setQuery("");
    setIndustry("All");
    setService("All");
  }

  return (
    <div className="space-y-10">
      {/* Filters */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="badge-yellow">
              <span className="dot-yellow" />
              Browse work
            </p>
            <h2 className="h-font mt-3 text-2xl font-semibold">
              Find a case study similar to your goal
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Filter by industry and service, or search by keyword.
            </p>
          </div>

          <div className="text-sm font-semibold text-neutral-700">
            Showing{" "}
            <span className="text-neutral-900">{filtered.length}</span> of{" "}
            <span className="text-neutral-900">{items.length}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-neutral-900">
              Search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. leads, landing page, speed…"
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-neutral-900">
              Industry
            </span>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
            >
              {industries.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-neutral-900">
              Service
            </span>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={clearFilters}
            className="btn-base btn-secondary"
          >
            Clear filters
          </button>

          <span className="text-xs text-neutral-500">
            Tip: keep filters broad, then open 2–3 studies to compare.
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-10">
          <h3 className="h-font text-xl font-semibold">No matches found</h3>
          <p className="mt-2 text-sm text-neutral-700">
            Try clearing filters or using a simpler keyword.
          </p>
          <div className="mt-6">
            <button onClick={clearFilters} className="btn-base btn-primary">
              Reset
            </button>
          </div>
        </div>
      ) : (
        <Stagger>
          <div className="grid gap-4 md:grid-cols-3">
            {filtered.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="group block rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-neutral-500">
                      {c.industry}
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
                      <span className="dot-yellow" />
                      case study
                    </span>
                  </div>

                  <h3 className="h-font mt-3 text-lg font-semibold">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {c.summary}
                  </p>

                  {/* Results */}
                  <div className="mt-5 grid gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    {c.results.slice(0, 3).map((r) => (
                      <div
                        key={r.label}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-neutral-700">{r.label}</span>
                        <span className="h-font font-semibold text-neutral-900">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.services.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-sm font-semibold text-[rgb(var(--ga-red))]">
                    View details →
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      )}

      {/* CTA */}
      <CTABox
        eyebrow="Want similar results?"
        title="Let’s improve your website’s conversions and flow."
        subtitle="Book a quick call. We’ll suggest the right approach based on your goal and timeline."
      />
    </div>
  );
}