// src/components/sections/ContactStepForm.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import HoneypotField from "@/components/forms/HoneypotField";

type Step = 1 | 2 | 3;

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  goal: string;
  budget: string;
  timeline: string;
  message: string;
  source: string;
};

const GOALS = [
  "New website (lead generation)",
  "Landing page for ads",
  "Redesign / improve conversions",
  "Performance + speed cleanup",
  "Not sure yet",
];

const BUDGETS = ["Under ₹25k", "₹25k–₹60k", "₹60k–₹1.5L", "₹1.5L+", "Not sure"];
const TIMELINES = ["ASAP", "1–2 weeks", "2–4 weeks", "1–2 months", "Flexible"];

export function ContactStepForm() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Honeypot
  const [website, setWebsite] = useState("");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    goal: GOALS[0],
    budget: BUDGETS[1],
    timeline: TIMELINES[2],
    message: "",
    source: "website",
  });

  const progress = useMemo(() => {
    return step === 1 ? 33 : step === 2 ? 66 : 100;
  }, [step]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function validateCurrentStep(): string | null {
    if (step === 1) {
      if (!form.name.trim()) return "Please enter your name.";
      if (!form.email.trim()) return "Please enter your email.";
      if (!isEmail(form.email.trim())) return "Please enter a valid email.";
    }
    if (step === 2) {
      if (!form.goal) return "Please select a goal.";
      if (!form.timeline) return "Please select a timeline.";
    }
    return null;
  }

  async function onNext() {
    setError(null);
    const msg = validateCurrentStep();
    if (msg) {
      setError(msg);
      return;
    }
    setStep((s) => (s === 1 ? 2 : 3));
  }

  function onBack() {
    setError(null);
    setStep((s) => (s === 3 ? 2 : 1));
  }

  async function onSubmit() {
    setError(null);

    // Validate all
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!form.email.trim() || !isEmail(form.email.trim()))
      return setError("Please enter a valid email.");

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Include honeypot field in payload
        body: JSON.stringify({ ...form, website }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setDone(true);
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 ring-yellow">
        <p className="badge-yellow">
          <span className="dot-yellow" />
          Submitted
        </p>
        <h2 className="h-font mt-4 text-2xl font-semibold">
          Thanks! We’ll reply with the next step.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-700">
          We’ll review your details and respond quickly with either a short WhatsApp message or email.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn-base btn-primary" href="https://wa.me/" target="_blank" rel="noreferrer">
            Message on WhatsApp
          </a>
          <Link className="btn-base btn-secondary" href="/case-studies">
            See case studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
      {/* Hidden honeypot */}
      <HoneypotField value={website} onChange={setWebsite} />

      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-neutral-500">Step {step} of 3</p>
          <p className="h-font mt-1 text-lg font-semibold">Quick project form</p>
        </div>

        <div className="w-40 rounded-full bg-neutral-100 p-1">
          <div
            className="h-2 rounded-full bg-[rgba(var(--ga-yellow),0.9)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Error */}
      {error ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {/* Steps */}
      <div className="mt-6">
        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Name*"
              value={form.name}
              onChange={(v) => update("name", v)}
              placeholder="Your full name"
            />
            <Field
              label="Email*"
              value={form.email}
              onChange={(v) => update("email", v)}
              placeholder="you@company.com"
            />
            <Field
              label="Phone (optional)"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              placeholder="+91..."
            />
            <Field
              label="Company (optional)"
              value={form.company}
              onChange={(v) => update("company", v)}
              placeholder="Company name"
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Primary goal"
              value={form.goal}
              onChange={(v) => update("goal", v)}
              options={GOALS}
            />
            <Select
              label="Timeline"
              value={form.timeline}
              onChange={(v) => update("timeline", v)}
              options={TIMELINES}
            />
            <Select
              label="Budget (approx.)"
              value={form.budget}
              onChange={(v) => update("budget", v)}
              options={BUDGETS}
            />
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
              <p className="font-semibold text-neutral-900">Why we ask this</p>
              <p className="mt-2 leading-relaxed">
                This helps us suggest the best approach without wasting your time.
              </p>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <Textarea
              label="Any details (optional)"
              value={form.message}
              onChange={(v) => update("message", v)}
              placeholder="What do you want the website to achieve? Any references you like?"
            />

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
              <p className="font-semibold text-neutral-900">What happens next</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>We review your goals and timeline</li>
                <li>We reply with a simple plan and next step</li>
                <li>If needed, we schedule a quick call</li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        {step !== 1 ? (
          <button
            type="button"
            onClick={onBack}
            className="btn-base btn-secondary"
            disabled={loading}
          >
            Back
          </button>
        ) : null}

        {step !== 3 ? (
          <button
            type="button"
            onClick={onNext}
            className="btn-base btn-primary"
            disabled={loading}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="btn-base btn-primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}

        <a
          className="btn-base border border-neutral-300 bg-white text-neutral-900 hover:-translate-y-0.5"
          href="https://wa.me/"
          target="_blank"
          rel="noreferrer"
        >
          Or WhatsApp us
        </a>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        By submitting, you agree to our{" "}
        <Link className="underline underline-offset-4" href="/legal/privacy">
          privacy policy
        </Link>
        .
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-neutral-900">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-neutral-900">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-neutral-900">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
      />
    </label>
  );
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}