// src/components/layout/Footer.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-3">
          <div>
            <div className="h-font text-lg font-semibold">GrowthAlis</div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
              Premium websites and growth systems built to convert. Clean design,
              fast performance, and smart micro-interactions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p className="font-semibold text-neutral-900">Company</p>
              <Link className="block text-neutral-600 hover:text-neutral-900" href="/about">
                About
              </Link>
              <Link className="block text-neutral-600 hover:text-neutral-900" href="/careers">
                Careers
              </Link>
              <Link className="block text-neutral-600 hover:text-neutral-900" href="/contact">
                Contact
              </Link>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-neutral-900">Legal</p>
              <Link className="block text-neutral-600 hover:text-neutral-900" href="/legal/terms">
                Terms
              </Link>
              <Link className="block text-neutral-600 hover:text-neutral-900" href="/legal/privacy">
                Privacy
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">Get in touch</p>
            <p className="mt-2 text-sm text-neutral-600">
              Want a site that looks premium and converts?
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className="btn-base btn-primary" href="/contact">
                Book a call
              </Link>
              <a
                className="btn-base btn-secondary"
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 py-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} GrowthAlis. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}