// src/components/ui/Timeline.tsx
export type TimelineStep = {
  title: string;
  desc: string;
};

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {steps.map((s, idx) => (
        <li
          key={s.title}
          className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgb(var(--ga-yellow))] shadow-sm">
              <span className="text-sm font-black text-neutral-900">
                {idx + 1}
              </span>
            </div>

            <div>
              <h3 className="h-font text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                {s.desc}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}