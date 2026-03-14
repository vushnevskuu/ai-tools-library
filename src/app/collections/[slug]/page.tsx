import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { Chip } from "@/components/ui/Chip";
import { ToolCard } from "@/components/cards/ToolCard";
import { CollectionActions } from "@/components/collection/CollectionActions";
import { WorkflowCard } from "@/components/cards/WorkflowCard";
import {
  getCollectionBySlug,
  getToolsBySlugs,
  getWorkflowsBySlugs,
} from "@/lib/data";
import { FIELD_LABELS } from "@/lib/constants";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const { collections } = require("@/content/collections");
  return collections.map((c: { slug: string }) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.tagline,
    openGraph: {
      title: collection.title,
      description: collection.tagline,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const tools = getToolsBySlugs(collection.toolSlugs);
  const workflows = collection.workflowSlugs
    ? getWorkflowsBySlugs(collection.workflowSlugs)
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
            src={collection.preview.src}
            alt={collection.preview.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        <div>
          {collection.field && (
            <div className="mb-2">
              <Chip>{FIELD_LABELS[collection.field]}</Chip>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {collection.title}
          </h1>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            {collection.tagline}
          </p>
          <div className="mt-4">
            <CollectionActions collection={collection} tools={tools} />
          </div>
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            About this collection
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            {collection.description}
          </p>
        </section>

        {tools.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Tools ({tools.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {workflows.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Workflows ({workflows.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <WorkflowCard key={workflow.slug} workflow={workflow} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageContainer>
  );
}
