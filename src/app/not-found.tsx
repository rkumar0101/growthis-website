import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-3xl border border-black/10 bg-white p-8">
        <div className="text-sm font-semibold text-black/60">404</div>
        <h1 className="mt-2 text-3xl font-semibold text-[rgb(var(--ga-black))] md:text-4xl">
          This page doesn’t exist.
        </h1>
        <p className="mt-3 max-w-2xl text-black/70">
          If you followed a broken link, head back to the homepage or run a quick audit.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[0.04]"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[rgb(var(--ga-red))] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          >
            Contact
          </Link>
          <Link
            href="/tools/website-audit"
            className="inline-flex items-center justify-center rounded-md bg-black/[0.04] px-4 py-2 text-sm hover:bg-black/[0.06]"
          >
            Run website audit
          </Link>
        </div>
      </div>
    </div>
  );
}