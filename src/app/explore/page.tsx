import { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/explore/FilterBar";
import { SearchInput } from "@/components/explore/SearchInput";
import { ToolCard } from "@/components/cards/ToolCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getFilteredTools } from "@/lib/data";

interface ExplorePageProps {
  searchParams: Promise<{ field?: string; task?: string; format?: string; search?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const tools = getFilteredTools({
    field: params.field ?? undefined,
    task: params.task ?? undefined,
    format: params.format ?? undefined,
    search: params.search ?? undefined,
  });

  return (
    <PageContainer className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Explore
        </h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Browse the full catalog of AI tools for designers
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-6">
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
        <FilterBar />
      </div>

      {tools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tools match your filters"
          description="Try adjusting filters or search query."
        />
      )}
    </PageContainer>
  );
}
