// src/app/case-studies/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { caseStudies } from "@/lib/caseStudies";
import { CaseStudiesList } from "@/components/sections/CaseStudiesList";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real outcomes from GrowthAlis projects: conversion lifts, speed improvements, and better UX.",
};

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Case Studies"
        title="Before-and-after improvements you can feel."
        subtitle="Browse case studies by industry or service. Open one to see the slider and the exact changes."
      >
        <div className="flex flex-wrap gap-3">
          <Link className="btn-base btn-primary" href="/contact">
            Book a call
          </Link>
          <Link className="btn-base btn-secondary" href="/services">
            View services
          </Link>
        </div>
      </PageHeader>

      <Section>
        <CaseStudiesList items={caseStudies} />
      </Section>
    </main>
  );
}