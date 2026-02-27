// src/app/tools/website-roi/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";

export default function WebsiteRoiTool() {
  const [visitors, setVisitors] = useState(2000);
  const [conversion, setConversion] = useState(2);
  const [avgValue, setAvgValue] = useState(3000);
  const [lift, setLift] = useState(25);

  const result = useMemo(() => {
    const currentLeads = (visitors * conversion) / 100;
    const improvedLeads = currentLeads * (1 + lift / 100);
    const deltaLeads = improvedLeads - currentLeads;

    const currentValue = currentLeads * avgValue;
    const improvedValue = improvedLeads * avgValue;
    const deltaValue = improvedValue - currentValue;

    return {
      currentLeads,
      improvedLeads,
      deltaLeads,
      currentValue,
      improvedValue,
      deltaValue,
    };
  }, [visitors, conversion, avgValue, lift]);

  return (
    <main>
      <PageHeader
        eyebrow="Tool"
        title="Website ROI Estimator"
        subtitle="Estimate what improved conversions could be worth based on your traffic and value per lead."
      >
        <Link className="btn-base btn-secondary" href="/tools">
          Back to tools
        </Link>
      </PageHeader>

      <Section title="Inputs">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Field
              label="Monthly visitors"
              value={visitors}
              onChange={(v) => setVisitors(v)}
            />
            <Field
              label="Conversion rate (%)"
              value={conversion}
              onChange={(v) => setConversion(v)}
            />
            <Field
              label="Value per lead (₹)"
              value={avgValue}
              onChange={(v) => setAvgValue(v)}
            />
            <Field
              label="Expected lift (%)"
              value={lift}
              onChange={(v) => setLift(v)}
            />
          </div>
        </div>
      </Section>

      <section className="pb-12">
        <Container>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8">
            <h2 className="h-font text-2xl font-semibold">Result</h2>
            <p className="mt-2 text-sm text-neutral-700">
              This is a simple estimate, but it helps you sanity-check the upside.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Metric label="Current leads" value={formatNumber(result.currentLeads)} />
              <Metric label="Improved leads" value={formatNumber(result.improvedLeads)} />
              <Metric label="Extra leads" value={formatNumber(result.deltaLeads)} />
              <Metric label="Current value" value={`₹${formatNumber(result.currentValue)}`} />
              <Metric label="Improved value" value={`₹${formatNumber(result.improvedValue)}`} />
              <Metric label="Extra value" value={`₹${formatNumber(result.deltaValue)}`} />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-base btn-primary" href="/contact">
                Book a call to improve conversions
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
        </Container>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-neutral-900">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <p className="text-xs font-semibold text-neutral-500">{label}</p>
      <p className="h-font mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function formatNumber(n: number) {
  return Math.round(n).toLocaleString("en-IN");
}