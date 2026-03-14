import { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/explore/FilterBar";
import { SearchInput } from "@/components/explore/SearchInput";
import { ExploreToolsGrid } from "@/components/explore/ExploreToolsGrid";
import { getAllTools } from "@/lib/data";

export default function ExplorePage() {
  const tools = getAllTools();

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
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />}>
        <ExploreToolsGrid tools={tools} />
      </Suspense>
    </PageContainer>
  );
}
