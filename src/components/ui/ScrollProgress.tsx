"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MIN_SCROLLABLE_PX = 240; // auto-hide if page is basically not scrollable

export default function ScrollProgress() {
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  function compute() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollable = doc.scrollHeight - window.innerHeight;

    const shouldShow = scrollable > MIN_SCROLLABLE_PX;
    setVisible(shouldShow);

    if (!shouldShow) {
      setProgress(0);
      return;
    }

    const p = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / scrollable));
    setProgress(p);
  }

  function scheduleCompute() {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      compute();
    });
  }

  useEffect(() => {
    // Route change: reset and recompute after layout settles
    setProgress(0);
    const t = window.setTimeout(() => compute(), 0);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    compute();

    window.addEventListener("scroll", scheduleCompute, { passive: true });
    window.addEventListener("resize", scheduleCompute);

    return () => {
      window.removeEventListener("scroll", scheduleCompute);
      window.removeEventListener("resize", scheduleCompute);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-black/10"
    >
      <div
        className="h-full origin-left bg-[rgb(var(--ga-red))]"
        style={{
          transform: `scaleX(${progress})`,
          willChange: "transform",
        }}
      />
    </div>
  );
}