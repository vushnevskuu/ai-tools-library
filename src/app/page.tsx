import Link from "next/link";
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
