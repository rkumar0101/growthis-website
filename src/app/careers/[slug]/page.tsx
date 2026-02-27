// src/app/careers/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { jobs, getJob } from "@/lib/jobs";
import { JobApplyForm } from "@/components/sections/JobApplyForm";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role" };
  return {
    title: job.title,
    description: job.summary,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) {
    return (
      <main>
        <PageHeader
          eyebrow="Careers"
          title="Role not found"
          subtitle="The link may be wrong or the role doesn’t exist."
        >
          <Link className="btn-base btn-primary" href="/careers">
            Back to careers
          </Link>
        </PageHeader>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        eyebrow="Careers"
        title={job.title}
        subtitle={job.summary}
      >
        <div className="flex flex-wrap gap-2">
          <span className="badge-yellow">
            <span className="dot-yellow" />
            {job.type}
          </span>
          <span className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700">
            {job.location}
          </span>
          <span className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700">
            {job.experience}
          </span>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <h2 className="h-font text-xl font-semibold">Responsibilities</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                {job.responsibilities.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <h2 className="h-font text-xl font-semibold">Requirements</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                {job.requirements.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>

              {job.niceToHave?.length ? (
                <>
                  <h3 className="h-font mt-8 text-lg font-semibold">
                    Nice to have
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                    {job.niceToHave.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {job.benefits?.length ? (
                <>
                  <h3 className="h-font mt-8 text-lg font-semibold">Benefits</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                    {job.benefits.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link className="btn-base btn-secondary" href="/careers">
                Back to careers
              </Link>
              <Link className="btn-base btn-primary" href="/contact">
                Ask a question
              </Link>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <JobApplyForm role={job.title} />
          </div>
        </div>
      </Section>
    </main>
  );
}