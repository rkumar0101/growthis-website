// src/components/layout/NavLinks.tsx
import Link from "next/link";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Free Tools", href: "/tools" },
  { label: "About", href: "/about" },
];

export function NavLinks({
  onNavigate,
  className = "",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
        {NAV_LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="text-sm font-medium text-neutral-700 transition hover:text-neutral-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="md:hidden">
          <Link
            href="/contact"
            onClick={onNavigate}
            className="inline-flex w-full items-center justify-center rounded-full bg-[rgb(var(--ga-red))] px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            Book a call
          </Link>
        </li>
      </ul>
    </nav>
  );
}