"use client";

import { useMemo, useState } from "react";
import {
  SERVICES,
  SERVICE_CATEGORIES,
  type Service,
  type ServiceCategory,
} from "@/lib/servicesData";

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

const ADD_ONS = [
  { id: "copy", label: "Copy polish (key pages)", min: 6000, max: 18000 },
  { id: "seo", label: "SEO foundations", min: 8000, max: 25000 },
  { id: "automation", label: "Lead routing automation", min: 7000, max: 30000 },
  { id: "analytics", label: "Analytics setup", min: 3000, max: 12000 },
] as const;

export default function ServicesExplorer() {
  const initialCat: ServiceCategory = SERVICE_CATEGORIES[0] ?? "Website";
  const initialServiceId =
    SERVICES.find((s) => s.category === initialCat)?.id ?? SERVICES[0]?.id ?? "";

  const [activeCat, setActiveCat] = useState<ServiceCategory>(initialCat);
  const [activeServiceId, setActiveServiceId] = useState<string>(initialServiceId);
  const [addons, setAddons] = useState<Record<string, boolean>>({});

  const servicesInCat = useMemo(() => {
    return SERVICES.filter((s) => s.category === activeCat);
  }, [activeCat]);

  const activeService = useMemo<Service | null>(() => {
    const byId = SERVICES.find((s) => s.id === activeServiceId);
    if (byId) return byId;
    return servicesInCat[0] ?? null;
  }, [activeServiceId, servicesInCat]);

  const estimate = useMemo(() => {
    if (!activeService) return { min: 0, max: 0 };
    let min = activeService.baseRange.min;
    let max = activeService.baseRange.max;

    for (const a of ADD_ONS) {
      if (addons[a.id]) {
        min += a.min;
        max += a.max;
      }
    }
    return { min, max };
  }, [activeService, addons]);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="mb-6">
        <div className="text-sm font-semibold text-black/60">Services</div>
        <h1 className="mt-2 text-3xl font-semibold text-[rgb(var(--ga-black))] md:text-4xl">
          Pick what you need. See what you get.
        </h1>
        <p className="mt-3 max-w-2xl text-black/70">
          Filter services, review deliverables, and build a rough estimate range.
          Final pricing depends on scope and timelines.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {SERVICE_CATEGORIES.map((cat) => {
          const isActive = cat === activeCat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCat(cat);
                const first = SERVICES.find((s) => s.category === cat);
                if (first) setActiveServiceId(first.id);
              }}
              className={[
                "rounded-full border px-4 py-2 text-sm transition",
                isActive
                  ? "border-[rgb(var(--ga-red))] bg-[rgb(var(--ga-red))] text-white"
                  : "border-black/10 bg-white text-black/80 hover:bg-black/[0.04]",
              ].join(" ")}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        {/* Left: service cards */}
        <div className="space-y-3">
          {servicesInCat.map((s) => {
            const selected = s.id === activeServiceId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveServiceId(s.id)}
                className={[
                  "w-full rounded-2xl border p-4 text-left transition",
                  selected
                    ? "border-[rgb(var(--ga-red))]/40 bg-[rgb(var(--ga-red))]/[0.03]"
                    : "border-black/10 bg-white hover:bg-black/[0.03]",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-[rgb(var(--ga-black))]">
                      {s.title}
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm text-black/65">
                      {s.summary}
                    </div>
                  </div>

                  <span className="mt-1 inline-flex shrink-0 items-center rounded-full bg-[rgb(var(--ga-yellow))]/15 px-2.5 py-1 text-xs font-semibold text-black/70">
                    {s.timeline}
                  </span>
                </div>
              </button>
            );
          })}

          {!servicesInCat.length ? (
            <div className="rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/70">
              No services found for this category.
            </div>
          ) : null}
        </div>

        {/* Right: details */}
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          {!activeService ? (
            <div className="text-sm text-black/70">Select a service to see details.</div>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-[rgb(var(--ga-black))]">
                    {activeService.title}
                  </h2>
                  <p className="mt-2 text-sm text-black/70">{activeService.summary}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
                  >
                    Request proposal
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
                  >
                    Get estimate
                  </a>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold text-black/70">Deliverables</div>
                  <ul className="mt-3 space-y-2">
                    {activeService.deliverables.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-black/75">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-semibold text-black/70">Best for</div>
                  <ul className="mt-3 space-y-2">
                    {activeService.bestFor.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-black/75">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 text-sm font-semibold text-black/70">
                    Tools / stack
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeService.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package builder */}
              <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                      Package builder
                    </div>
                    <div className="mt-1 text-sm text-black/65">
                      Quick range estimate (INR). Final depends on scope.
                    </div>
                  </div>
                  <div className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[rgb(var(--ga-black))]">
                    ₹{formatINR(estimate.min)} – ₹{formatINR(estimate.max)}
                  </div>
                </div>

                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {ADD_ONS.map((a) => {
                    const checked = !!addons[a.id];
                    return (
                      <label
                        key={a.id}
                        className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                      >
                        <span className="text-black/80">{a.label}</span>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) =>
                            setAddons((p) => ({ ...p, [a.id]: e.target.checked }))
                          }
                        />
                      </label>
                    );
                  })}
                </div>

                <div className="mt-4 text-xs text-black/60">
                  Tip: Start with the base package. We’ll refine scope on a discovery call.
                </div>
              </div>

              {/* FAQs */}
              <div className="mt-8">
                <div className="text-sm font-semibold text-black/70">FAQs</div>
                <div className="mt-3 space-y-3">
                  {activeService.faqs.map((f) => (
                    <div key={f.q} className="rounded-2xl border border-black/10 p-4">
                      <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                        {f.q}
                      </div>
                      <div className="mt-2 text-sm text-black/70">{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}