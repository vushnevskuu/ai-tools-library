import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/explore/FilterBar";
import { ToolCard } from "@/components/cards/ToolCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getToolsByField } from "@/lib/data";
import { FIELD_LABELS } from "@/lib/constants";
import { FIELDS } from "@/types";

export function generateStaticParams() {
  return FIELDS.map((category) => ({ category }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const validCategory = FIELDS.includes(category as (typeof FIELDS)[number]);

  if (!validCategory) {
    notFound();
  }

  const tools = getToolsByField(category);

  return (
    <PageContainer className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {FIELD_LABELS[category as keyof typeof FIELD_LABELS]}
        </h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          {tools.length} tools in this category
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={null}>
          <FilterBar category={category} />
        </Suspense>
      </div>

      {tools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tools in this category yet"
          description="Check back later or explore other categories."
        />
      )}
    </PageContainer>
  );
}
