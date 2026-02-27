// src/components/floating/FloatingActions.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import HoneypotField from "@/components/forms/HoneypotField";

const WHATSAPP_NUMBER = "916289952604"; // no "+" in wa.me
const WHATSAPP_DEFAULT_TEXT = "Hi GrowthAlis, I need a service!";

function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function FloatingActions() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Drawer form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(WHATSAPP_DEFAULT_TEXT);

  // Honeypot
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waLink = useMemo(() => buildWhatsAppUrl(message || WHATSAPP_DEFAULT_TEXT), [message]);

  function openDrawer() {
    setDrawerOpen(true);
    setDone(false);
    setError(null);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  async function submitLead() {
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim() || !isEmail(email.trim())) return setError("Please enter a valid email.");

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          source: "floating-drawer",
          channel: "contact-drawer",
          website,
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

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {/* Contact bubble */}
        <button
          type="button"
          onClick={openDrawer}
          className="rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition-transform hover:-translate-y-0.5"
          aria-label="Open contact drawer"
        >
          Contact
        </button>

        {/* WhatsApp bubble */}
        <a
          href={buildWhatsAppUrl(WHATSAPP_DEFAULT_TEXT)}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 rounded-full bg-[rgb(var(--ga-red))] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:opacity-95"
          aria-label="Message us on WhatsApp"
        >
          <WhatsAppLogo className="h-5 w-5" />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">WA</span>
        </a>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen ? (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close contact drawer"
              onClick={closeDrawer}
              className="fixed inset-0 z-50 cursor-pointer bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.aside
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-auto rounded-t-3xl border border-neutral-200 bg-white p-6 shadow-xl md:bottom-auto md:left-auto md:top-0 md:right-0 md:h-full md:max-h-none md:w-[420px] md:rounded-t-none md:rounded-l-3xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
            >
              {/* Hidden honeypot */}
              <HoneypotField value={website} onChange={setWebsite} />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-neutral-500">Quick contact</p>
                  <h3 className="h-font mt-1 text-lg font-semibold text-neutral-900">
                    Tell us what you need
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    We’ll reply fast on WhatsApp or email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDrawer}
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-900 transition-transform hover:-translate-y-0.5"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>

              {error ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {done ? (
                <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 ring-yellow">
                  <p className="badge-yellow">
                    <span className="dot-yellow" />
                    Sent
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                    Thanks! If you want, you can also message us directly on WhatsApp with the same
                    details.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a className="btn-base btn-primary" href={waLink} target="_blank" rel="noreferrer">
                      Open WhatsApp
                    </a>
                    <button
                      type="button"
                      className="btn-base btn-secondary"
                      onClick={() => {
                        setDone(false);
                        setError(null);
                      }}
                    >
                      Send another
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  <Field label="Name*" value={name} onChange={setName} placeholder="Your full name" />
                  <Field
                    label="Email*"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@company.com"
                  />
                  <Field
                    label="Phone (optional)"
                    value={phone}
                    onChange={setPhone}
                    placeholder="+91..."
                  />
                  <Textarea
                    label="Message"
                    value={message}
                    onChange={setMessage}
                    placeholder="Hi GrowthAlis, I need a service!"
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="btn-base btn-primary w-fit"
                      onClick={submitLead}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send"}
                    </button>

                    <a
                      className="btn-base border border-neutral-300 bg-white text-neutral-900 hover:-translate-y-0.5"
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Or WhatsApp
                    </a>
                  </div>

                  <p className="text-xs text-neutral-500">
                    By sending, you agree to our{" "}
                    <Link className="underline underline-offset-4" href="/legal/privacy">
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
              )}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
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

function WhatsAppLogo({ className }: { className?: string }) {
  // Clean WhatsApp mark (recognizable, crisp)
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.52 3.49A11.9 11.9 0 0 0 12.03 0C5.47 0 .13 5.34.13 11.9c0 2.1.55 4.16 1.6 5.98L0 24l6.3-1.65a11.84 11.84 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.41-8.42ZM12.03 22a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.74.98.99-3.65-.24-.37a9.84 9.84 0 0 1-1.51-5.24C2.12 6.61 6.74 2 12.03 2a9.9 9.9 0 0 1 7.06 2.92A9.85 9.85 0 0 1 22 11.9C22 17.2 17.33 22 12.03 22Zm5.78-7.4c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.57-1.88-1.76-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67 0 1.57 1.15 3.09 1.31 3.3.16.21 2.27 3.46 5.5 4.85.77.33 1.29.53 1.73.64.77.24 1.48.2 2.03.12.61-.09 1.88-.77 2.14-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z"
      />
    </svg>
  );
}