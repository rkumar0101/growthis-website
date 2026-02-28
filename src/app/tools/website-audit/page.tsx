"use client";

import { useState } from "react";

type Audit = {
  headline: string;
  topIssues: string[];
  quickFixes: string[];
  priorityPlan: string[];
  nextStep?: string;
  disclaimer: string;
};

export default function WebsiteAuditTool() {
  const [form, setForm] = useState({ url: "", goal: "Leads" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Audit | null>(null);
  const [error, setError] = useState("");

  async function run() {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Failed to generate audit.");
      }

      setResult(json.data as Audit);
    } catch (e: any) {
      setError(String(e?.message ?? "Something went wrong."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <div className="text-sm font-semibold text-black/60">Tool</div>
        <h1 className="mt-2 text-3xl font-semibold text-[rgb(var(--ga-black))] md:text-4xl">
          Instant Website Audit (Heuristic)
        </h1>
        <p className="mt-3 max-w-2xl text-black/70">
          A fast conversion-focused audit. This does not fetch or measure your site.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-2xl border border-black/10 bg-white p-5">
          <label className="text-sm">
            <div className="font-semibold text-black/70">Website URL</div>
            <input
              className="mt-2 w-full rounded-md border border-black/10 p-2"
              value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              placeholder="https://..."
            />
          </label>

          <label className="mt-3 block text-sm">
            <div className="font-semibold text-black/70">Goal</div>
            <select
              className="mt-2 w-full rounded-md border border-black/10 bg-white p-2"
              value={form.goal}
              onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
            >
              {["Leads", "Trust", "Speed", "Design"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={run}
              disabled={loading}
              className="rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Auditing..." : "Run audit"}
            </button>

            <a
              href="/contact"
              className="rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
            >
              Want help implementing?
            </a>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-4 text-xs text-black/60">
            This report is heuristic based on best practices unless you run measured tools.
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="text-sm font-semibold text-black/70">Report</div>

          {!result ? (
            <div className="mt-3 text-sm text-black/60">Your audit will appear here.</div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="text-lg font-semibold text-[rgb(var(--ga-black))]">
                {result.headline}
              </div>

              <div>
                <div className="text-sm font-semibold text-black/70">Top issues</div>
                <ul className="mt-2 space-y-2">
                  {result.topIssues.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-black/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm font-semibold text-black/70">Quick fixes</div>
                <ul className="mt-2 space-y-2">
                  {result.quickFixes.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-black/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm font-semibold text-black/70">Priority plan</div>
                <ul className="mt-2 space-y-2">
                  {result.priorityPlan.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-black/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--ga-yellow))]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.nextStep ? (
                <div>
                  <div className="text-sm font-semibold text-black/70">Next step</div>
                  <div className="mt-2 text-sm text-black/75">{result.nextStep}</div>
                </div>
              ) : null}

              <div className="text-xs text-black/60">{result.disclaimer}</div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}