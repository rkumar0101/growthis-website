// src/app/legal/privacy/page.tsx
import { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy",
  description: "GrowthAlis Privacy Policy.",
};

export default function PrivacyPage() {
  const updatedAt = "27 Feb 2026";

  const sections: LegalSection[] = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <p>
          This Privacy Policy explains what information we collect, how we use
          it, and your choices. If you have questions, contact us.
        </p>
      ),
    },
    {
      id: "data-we-collect",
      title: "Information we collect",
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Contact details:</strong> name, email, phone, company (if provided).
          </li>
          <li>
            <strong>Project details:</strong> goals, budget range, timeline, and message you submit.
          </li>
          <li>
            <strong>Usage data:</strong> basic analytics data (pages visited, device, approximate location).
          </li>
        </ul>
      ),
    },
    {
      id: "how-we-use",
      title: "How we use your information",
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>To respond to enquiries and provide quotes/proposals.</li>
          <li>To improve our website experience and content.</li>
          <li>To prevent spam and abuse.</li>
        </ul>
      ),
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      content: (
        <div className="space-y-3">
          <p>
            We may use cookies and analytics tools to understand how the site is
            used and to improve performance. You can control cookies through
            your browser settings.
          </p>
        </div>
      ),
    },
    {
      id: "third-parties",
      title: "Third-party services",
      content: (
        <div className="space-y-3">
          <p>
            We may use third-party tools for hosting, analytics, and messaging
            (e.g., WhatsApp). These providers may process limited information to
            deliver their services.
          </p>
        </div>
      ),
    },
    {
      id: "retention",
      title: "Data retention",
      content: (
        <p>
          We keep enquiry data only as long as needed to respond, maintain
          business records, or meet legal obligations. You can request deletion
          where applicable.
        </p>
      ),
    },
    {
      id: "your-rights",
      title: "Your rights",
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>Request access to the information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion where applicable.</li>
        </ul>
      ),
    },
    {
      id: "contact",
      title: "Contact us",
      content: (
        <p>
          For privacy questions, contact us via the Contact page.
        </p>
      ),
    },
  ];

  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="A clear overview of what we collect and how we use it."
      updatedAt={updatedAt}
      sections={sections}
    />
  );
}