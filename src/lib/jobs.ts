// src/lib/jobs.ts
export type Job = {
  slug: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
};

export const jobs: Job[] = [
  {
    slug: "frontend-nextjs",
    title: "Frontend Developer (Next.js)",
    location: "Remote / India",
    type: "Contract",
    experience: "1–3 years",
    summary:
      "Build clean, fast marketing websites and landing pages in Next.js + Tailwind. Strong UI taste matters.",
    responsibilities: [
      "Build responsive pages and reusable components",
      "Implement micro-interactions using Framer Motion (light, tasteful)",
      "Keep code clean, consistent, and performance-friendly",
      "Work with structured content and simple data files",
    ],
    requirements: [
      "Good Next.js (App Router) + React fundamentals",
      "Comfortable with Tailwind and component-based UI",
      "Attention to detail (spacing, typography, responsive behavior)",
      "Can debug quickly and communicate clearly",
    ],
    niceToHave: [
      "SEO basics (metadata, sitemap, structure)",
      "Performance awareness (images, layout stability)",
    ],
    benefits: ["Flexible work", "Clear tasks", "Premium UI projects"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    experience: "1–4 years",
    summary:
      "Design clean, premium UI with bold typography and subtle shapes. Focus on conversion flow.",
    responsibilities: [
      "Design page sections and components (cards, timelines, forms)",
      "Create simple wireframes and final UI layouts",
      "Work with red/yellow accents on white backgrounds",
      "Optimize decision flow: clarity → proof → CTA",
    ],
    requirements: [
      "Strong visual hierarchy and spacing skills",
      "Comfortable designing for responsive layouts",
      "Can explain design decisions simply",
    ],
    niceToHave: ["Experience with SaaS/agency sites", "Figma proficiency"],
    benefits: ["Fast iterations", "Direct feedback", "High-impact work"],
  },
  {
    slug: "content-copywriter",
    title: "Content & Copy (Web + Landing Pages)",
    location: "Remote",
    type: "Contract",
    experience: "1–4 years",
    summary:
      "Write clear section copy for websites and landing pages. No fluff. Strong clarity and CTA flow.",
    responsibilities: [
      "Write/reshape homepage + services + landing page sections",
      "Improve clarity and reduce drop-offs with better structure",
      "Help craft FAQs, headlines, and proof blocks",
    ],
    requirements: [
      "Strong, simple writing (no jargon)",
      "Understands conversion writing basics",
      "Can work from briefs and examples",
    ],
    benefits: ["Clear scope", "Premium portfolio projects"],
  },
];

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug) ?? null;
}