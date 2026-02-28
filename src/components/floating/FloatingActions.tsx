"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Drawer from "@/components/ui/Drawer";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  website?: string; // honeypot
};

function safeTrim(s: string, max: number) {
  return s.replace(/\s+/g, " ").trim().slice(0, max);
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  // keep ref to the contact trigger so focus returns properly (Drawer also restores)
  const contactBtnRef = useRef<HTMLButtonElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    const nameOk = safeTrim(form.name, 80).length >= 2;
    const emailOk = isEmail(form.email);
    const msgOk = safeTrim(form.message, 400).length >= 8;
    return nameOk && emailOk && msgOk;
  }, [form]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setError("");
    }
  }, [open]);

  async function submitLead() {
    setError("");

    // honeypot
    if (form.website) {
      setStatus("success");
      return;
    }

    const payload: LeadPayload = {
      name: safeTrim(form.name, 80),
      email: safeTrim(form.email, 120),
      phone: safeTrim(form.phone, 40) || undefined,
      message: safeTrim(form.message, 600),
      source: "floating-drawer",
      website: form.website || undefined,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in name, email, and message.");
      setStatus("error");
      return;
    }

    if (!isEmail(payload.email)) {
      setError("Please enter a valid email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || (json && json.ok === false)) {
        throw new Error(json?.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
    } catch (e: any) {
      setStatus("error");
      setError(String(e?.message ?? "Something went wrong."));
    }
  }

  const whatsappHref =
    "https://wa.me/917048040175?text=" +
    encodeURIComponent("Hi GrowthAlis, I want to discuss a project.");

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
        {/* WhatsApp */}
        <div className="group relative">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[rgb(var(--ga-red))] px-4 text-sm font-semibold text-white shadow-lg hover:opacity-95"
            aria-label="Open WhatsApp"
          >
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15"
            >
              {/* simple chat icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4.5A8 8 0 1 1 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            WhatsApp
          </a>

          {/* Tooltip */}
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-within:opacity-100">
            Chat on WhatsApp
          </span>
        </div>

        {/* Contact Drawer trigger */}
        <div className="group relative">
          <button
            ref={contactBtnRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-[rgb(var(--ga-black))] shadow-lg hover:bg-black/[0.04]"
            aria-label="Open contact drawer"
          >
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--ga-yellow))]/25"
            >
              {/* mail icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16v10H4V7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="m4 8 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Contact
          </button>

          {/* Tooltip */}
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-within:opacity-100">
            Quick inquiry
          </span>
        </div>
      </div>

      {/* Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)} title="Quick contact">
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-black/70">
              Tell us what you need
            </div>
            <div className="mt-1 text-sm text-black/60">
              We usually respond within the same day.
            </div>
          </div>

          <div className="grid gap-3">
            <label className="text-sm">
              <div className="font-semibold text-black/70">Name</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Your name"
              />
            </label>

            <label className="text-sm">
              <div className="font-semibold text-black/70">Email</div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="you@company.com"
              />
            </label>

            <label className="text-sm">
              <div className="font-semibold text-black/70">
                Phone / WhatsApp (optional)
              </div>
              <input
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+91…"
              />
            </label>

            <label className="text-sm">
              <div className="font-semibold text-black/70">Message</div>
              <textarea
                className="mt-2 w-full rounded-md border border-black/10 p-2"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="What are you trying to achieve? Any deadlines?"
              />
            </label>

            {/* honeypot */}
            <input
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              value={form.website}
              onChange={(e) =>
                setForm((p) => ({ ...p, website: e.target.value }))
              }
            />
          </div>

          {status === "success" ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              Sent. We’ll get back to you soon.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error || "Something went wrong."}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={submitLead}
              disabled={!canSubmit || status === "submitting"}
              className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send"}
            </button>

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/[0.04]"
              onClick={() => setOpen(false)}
            >
              Open full form
            </a>
          </div>

          <div className="text-xs text-black/60">
            Tip: Press Esc to close.
          </div>
        </div>
      </Drawer>
    </>
  );
}