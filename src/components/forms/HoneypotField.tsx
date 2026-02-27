type Props = {
  value: string;
  onChange: (next: string) => void;
  label?: string;
};

/**
 * Honeypot field:
 * - Hidden from humans
 * - Many bots autofill it
 * - If filled, our API silently accepts but does not store
 */
export default function HoneypotField({ value, onChange, label = "Website" }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[10000px] top-0 h-px w-px overflow-hidden opacity-0"
    >
      <label className="sr-only" htmlFor="website">
        {label}
      </label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        inputMode="none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}