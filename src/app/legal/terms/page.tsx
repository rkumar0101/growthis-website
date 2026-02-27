// src/app/legal/terms/page.tsx
import { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Terms",
  description: "GrowthAlis Terms & Conditions.",
};

export default function TermsPage() {
  const updatedAt = "27 Feb 2026";

  const sections: LegalSection[] = [
    {
      id: "scope-of-services",
      title: "1. Scope of Services",
      content: (
        <div className="space-y-3">
          <p>
            GrowthAlis agrees to provide the services outlined in the Proposal,
            which may include:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Custom Development:</strong> Designing and building bespoke
              web and mobile applications.
            </li>
            <li>
              <strong>Digital Presence & Marketing:</strong> Management and
              optimization of Google Business Profile (GMB), website SEO, and
              social media platforms (Facebook, Instagram).
            </li>
            <li>
              <strong>Process Automation:</strong> Implementation of automated
              workflows to streamline business operations.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "client-responsibilities",
      title: "2. Client Responsibilities",
      content: (
        <div className="space-y-3">
          <p>To ensure project success, the Client must:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Provide all necessary access credentials (e.g., GMB, FB/IG admin
              rights, hosting) in a timely manner.
            </li>
            <li>
              Supply all brand assets, including logos, images, and text. By
              doing so, you confirm you own them and will handle any legal issues
              if someone claims copyright theft.
            </li>
            <li>
              Provide timely feedback and approvals during development milestones
              to avoid project delays.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "3. Intellectual Property",
      content: (
        <div className="space-y-3">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Deliverables:</strong> Upon full and final payment, the
              Client shall own the final version of the custom application and
              content created specifically for them.
            </li>
            <li>
              <strong>GrowthAlis Tools:</strong> Any pre-existing proprietary
              tools, automation scripts, or software code developed by GrowthAlis
              prior to this agreement remain the sole property of GrowthAlis.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "payment-terms",
      title: "4. Payment Terms",
      content: (
        <div className="space-y-3">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Schedule:</strong> Payments are due according to the
              milestones defined in the Proposal.
            </li>
            <li>
              <strong>Late Fees:</strong> Payments delayed beyond seven (7) days
              from the due date may incur a late fee.
            </li>
            <li>
              <strong>Scope Changes:</strong> Any work requested outside the
              original “Scope of Work” will be subject to additional fees and a
              separate Change Order.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "guarantees-liabilities",
      title: "5. Guarantees & Liabilities",
      content: (
        <div className="space-y-3">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Performance:</strong> While GrowthAlis uses industry-best
              practices for digital marketing and SEO, we do not guarantee
              specific rankings or sales figures due to the evolving nature of
              platform algorithms (e.g., Google, Meta).
            </li>
            <li>
              <strong>Limitation of Liability:</strong> GrowthAlis is not liable
              for any lost profits, data loss, or indirect damages arising from
              the use or inability to use the developed services.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "confidentiality",
      title: "6. Confidentiality",
      content: (
        <p>
          Both parties agree to keep all sensitive business information,
          marketing strategies, and technical data strictly confidential during
          and after the term of this agreement.
        </p>
      ),
    },
    {
      id: "termination",
      title: "7. Termination",
      content: (
        <p>
          Either party may terminate this agreement with thirty (30) days'
          written notice. Upon termination, the Client remains responsible for
          payment for all work completed up to the termination date.
        </p>
      ),
    },
  ];

  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      subtitle="Readable terms, formatted with clear sections and quick navigation."
      updatedAt={updatedAt}
      sections={sections}
    />
  );
}