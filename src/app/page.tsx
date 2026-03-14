import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { ToolCard } from "@/components/cards/ToolCard";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getAllTools, getToolsBySlugs, getAllCollections } from "@/lib/data";
import {
  HOMEPAGE_CORE_TOOL_SLUGS,
  HOMEPAGE_COLLECTION_SLUGS,
} from "@/config/homepage";

export default function HomePage() {
  const allTools = getAllTools();
  const coreTools = getToolsBySlugs([...HOMEPAGE_CORE_TOOL_SLUGS]);
  const allCollections = getAllCollections();
  const featuredCollectionSlugs = new Set<string>([...HOMEPAGE_COLLECTION_SLUGS]);
  const featuredCollections = allCollections.filter((c) =>
    featuredCollectionSlugs.has(c.slug)
  );

  return (
    <PageContainer>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
          AI tools for designers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          A curated library of prompts and templates — plus an interactive builder for design tokens.
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Effect first. Copy or export when ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/builders/design-system"
            className="inline-flex items-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            Open Design System Builder
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Explore the library
          </Link>
        </div>
      </section>

      {/* Builder spotlight */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Builder
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Interactive token editor. Colors, typography, spacing, radius, shadows. Export JSON, CSS, Tailwind, or Tokens Studio.
        </p>
        <Link
          href="/builders/design-system"
          className="mt-6 block overflow-hidden rounded-[var(--radius-lg)] border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-md transition-all duration-[var(--transition-base)] hover:border-[var(--color-border-strong)] hover:shadow-lg dark:bg-[var(--color-surface-elevated)]"
        >
          <div className="relative aspect-[21/9] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src="/previews/design-system-builder.svg"
              alt="Design System Builder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
          <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Design System Builder
              </h3>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                Full token system with semantic layers, component previews, and multiple export formats.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white sm:mt-0 dark:bg-neutral-100 dark:text-neutral-900">
              Open builder →
            </span>
          </div>
        </Link>
      </section>

      {/* Core tools */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Core tools
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          A focused set of high-utility AI tools for design work.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Selected collections */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Selected collections
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Curated sets for everyday workflows.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCollections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>

      {/* Library CTA */}
      <section className="py-16 sm:py-20">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 text-center dark:bg-[var(--color-surface-elevated)] sm:px-12">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Explore the full library
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            View all {allTools.length} tools — prompts, templates, and workflows.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-flex items-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            View all {allTools.length} tools
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
