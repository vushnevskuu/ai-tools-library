import { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/explore/FilterBar";
import { SearchInput } from "@/components/explore/SearchInput";
import { ExploreSortSelect } from "@/components/explore/ExploreSortSelect";
import { ExploreToolsGrid } from "@/components/explore/ExploreToolsGrid";
import { getAllTools, getUniqueTestedWith } from "@/lib/data";

export default function ExplorePage() {
  const tools = getAllTools();
  const testedWithOptions = getUniqueTestedWith();

  return (
    <PageContainer className="py-6">
      <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-6 py-4 backdrop-blur-sm dark:bg-[var(--color-surface)]/95">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Explore
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <Suspense fallback={null}>
                <SearchInput />
              </Suspense>
              <Suspense fallback={null}>
                <ExploreSortSelect />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={null}>
            <FilterBar testedWithOptions={testedWithOptions} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />}>
        <ExploreToolsGrid tools={tools} />
      </Suspense>
    </PageContainer>
  );
}
