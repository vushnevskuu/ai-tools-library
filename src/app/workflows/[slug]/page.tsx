import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { Chip } from "@/components/ui/Chip";
import { ToolCard } from "@/components/cards/ToolCard";
import { WorkflowActions } from "@/components/workflow/WorkflowActions";
import {
  getWorkflowBySlug,
  getToolsBySlugs,
} from "@/lib/data";
import { FIELD_LABELS } from "@/lib/constants";

interface WorkflowPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const { workflows } = require("@/content/workflows");
  return workflows.map((w: { slug: string }) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) return {};
  return {
    title: workflow.title,
    description: workflow.tagline,
    openGraph: {
      title: workflow.title,
      description: workflow.tagline,
    },
  };
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  const steps = [...workflow.steps].sort((a, b) => a.order - b.order);
  const toolSlugs = steps.map((s) => s.toolSlug);
  const tools = getToolsBySlugs(toolSlugs);
  const toolMap = Object.fromEntries(tools.map((t) => [t.slug, t]));

  const relatedTools = workflow.relatedTools
    ? getToolsBySlugs(workflow.relatedTools)
    : [];

  return (
    <PageContainer className="py-8">
      <nav className="mb-8">
        <Link
          href="/explore"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Explore
        </Link>
      </nav>

      <div className="space-y-8">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={workflow.preview.src}
            alt={workflow.preview.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Chip>{FIELD_LABELS[workflow.field]}</Chip>
            <Chip>Updated: {new Date(workflow.updatedAt).toLocaleDateString("en-US")}</Chip>
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {workflow.title}
          </h1>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            {workflow.tagline}
          </p>
          <div className="mt-4">
            <WorkflowActions workflow={workflow} tools={tools} />
          </div>
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            What it does
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            {workflow.description}
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Steps
          </h2>
          <ol className="space-y-4">
            {steps.map((step, i) => {
              const tool = toolMap[step.toolSlug];
              return (
                <li key={step.toolSlug} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-sm font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <Link
                      href={`/tools/${step.toolSlug}`}
                      className="font-medium text-neutral-900 transition-colors hover:underline dark:text-neutral-100"
                    >
                      {step.title}
                    </Link>
                    {tool && (
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {tool.tagline}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {relatedTools.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Related tools
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageContainer>
  );
}
