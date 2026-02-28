"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MegaMenu from "@/components/layout/MegaMenu";

const NAV = [
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function openMega() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }

  function closeMegaSoon() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[rgb(var(--ga-yellow))]/10 backdrop-blur">
      {/* Make this wrapper relative so dropdown can be full-width */}
      <div className="relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[rgb(var(--ga-red))]" />
            <span className="text-base font-semibold text-[rgb(var(--ga-black))]">
              GrowthAlis
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
              onClick={() => setMegaOpen((p) => !p)}
              className="rounded-md px-3 py-2 text-sm text-black/80 hover:bg-black/[0.04]"
              aria-expanded={megaOpen}
            >
              Services &amp; Solutions <span aria-hidden>▾</span>
            </button>

            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-sm text-black/80 hover:bg-black/[0.04]"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
            >
              WhatsApp
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
            >
              Book a call
            </a>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/[0.04]"
            onClick={() => setMobileOpen((p) => !p)}
            aria-expanded={mobileOpen}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>

        {/* Full-width dropdown (NOT inside the button container) */}
        <div onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
          <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
        </div>

        {mobileOpen ? (
          <div className="md:hidden border-t border-black/10 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="grid gap-2">
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm hover:bg-black/[0.04]"
                >
                  Services
                </Link>
                <Link
                  href="/solutions"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm hover:bg-black/[0.04]"
                >
                  Solutions
                </Link>

                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm hover:bg-black/[0.04]"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href="/contact"
                  className="flex-1 rounded-md border border-black/10 px-4 py-2 text-center text-sm hover:bg-black/[0.04]"
                >
                  WhatsApp
                </a>
                <a
                  href="/contact"
                  className="flex-1 rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-center text-sm font-medium text-white hover:opacity-95"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}