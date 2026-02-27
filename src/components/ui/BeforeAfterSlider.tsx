// src/components/ui/BeforeAfterSlider.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  beforeLabel?: string;
  afterLabel?: string;
  before: React.ReactNode;
  after: React.ReactNode;
  initial?: number; // 0..100
};

export function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
  before,
  after,
  initial = 55,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(() => clamp(initial, 0, 100));
  const [dragging, setDragging] = useState(false);

  const clipStyle = useMemo(() => {
    // show AFTER from left up to pct
    return { clipPath: `inset(0 ${100 - pct}% 0 0)` };
  }, [pct]);

  function setFromClientX(clientX: number) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(clientX - r.left, 0, r.width);
    const next = (x / r.width) * 100;
    setPct(clamp(next, 0, 100));
  }

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      setFromClientX(e.clientX);
    }
    function onUp() {
      setDragging(false);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-4">
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50"
        style={{ height: 360 }}
        aria-label="Before and after comparison"
      >
        {/* BEFORE (base) */}
        <div className="absolute inset-0">{before}</div>

        {/* AFTER (clipped) */}
        <div className="absolute inset-0" style={clipStyle}>
          {after}
        </div>

        {/* Labels */}
        <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm">
          {beforeLabel}
        </div>
        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm">
          {afterLabel}
        </div>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute top-0 h-full w-[2px] bg-neutral-900/20"
          style={{ left: `${pct}%` }}
        />

        {/* Handle */}
        <button
          type="button"
          onPointerDown={(e) => {
            setDragging(true);
            setFromClientX(e.clientX);
          }}
          className="absolute top-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white px-0 py-0 shadow-sm transition hover:shadow-md"
          style={{ left: `calc(${pct}% - 6px)` }}
          aria-label="Drag to compare"
        >
          <span className="block h-3 w-3 rounded-full bg-[rgb(var(--ga-yellow))] shadow-[0_0_0_1px_rgba(var(--ga-yellow),0.12)]" />
        </button>

        {/* Bottom hint bar */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-neutral-200 bg-white/90 px-4 py-2 text-xs text-neutral-700 shadow-sm">
          Drag the handle to compare
        </div>
      </div>

      {/* Range input as accessibility fallback */}
      <div className="mt-4">
        <label className="flex items-center justify-between text-xs font-semibold text-neutral-700">
          <span>Before</span>
          <span>After</span>
        </label>

        <div className="mt-2 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            className="w-full accent-[rgb(var(--ga-yellow))]"
            aria-label="Comparison slider"
          />
          <span className="min-w-12 text-right text-xs font-semibold text-neutral-700">
            {Math.round(pct)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}