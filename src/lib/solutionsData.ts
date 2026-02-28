export type Outcome =
  | "More leads"
  | "Launch a premium website"
  | "Better conversions"
  | "Automate operations"
  | "Fix trust and credibility"
  | "Improve speed and UX";

export type BlueprintStep = {
  title: string;
  details: string[];
};

export type Solution = {
  id: string;
  title: string;
  outcomeTags: Outcome[];
  summary: string;
  whoFor: string[];
  deliverables: string[];
  blueprint: BlueprintStep[];
  suggestedTool?: { title: string; href: string };
  primaryCta: { label: string; href: string };
};

export const OUTCOMES: Outcome[] = [
  "More leads",
  "Better conversions",
  "Launch a premium website",
  "Improve speed and UX",
  "Fix trust and credibility",
  "Automate operations",
];

export const SOLUTIONS: Solution[] = [
  {
    id: "lead-gen-system",
    title: "Lead Gen System (Website and Funnel)",
    outcomeTags: ["More leads", "Better conversions", "Fix trust and credibility"],
    summary:
      "A conversion-focused website and landing flow built to capture leads and move them to action.",
    whoFor: [
      "Service businesses",
      "Agencies and consultants",
      "Local businesses scaling via ads",
    ],
    deliverables: [
      "High-converting landing structure",
      "Offer positioning and proof blocks",
      "Lead capture and routing",
      "Basic tracking setup",
    ],
    blueprint: [
      {
        title: "Diagnose",
        details: [
          "Offer and audience clarity",
          "Funnel leaks (trust, friction, speed)",
          "CTA placement and messaging gaps",
        ],
      },
      {
        title: "Build",
        details: [
          "Landing sections, proof and FAQs",
          "Fast, responsive UI",
          "Lead capture connected to Sheets or CRM",
        ],
      },
      {
        title: "Improve",
        details: [
          "Track conversions",
          "Iterate copy and sections",
          "Add automation for follow-ups",
        ],
      },
    ],
    suggestedTool: { title: "Instant Website Audit", href: "/tools/website-audit" },
    primaryCta: { label: "Get this implemented", href: "/contact" },
  },
  {
    id: "premium-website-launch",
    title: "Premium Website Launch (Fast and Modern)",
    outcomeTags: ["Launch a premium website", "Improve speed and UX"],
    summary:
      "A premium product-like website with clean UI, subtle motion, and strong conversion structure.",
    whoFor: ["Startups", "Founders", "Brands upgrading their current site"],
    deliverables: [
      "Modern page structure and UI system",
      "Performance-first build",
      "SEO basics, OG and icons",
      "Contact funnel",
    ],
    blueprint: [
      {
        title: "Structure",
        details: ["Sitemap and page goals", "Messaging hierarchy", "CTA strategy"],
      },
      {
        title: "Design and Build",
        details: ["UI system", "Components", "Motion guidelines"],
      },
      {
        title: "Launch",
        details: ["SEO and index checks", "Analytics (optional)", "Handover"],
      },
    ],
    primaryCta: { label: "Get a quick plan", href: "/tools/brief-builder" },
  },
  {
    id: "automation-starter",
    title: "Automation Starter (Lead and Ops)",
    outcomeTags: ["Automate operations", "More leads"],
    summary:
      "Automate lead handling, follow-ups, and repetitive ops so you can move faster with less manual work.",
    whoFor: ["Teams handling lots of inquiries", "Businesses doing manual reporting"],
    deliverables: [
      "Workflow mapping",
      "Webhook integrations",
      "Alerts and basic error handling",
      "Documentation",
    ],
    blueprint: [
      { title: "Map", details: ["Inputs and outputs", "Approval steps", "Failure points"] },
      { title: "Automate", details: ["Sheets and Apps Script", "Zapier/Make (optional)", "Webhooks"] },
      { title: "Stabilize", details: ["Logs and retries", "Owner handover", "Simple dashboards"] },
    ],
    suggestedTool: { title: "Outcome Recommender", href: "/tools/outcome-recommender" },
    primaryCta: { label: "Talk to us", href: "/contact" },
  },
];