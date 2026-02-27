// src/components/sections/JobApplyForm.tsx
"use client";

import { useState } from "react";
import HoneypotField from "@/components/forms/HoneypotField";

export function JobApplyForm({ role }: { role: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim() || !isEmail(email.trim())) return setError("Please enter a valid email.");

    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name,
          email,
          phone,
          portfolio,
          message,
          source: "careers",
          website, // honeypot
        }),
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
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 ring-yellow">
        <p className="badge-yellow">
          <span className="dot-yellow" />
          Application submitted
        </p>
        <h3 className="h-font mt-4 text-xl font-semibold">Thanks! We’ll get back soon.</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          We’ll review your application and reply by email/WhatsApp if needed.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-neutral-200 bg-white p-6">
      {/* Hidden honeypot */}
      <HoneypotField value={website} onChange={setWebsite} />

      <p className="text-xs font-semibold text-neutral-500">Apply for</p>
      <h3 className="h-font mt-2 text-lg font-semibold">{role}</h3>

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4">
        <Field label="Name*" value={name} onChange={setName} />
        <Field label="Email*" value={email} onChange={setEmail} />
        <Field label="Phone (optional)" value={phone} onChange={setPhone} />
        <Field
          label="Portfolio/LinkedIn (optional)"
          value={portfolio}
          onChange={setPortfolio}
          placeholder="https://..."
        />
        <Textarea
          label="Message (optional)"
          value={message}
          onChange={setMessage}
          placeholder="Anything you want us to know?"
        />

        <button
          type="button"
          className="btn-base btn-primary w-fit"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit application"}
        </button>
      </div>

      <p className="mt-4 text-xs text-neutral-500">We only use this to respond to your application.</p>
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
        rows={4}
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
      />
    </label>
  );
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}