// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[rgba(0,0,0,0.06)] bg-[rgb(var(--ga-yellow))]/65 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="h-font text-base font-semibold tracking-tight">
                Growth<span className="text-[rgb(var(--ga-red))]">Alis</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.10)] bg-white/70 px-3 py-1 text-xs text-neutral-700">
                <span className="dot-yellow" />
                premium builds
              </span>
            </Link>

            <div className="hidden md:block">
              <NavLinks className="hidden md:block" />
            </div>

            <div className="flex items-center gap-2">
              <a
                className="btn-base btn-primary hidden sm:inline-flex"
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <Link className="btn-base btn-primary hidden sm:inline-flex" href="/contact">
                Book a call
              </Link>

              <button
                className="inline-flex items-center justify-center rounded-full border border-[rgba(0,0,0,0.10)] bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-900 md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                Menu
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}