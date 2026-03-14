import { notFound } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { ToolHero } from "@/components/tool/ToolHero";
import { ToolMetadata } from "@/components/tool/ToolMetadata";
import { ToolContentTabs } from "@/components/tool/ToolContentTabs";
import { RelatedTools } from "@/components/tool/RelatedTools";
import { RelatedWorkflows } from "@/components/tool/RelatedWorkflows";
import {
  getToolBySlug,
  getToolsBySlugs,
  getWorkflowsBySlugs,
} from "@/lib/data";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = tool.relatedTools
    ? getToolsBySlugs(tool.relatedTools)
    : [];
  const relatedWorkflows = tool.relatedWorkflows
    ? getWorkflowsBySlugs(tool.relatedWorkflows)
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
        <ToolHero tool={tool} />
        <ToolMetadata tool={tool} />

        <section>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            What it does
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            {tool.description}
          </p>
        </section>

        {tool.useCases.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Best use cases
            </h2>
            <ul className="list-inside list-disc space-y-1 text-neutral-600 dark:text-neutral-400">
              {tool.useCases.map((uc) => (
                <li key={uc}>{uc}</li>
              ))}
            </ul>
          </section>
        )}

        {tool.inputRequirements && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Input requirements
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              {tool.inputRequirements}
            </p>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Copy & use
          </h2>
          <ToolContentTabs tool={tool} />
        </section>

        {tool.limitations && tool.limitations.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Limitations
            </h2>
            <ul className="list-inside list-disc space-y-1 text-neutral-600 dark:text-neutral-400">
              {tool.limitations.map((lim) => (
                <li key={lim}>{lim}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="space-y-12 pt-8">
          <RelatedTools tools={relatedTools} />
          <RelatedWorkflows workflows={relatedWorkflows} />
        </div>
      </div>
    </PageContainer>
  );
}
