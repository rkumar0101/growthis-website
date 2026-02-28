export type ServiceCategory = "Website" | "Marketing" | "Automation" | "Retainers";

export type ServiceFAQ = { q: string; a: string };

export type Service = {
  id: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  deliverables: string[];
  tools: string[];
  timeline: string;
  bestFor: string[];
  baseRange: { min: number; max: number }; // INR
  faqs: ServiceFAQ[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Website",
  "Marketing",
  "Automation",
  "Retainers",
];

export const SERVICES: Service[] = [
  {
    id: "web-foundation",
    title: "Website Build (Conversion-first)",
    category: "Website",
    summary:
      "A fast, premium site designed to convert. Clear messaging, strong CTAs, and a structure that supports growth campaigns.",
    deliverables: [
      "Messaging and page structure",
      "Responsive UI with subtle motion",
      "Contact funnel and lead capture",
      "Performance and SEO basics",
      "Handover and documentation",
    ],
    tools: ["Next.js", "Tailwind", "Framer Motion", "GA4 (optional)"],
    timeline: "2–4 weeks (depends on pages and content readiness)",
    bestFor: [
      "Founders who need a premium site",
      "Businesses running ads",
      "Teams replacing a slow or dated site",
    ],
    baseRange: { min: 45000, max: 120000 },
    faqs: [
      {
        q: "Do you write the content?",
        a: "We can help structure and polish it. If you want full copywriting, we scope it separately.",
      },
      {
        q: "Will this rank on Google?",
        a: "We set strong foundations (structure, speed, metadata). Rankings depend on competition, content, and time.",
      },
    ],
  },
  {
    id: "landing-pages",
    title: "Landing Pages (Ads and Lead Gen)",
    category: "Marketing",
    summary:
      "Campaign-ready landing pages built for clarity, trust, and higher conversions.",
    deliverables: [
      "Offer and section flow",
      "Trust blocks (proof, FAQs, guarantees)",
      "Conversion-focused form",
      "A/B-ready layout (future)",
    ],
    tools: ["Next.js", "Analytics tags", "CRM or Zapier (optional)"],
    timeline: "3–7 days per page",
    bestFor: ["Businesses running Meta or Google ads", "New offers and launches"],
    baseRange: { min: 12000, max: 35000 },
    faqs: [
      {
        q: "Can you connect leads to WhatsApp or CRM?",
        a: "Yes. We can send leads to Sheets, email, WhatsApp, and most CRMs via webhook.",
      },
    ],
  },
  {
    id: "seo-foundations",
    title: "SEO Foundations (Technical and On-page)",
    category: "Marketing",
    summary:
      "Clean structure, metadata, internal linking, and speed fixes that make SEO easier to win.",
    deliverables: [
      "Technical audit and fixes",
      "Metadata and OG setup",
      "Indexing hygiene",
      "Internal linking plan",
    ],
    tools: ["Search Console", "Sitemap/robots", "Performance checks"],
    timeline: "1–2 weeks",
    bestFor: ["Sites that don’t rank or load fast", "New websites launching SEO"],
    baseRange: { min: 18000, max: 60000 },
    faqs: [
      {
        q: "Do you guarantee rankings?",
        a: "No. We focus on foundations and execution quality. Rankings are influenced by competition and consistency.",
      },
    ],
  },
  {
    id: "automation-stack",
    title: "Automation Setup (Ops and Lead handling)",
    category: "Automation",
    summary:
      "Automate repetitive work: lead routing, follow-ups, reporting, and basic workflows.",
    deliverables: [
      "Workflow mapping",
      "Webhook and integrations setup",
      "Error handling and alerts (basic)",
      "Documentation",
    ],
    tools: ["Google Sheets", "Apps Script", "Zapier or Make (optional)"],
    timeline: "1–2 weeks",
    bestFor: ["Teams drowning in manual follow-ups", "High lead volume"],
    baseRange: { min: 20000, max: 90000 },
    faqs: [
      {
        q: "What tools do you support?",
        a: "We usually start with Google Sheets and webhooks. If needed, we add Zapier/Make or custom scripts.",
      },
    ],
  },
  {
    id: "growth-retainer",
    title: "Growth Retainer (Monthly)",
    category: "Retainers",
    summary:
      "Ongoing improvements: landing pages, funnels, automation tweaks, and performance wins.",
    deliverables: [
      "Weekly priorities and execution",
      "Reporting and learnings",
      "New pages or features as needed",
      "Fast iteration loop",
    ],
    tools: ["Analytics", "SEO checks", "Conversion audits"],
    timeline: "Monthly",
    bestFor: ["Teams that want ongoing growth support"],
    baseRange: { min: 25000, max: 150000 },
    faqs: [
      {
        q: "Is this only marketing?",
        a: "No. It’s growth execution: website, funnels, automation, and whatever moves leads and conversion.",
      },
    ],
  },
];