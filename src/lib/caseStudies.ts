// src/lib/caseStudies.ts
export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  services: string[];
  results: { label: string; value: string }[];
  before: string[];
  after: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "local-service-leads",
    title: "Local Service Brand: More leads from the same traffic",
    industry: "Local Services",
    summary:
      "We redesigned the site experience, improved speed, and rebuilt the contact flow to reduce drop-offs.",
    services: ["Website redesign", "Conversion copy", "Performance"],
    results: [
      { label: "Lead conversion", value: "+38%" },
      { label: "Page load", value: "-41%" },
      { label: "Cost per lead", value: "-22%" },
    ],
    before: [
      "Busy layout with weak hierarchy",
      "Slow pages and heavy assets",
      "Contact form felt long and unclear",
    ],
    after: [
      "Clear hero + CTA with supporting proof",
      "Performance-first sections and assets",
      "Short step form with smart questions",
    ],
  },
  {
    slug: "b2b-saas-landing",
    title: "B2B SaaS Landing Page: Higher demo bookings",
    industry: "B2B SaaS",
    summary:
      "We created a clean landing page system focused on credibility, clarity, and fewer distractions.",
    services: ["Landing page", "Messaging", "SEO basics"],
    results: [
      { label: "Demo bookings", value: "+29%" },
      { label: "Bounce rate", value: "-18%" },
      { label: "Time on page", value: "+24%" },
    ],
    before: [
      "Too many CTAs competing",
      "Features not tied to outcomes",
      "No clear proof near decision points",
    ],
    after: [
      "One primary CTA across page",
      "Outcome-first positioning",
      "Proof blocks placed before CTAs",
    ],
  },
  {
    slug: "ecommerce-speed",
    title: "Ecommerce Speed Upgrade: Better UX on mobile",
    industry: "Ecommerce",
    summary:
      "We optimized images, cleaned up UI patterns, and improved product page flow for mobile shoppers.",
    services: ["Performance", "UX cleanup", "Checkout flow"],
    results: [
      { label: "Mobile speed", value: "+45%" },
      { label: "Add-to-cart", value: "+12%" },
      { label: "Checkout completion", value: "+9%" },
    ],
    before: [
      "Heavy images and layout shifts",
      "Product page felt cluttered",
      "Checkout steps weren’t clear",
    ],
    after: [
      "Optimized assets and stable layout",
      "Simpler product layout",
      "Clear, guided checkout steps",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug) ?? null;
}