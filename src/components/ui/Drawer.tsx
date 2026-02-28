"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

function getFocusable(container: HTMLElement | null) {
  if (!container) return [];
  const nodes = container.querySelectorAll<HTMLElement>(
    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
  );
  return Array.from(nodes).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export default function Drawer({ open, onClose, title, children }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const portalTarget = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, []);

  useEffect(() => {
    if (!open) return;

    // remember focus
    lastActiveRef.current = document.activeElement as HTMLElement | null;

    // scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus first focusable
    const t = window.setTimeout(() => {
      const focusables = getFocusable(panelRef.current);
      (focusables[0] ?? panelRef.current)?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // focus trap
      if (e.key === "Tab") {
        const focusables = getFocusable(panelRef.current);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);

      // restore focus
      lastActiveRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !portalTarget) return null;

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <button
        aria-label="Close drawer"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Drawer"}
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-full max-w-[520px] border-l border-black/10 bg-white shadow-xl outline-none"
      >
        <div className="flex items-center justify-between gap-3 border-b border-black/10 px-5 py-4">
          <div className="min-w-0">
            {title ? (
              <div className="truncate text-base font-semibold text-[rgb(var(--ga-black))]">
                {title}
              </div>
            ) : null}
          </div>
          <button
            className="rounded-md border border-black/10 px-3 py-1.5 text-sm hover:bg-black/[0.04]"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="h-[calc(100%-57px)] overflow-auto px-5 py-5">
          {children}
        </div>
      </div>
    </div>,
    portalTarget
  );
}