"use client";

import { useState } from "react";

type Recommendation = {
  recommendedPath: string;
  reasons: string[];
  whatHappensNext?: string[];
  bestCTA: { label: string; href: string };
  disclaimer: string;
};

export default function OutcomeRecommenderTool() {
  const [form, setForm] = useState({
    outcome: "More leads",
    industry: "",
    currentState: "",
    url: "",
    budget: "Mid",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Recommendation | null>(null);
  const [error, setError] = useState("");

  async function run() {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed.");
      setResult(json.data as Recommendation);
    } catch (e: any) {
      setError(String(e?.message ?? "Something went wrong."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <div className="text-sm font-semibold text-black/60">Tool</div>
        <h1 className="mt-2 text-3xl font-semibold text-[rgb(var(--ga-black))] md:text-4xl">
          Outcome Recommender (AI)
        </h1>
        <p className="mt-3 max-w-2xl text-black/70">
          Tell us your goal. We’ll recommend the best path and the next step.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              <div className="font-semibold text-black/70">Outcome</div>
              <select
                className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
                value={form.outcome}
                onChange={(e) => setForm((p) => ({ ...p, outcome: e.target.value }))}
              >
                {[
                  "More leads",
  "Better conversions",
  "Launch a premium website",
  "Improve speed and UX",
  "Fix trust and credibility",
  "Automate operations",
                ].map((o) => (
                  <option key={o} value={o}>
                    {o}
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
                {["Low", "Mid", "High"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm md:col-span-2">
              <div className="font-semibold text-black/70">Industry</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.industry}
                onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
                placeholder="e.g., Real estate"
              />
            </label>

            <label className="text-sm md:col-span-2">
              <div className="font-semibold text-black/70">Current state</div>
              <textarea
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                rows={4}
                value={form.currentState}
                onChange={(e) =>
                  setForm((p) => ({ ...p, currentState: e.target.value }))
                }
                placeholder="What’s working? What’s broken?"
              />
            </label>

            <label className="text-sm md:col-span-2">
              <div className="font-semibold text-black/70">Website URL (optional)</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.url}
                onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                placeholder="https://..."
              />
              <div className="mt-1 text-xs text-black/60">
                We won’t fetch it here, it’s just context.
              </div>
            </label>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={run}
              disabled={loading}
              className="rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Thinking..." : "Recommend"}
            </button>
            <a
              href="/solutions"
              className="rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
            >
              Browse solutions
            </a>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="text-sm font-semibold text-black/70">Result</div>
          {!result ? (
            <div className="mt-3 text-sm text-black/60">Your recommendation appears here.</div>
          ) : (
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-sm font-semibold text-black/70">Recommended path</div>
                <div className="mt-2 text-sm text-black/75">{result.recommendedPath}</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black/70">Why</div>
                <ul className="mt-2 space-y-2">
                  {result.reasons.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-black/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.whatHappensNext?.length ? (
                <div>
                  <div className="text-sm font-semibold text-black/70">What happens next</div>
                  <ul className="mt-2 space-y-2">
                    {result.whatHappensNext.map((s) => (
                      <li key={s} className="flex gap-2 text-sm text-black/75">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <a
                href={result.bestCTA.href}
                className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
              >
                {result.bestCTA.label}
              </a>

              <div className="text-xs text-black/60">{result.disclaimer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}