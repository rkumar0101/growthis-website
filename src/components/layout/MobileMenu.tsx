// src/components/layout/MobileMenu.tsx
"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLinks } from "./NavLinks";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-dvh w-[88%] max-w-sm border-l border-neutral-200 bg-white p-5 shadow-xl"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <div className="h-font text-lg font-semibold">GrowthAlis</div>
              <button
                onClick={onClose}
                className="rounded-full border border-neutral-200 px-3 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="mt-6">
              <NavLinks onNavigate={onClose} />
            </div>

            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm font-semibold">Quick actions</p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[rgba(var(--ga-yellow),0.25)] px-4 py-3 text-sm font-semibold text-neutral-900"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}