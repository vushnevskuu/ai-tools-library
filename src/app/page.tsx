import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { ToolCard } from "@/components/cards/ToolCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getAllTools, getAllCollections } from "@/lib/data";
import { FIELDS } from "@/types";

export default function HomePage() {
  const tools = getAllTools();
  const featuredTools = tools.slice(0, 6);

  const toolCountByField = FIELDS.reduce(
    (acc, field) => {
      acc[field] = tools.filter((t) => t.field === field).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <PageContainer>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
          AI tools for designers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          A free, curated library of working prompts, agents, and templates.
          See the effect first, understand the use case, then copy.
        </p>
        <Link
          href="/explore"
          className="mt-8 inline-flex items-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          Explore tools
        </Link>
      </section>

      {/* Builders */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Builders
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Interactive utilities for daily design work
        </p>
        <Link
          href="/builders/design-system"
          className="mt-6 block overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all duration-[var(--transition-base)] hover:border-[var(--color-border-strong)] hover:shadow-lg dark:bg-[var(--color-surface-elevated)]"
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
                Create tokens, export JSON, CSS, Tailwind — one source of truth.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-neutral-600 sm:mt-0 dark:text-neutral-400">
              Open Design System Builder →
            </span>
          </div>
        </Link>
        <Link
          href="/builders"
          className="mt-4 inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          View all builders →
        </Link>
      </section>

      {/* Featured tools */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Featured tools
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Start with these daily-use assets
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <Link
          href="/explore"
          className="mt-8 inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          View all tools →
        </Link>
      </section>

      {/* Browse by field */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Browse by field
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Find tools by design discipline
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FIELDS.map((slug) => (
            <CategoryCard
              key={slug}
              slug={slug}
              toolCount={toolCountByField[slug] ?? 0}
            />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Collections
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Curated groupings for specific workflows
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getAllCollections().map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
