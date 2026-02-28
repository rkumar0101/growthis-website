"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SERVICE_CATEGORIES,
  SERVICES,
  type Service,
  type ServiceCategory,
} from "@/lib/servicesData";
import {
  OUTCOMES,
  SOLUTIONS,
  type Outcome,
  type Solution,
} from "@/lib/solutionsData";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Mode = "services" | "solutions";

function contains(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function firstOrNull<T>(arr: T[]) {
  return arr.length ? arr[0] : null;
}

export default function MegaMenu({ open, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("services");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(
    SERVICE_CATEGORIES[0] ?? "Website"
  );
  const [activeOutcome, setActiveOutcome] = useState<Outcome>(
    OUTCOMES[0] ?? "More leads"
  );

  // Preview selection
  const [previewServiceId, setPreviewServiceId] = useState<string | null>(null);
  const [previewSolutionId, setPreviewSolutionId] = useState<string | null>(null);

  // Reset when opening
  useEffect(() => {
    if (!open) return;

    setQuery("");
    setMode("services");

    const cat = SERVICE_CATEGORIES[0] ?? "Website";
    setActiveCategory(cat);

    const firstService = SERVICES.find((s) => s.category === cat) ?? SERVICES[0];
    setPreviewServiceId(firstService?.id ?? null);

    const firstOutcome = OUTCOMES[0] ?? "More leads";
    setActiveOutcome(firstOutcome);

    const firstSol =
      SOLUTIONS.find((s) => s.outcomeTags.includes(firstOutcome)) ?? SOLUTIONS[0];
    setPreviewSolutionId(firstSol?.id ?? null);
  }, [open]);

  const servicesInCat = useMemo(() => {
    const list = SERVICES.filter((s) => s.category === activeCategory);
    if (!query.trim()) return list;
    return list.filter(
      (s) =>
        contains(s.title, query) ||
        contains(s.summary, query) ||
        s.tools.some((t) => contains(t, query))
    );
  }, [activeCategory, query]);

  const solutionsInOutcome = useMemo(() => {
    const list = SOLUTIONS.filter((s) => s.outcomeTags.includes(activeOutcome));
    if (!query.trim()) return list;
    return list.filter(
      (s) =>
        contains(s.title, query) ||
        contains(s.summary, query) ||
        s.outcomeTags.some((t) => contains(t, query))
    );
  }, [activeOutcome, query]);

  const previewService: Service | null = useMemo(() => {
    const byId = previewServiceId
      ? SERVICES.find((s) => s.id === previewServiceId)
      : null;
    return byId ?? firstOrNull(servicesInCat);
  }, [previewServiceId, servicesInCat]);

  const previewSolution: Solution | null = useMemo(() => {
    const byId = previewSolutionId
      ? SOLUTIONS.find((s) => s.id === previewSolutionId)
      : null;
    return byId ?? firstOrNull(solutionsInOutcome);
  }, [previewSolutionId, solutionsInOutcome]);

  // If user switches mode, pick a valid preview item
  useEffect(() => {
    if (!open) return;

    if (mode === "services") {
      const firstService = servicesInCat[0] ?? SERVICES[0];
      setPreviewServiceId(firstService?.id ?? null);
    } else {
      const firstSol = solutionsInOutcome[0] ?? SOLUTIONS[0];
      setPreviewSolutionId(firstSol?.id ?? null);
    }
  }, [mode]); // intentionally not depending on lists to avoid jitter while typing

  if (!open) return null;

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Click-outside overlay */}
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-[49] cursor-default bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="absolute left-0 right-0 top-full z-[50]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
          >
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.14)]">
                {/* Top bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[rgb(var(--ga-red))]" />
                    <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                      Explore
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Mode toggle */}
                    <div className="inline-flex rounded-full border border-black/10 bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setMode("services")}
                        className={[
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                          mode === "services"
                            ? "bg-[rgb(var(--ga-yellow))]/25 text-black"
                            : "text-black/70 hover:bg-black/[0.04]",
                        ].join(" ")}
                      >
                        Services
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("solutions")}
                        className={[
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                          mode === "solutions"
                            ? "bg-[rgb(var(--ga-yellow))]/25 text-black"
                            : "text-black/70 hover:bg-black/[0.04]",
                        ].join(" ")}
                      >
                        Solutions
                      </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={
                          mode === "services"
                            ? "Search services…"
                            : "Search solutions…"
                        }
                        className="w-[260px] rounded-full border border-black/10 bg-white px-4 py-2 text-sm outline-none focus:border-[rgb(var(--ga-red))]/50"
                      />
                      {query ? (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs text-black/60 hover:bg-black/[0.04]"
                          aria-label="Clear search"
                        >
                          ×
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="grid gap-0 md:grid-cols-[1.05fr_1.15fr_1.05fr]">
                  {/* Left column: filters */}
                  <div className="border-b border-black/10 p-5 md:border-b-0 md:border-r md:border-black/10">
                    {mode === "services" ? (
                      <>
                        <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                          Categories
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {SERVICE_CATEGORIES.map((cat) => {
                            const active = cat === activeCategory;
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  setActiveCategory(cat);
                                  const first =
                                    SERVICES.find((s) => s.category === cat) ??
                                    SERVICES[0];
                                  setPreviewServiceId(first?.id ?? null);
                                }}
                                className={[
                                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                                  active
                                    ? "border-[rgb(var(--ga-red))]/25 bg-[rgb(var(--ga-red))]/[0.06] text-[rgb(var(--ga-black))]"
                                    : "border-black/10 text-black/70 hover:bg-black/[0.04]",
                                ].join(" ")}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-5 rounded-xl border border-black/10 bg-black/[0.02] p-4">
                          <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                            Not sure?
                          </div>
                          <div className="mt-1 text-sm text-black/65">
                            Use the recommender to pick the fastest path.
                          </div>
                          <Link
                            href="/tools/outcome-recommender"
                            onClick={onClose}
                            className="mt-3 inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-3 py-2 text-sm font-semibold text-white hover:opacity-95"
                          >
                            Find my best path →
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                          Outcomes
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {OUTCOMES.map((o) => {
                            const active = o === activeOutcome;
                            return (
                              <button
                                key={o}
                                type="button"
                                onClick={() => {
                                  setActiveOutcome(o);
                                  const first =
                                    SOLUTIONS.find((s) =>
                                      s.outcomeTags.includes(o)
                                    ) ?? SOLUTIONS[0];
                                  setPreviewSolutionId(first?.id ?? null);
                                }}
                                className={[
                                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                                  active
                                    ? "border-[rgb(var(--ga-red))]/25 bg-[rgb(var(--ga-red))]/[0.06] text-[rgb(var(--ga-black))]"
                                    : "border-black/10 text-black/70 hover:bg-black/[0.04]",
                                ].join(" ")}
                              >
                                {o}
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-5 rounded-xl border border-black/10 bg-black/[0.02] p-4">
                          <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                            Want a plan?
                          </div>
                          <div className="mt-1 text-sm text-black/65">
                            Generate a quick brief and we’ll refine it on call.
                          </div>
                          <Link
                            href="/tools/brief-builder"
                            onClick={onClose}
                            className="mt-3 inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-black/[0.04]"
                          >
                            Build a project brief →
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Middle column: list */}
                  <div className="border-b border-black/10 p-5 md:border-b-0 md:border-r md:border-black/10">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        {mode === "services" ? "Services" : "Solutions"}
                      </div>
                      <Link
                        href={mode === "services" ? "/services" : "/solutions"}
                        onClick={onClose}
                        className="text-xs font-semibold text-black/60 hover:text-black/80"
                      >
                        View all →
                      </Link>
                    </div>

                    <div className="mt-3 space-y-2">
                      {mode === "services"
                        ? servicesInCat.map((s) => {
                            const active = s.id === previewService?.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onMouseEnter={() => setPreviewServiceId(s.id)}
                                onFocus={() => setPreviewServiceId(s.id)}
                                onClick={() => {
                                  onClose();
                                  window.location.href = "/services";
                                }}
                                className={[
                                  "w-full rounded-xl border p-3 text-left transition",
                                  active
                                    ? "border-[rgb(var(--ga-red))]/30 bg-[rgb(var(--ga-red))]/[0.04]"
                                    : "border-black/10 hover:bg-black/[0.03]",
                                ].join(" ")}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                                      {s.title}
                                    </div>
                                    <div className="mt-1 line-clamp-1 text-xs text-black/60">
                                      {s.summary}
                                    </div>
                                  </div>
                                  <span className="shrink-0 self-start whitespace-nowrap max-w-[180px] truncate rounded-full bg-[rgb(var(--ga-yellow))]/15 px-2.5 py-1 text-[11px] font-semibold text-black/70">
                                    {s.timeline}
                                  </span>
                                </div>
                              </button>
                            );
                          })
                        : solutionsInOutcome.map((s) => {
                            const active = s.id === previewSolution?.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onMouseEnter={() => setPreviewSolutionId(s.id)}
                                onFocus={() => setPreviewSolutionId(s.id)}
                                onClick={() => {
                                  onClose();
                                  window.location.href = "/solutions";
                                }}
                                className={[
                                  "w-full rounded-xl border p-3 text-left transition",
                                  active
                                    ? "border-[rgb(var(--ga-red))]/30 bg-[rgb(var(--ga-red))]/[0.04]"
                                    : "border-black/10 hover:bg-black/[0.03]",
                                ].join(" ")}
                              >
                                <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                                  {s.title}
                                </div>
                                <div className="mt-1 line-clamp-1 text-xs text-black/60">
                                  {s.summary}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {s.outcomeTags.slice(0, 2).map((t) => (
                                    <span
                                      key={t}
                                      className="rounded-full bg-[rgb(var(--ga-yellow))]/15 px-2.5 py-1 text-[11px] font-semibold text-black/70"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </button>
                            );
                          })}

                      {mode === "services" && servicesInCat.length === 0 ? (
                        <div className="rounded-xl border border-black/10 p-3 text-sm text-black/70">
                          No matches. Try a different keyword.
                        </div>
                      ) : null}

                      {mode === "solutions" && solutionsInOutcome.length === 0 ? (
                        <div className="rounded-xl border border-black/10 p-3 text-sm text-black/70">
                          No matches. Try a different keyword.
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Right column: preview */}
                  <div className="p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                      Preview
                    </div>

                    {mode === "services" ? (
                      !previewService ? (
                        <div className="mt-3 text-sm text-black/60">
                          Select a service to preview.
                        </div>
                      ) : (
                        <div className="mt-3 rounded-2xl border border-black/10 bg-white p-4">
                          <div className="text-base font-semibold text-[rgb(var(--ga-black))]">
                            {previewService.title}
                          </div>
                          <div className="mt-2 text-sm text-black/70">
                            {previewService.summary}
                          </div>

                          <div className="mt-4 text-sm font-semibold text-black/70">
                            What you get
                          </div>
                          <ul className="mt-2 space-y-2">
                            {previewService.deliverables.slice(0, 4).map((d) => (
                              <li key={d} className="flex gap-2 text-sm text-black/75">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--ga-yellow))]" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {previewService.tools.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-black/10 px-3 py-1 text-[11px] text-black/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link
                              href="/services"
                              onClick={onClose}
                              className="inline-flex items-center justify-center rounded-md border border-black/10 px-3 py-2 text-sm font-semibold hover:bg-black/[0.04]"
                            >
                              View details →
                            </Link>
                            <Link
                              href="/contact"
                              onClick={onClose}
                              className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-3 py-2 text-sm font-semibold text-white hover:opacity-95"
                            >
                              Book a call →
                            </Link>
                          </div>
                        </div>
                      )
                    ) : !previewSolution ? (
                      <div className="mt-3 text-sm text-black/60">
                        Select a solution to preview.
                      </div>
                    ) : (
                      <div className="mt-3 rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-base font-semibold text-[rgb(var(--ga-black))]">
                          {previewSolution.title}
                        </div>
                        <div className="mt-2 text-sm text-black/70">
                          {previewSolution.summary}
                        </div>

                        <div className="mt-4 text-sm font-semibold text-black/70">
                          Best for
                        </div>
                        <ul className="mt-2 space-y-2">
                          {previewSolution.whoFor.slice(0, 3).map((w) => (
                            <li key={w} className="flex gap-2 text-sm text-black/75">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--ga-yellow))]" />
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 text-sm font-semibold text-black/70">
                          First steps
                        </div>
                        <ul className="mt-2 space-y-2">
                          {previewSolution.blueprint[0]?.details
                            ?.slice(0, 3)
                            .map((d) => (
                              <li key={d} className="flex gap-2 text-sm text-black/75">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--ga-yellow))]" />
                                <span>{d}</span>
                              </li>
                            ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            href="/solutions"
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-md border border-black/10 px-3 py-2 text-sm font-semibold hover:bg-black/[0.04]"
                          >
                            View blueprint →
                          </Link>
                          <Link
                            href={previewSolution.primaryCta.href}
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-3 py-2 text-sm font-semibold text-white hover:opacity-95"
                          >
                            {previewSolution.primaryCta.label} →
                          </Link>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 text-xs text-black/60">
                      Tip: Use search to jump fast. Hover items to preview.
                    </div>
                  </div>
                </div>

                {/* Footer row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/10 px-5 py-3">
                  <div className="text-xs text-black/60">
                    Press Esc to close. Click outside closes too.
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-semibold hover:bg-black/[0.04]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}