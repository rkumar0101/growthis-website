"use client";

import { useMemo, useState } from "react";

type Brief = {
  summary: string;
  scope: string[];
  recommendedPages?: string[];
  risksAssumptions?: string[];
  openQuestions?: string[];
  nextStep: string;
};

export default function BriefBuilderPage() {
  const [form, setForm] = useState({
    goal: "",
    businessType: "",
    pages: "",
    integrations: "",
    contentReady: "Mostly ready",
    timeline: "2-4 weeks",
    budget: "Mid",
    constraints: "",
  });

  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [error, setError] = useState("");

  // Optional lead capture (goes to your existing /api/leads)
  const [capture, setCapture] = useState({
    name: "",
    email: "",
    whatsapp: "",
    website: "", // honeypot
  });

  const canCapture = useMemo(() => Boolean(brief), [brief]);

  async function generate() {
    setError("");
    setBrief(null);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to generate brief.");

      setBrief(json.data as Brief);
    } catch (e: any) {
      setError(String(e?.message ?? "Something went wrong."));
    } finally {
      setLoading(false);
    }
  }

  async function saveToSheets() {
    if (!brief) return;
    if (capture.website) return; // honeypot

    const payload = {
      name: capture.name,
      email: capture.email,
      phone: capture.whatsapp,
      message: "AI Brief Builder submission",
      source: "ai-brief-builder",
      brief,
      website: capture.website,
    };

    await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <div className="text-sm font-semibold text-black/60">Tool</div>
        <h1 className="mt-2 text-3xl font-semibold text-[rgb(var(--ga-black))] md:text-4xl">
          AI Project Brief Builder
        </h1>
        <p className="mt-3 max-w-2xl text-black/70">
          Answer a few questions and get a structured brief you can share.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              <div className="font-semibold text-black/70">Goal</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.goal}
                onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
                placeholder="e.g., More inbound leads"
              />
            </label>

            <label className="text-sm">
              <div className="font-semibold text-black/70">Business type</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.businessType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, businessType: e.target.value }))
                }
                placeholder="e.g., Real estate agency"
              />
            </label>

            <label className="text-sm md:col-span-2">
              <div className="font-semibold text-black/70">Pages / features</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.pages}
                onChange={(e) => setForm((p) => ({ ...p, pages: e.target.value }))}
                placeholder="e.g., Home, Services, Case Studies, Contact"
              />
            </label>

            <label className="text-sm md:col-span-2">
              <div className="font-semibold text-black/70">Integrations</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.integrations}
                onChange={(e) =>
                  setForm((p) => ({ ...p, integrations: e.target.value }))
                }
                placeholder="e.g., WhatsApp, CRM, Google Sheets"
              />
            </label>

            <label className="text-sm">
              <div className="font-semibold text-black/70">Content readiness</div>
              <select
                className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
                value={form.contentReady}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contentReady: e.target.value }))
                }
              >
                {["Not ready", "Somewhat ready", "Mostly ready", "Ready"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <div className="font-semibold text-black/70">Timeline</div>
              <select
                className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
                value={form.timeline}
                onChange={(e) => setForm((p) => ({ ...p, timeline: e.target.value }))}
              >
                {["ASAP", "2-4 weeks", "1-2 months", "Flexible"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <div className="font-semibold text-black/70">Budget band</div>
              <select
                className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
                value={form.budget}
                onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
              >
                {["Low", "Mid", "High"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm md:col-span-2">
              <div className="font-semibold text-black/70">Constraints (optional)</div>
              <textarea
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                rows={3}
                value={form.constraints}
                onChange={(e) =>
                  setForm((p) => ({ ...p, constraints: e.target.value }))
                }
                placeholder="e.g., Must launch before March 15"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={generate}
              disabled={loading}
              className="rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate brief"}
            </button>

            <a
              href="/contact"
              className="rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
            >
              Prefer a call? Contact us
            </a>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="text-sm font-semibold text-black/70">Output</div>

          {!brief ? (
            <div className="mt-3 text-sm text-black/60">Your brief will appear here.</div>
          ) : (
            <div className="mt-4 space-y-5">
              <div>
                <div className="text-sm font-semibold text-black/70">Summary</div>
                <div className="mt-2 text-sm text-black/75">{brief.summary}</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black/70">Scope</div>
                <ul className="mt-2 space-y-2">
                  {brief.scope.map((s) => (
                    <li key={s} className="flex gap-2 text-sm text-black/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {brief.recommendedPages?.length ? (
                <div>
                  <div className="text-sm font-semibold text-black/70">Recommended pages</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {brief.recommendedPages.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/70"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div>
                <div className="text-sm font-semibold text-black/70">Next step</div>
                <div className="mt-2 text-sm text-black/75">{brief.nextStep}</div>
              </div>

              {/* Lead capture */}
              <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                <div className="text-sm font-semibold text-[rgb(var(--ga-black))]">
                  Save to Sheets (optional)
                </div>
                <div className="mt-1 text-sm text-black/60">
                  We’ll store it so we can help you implement it.
                </div>

                <div className="mt-3 grid gap-3">
                  <input
                    className="w-full rounded-md border border-black/10 p-2 text-sm"
                    placeholder="Name"
                    value={capture.name}
                    onChange={(e) => setCapture((p) => ({ ...p, name: e.target.value }))}
                  />
                  <input
                    className="w-full rounded-md border border-black/10 p-2 text-sm"
                    placeholder="Email"
                    value={capture.email}
                    onChange={(e) => setCapture((p) => ({ ...p, email: e.target.value }))}
                  />
                  <input
                    className="w-full rounded-md border border-black/10 p-2 text-sm"
                    placeholder="WhatsApp (optional)"
                    value={capture.whatsapp}
                    onChange={(e) =>
                      setCapture((p) => ({ ...p, whatsapp: e.target.value }))
                    }
                  />

                  {/* honeypot */}
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    value={capture.website}
                    onChange={(e) =>
                      setCapture((p) => ({ ...p, website: e.target.value }))
                    }
                  />

                  <button
                    type="button"
                    disabled={!canCapture}
                    onClick={saveToSheets}
                    className="rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="text-xs text-black/60">
                This is a structured draft. Final scope is confirmed on discovery.
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}