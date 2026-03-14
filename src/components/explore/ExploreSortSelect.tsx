"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/constants";

export function ExploreSortSelect() {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "newest";

  const buildUrl = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    return `/explore${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        Sort
      </span>
      {SORT_OPTIONS.map((opt) => (
        <Link
          key={opt.value}
          href={buildUrl(opt.value)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
            currentSort === opt.value
              ? "bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent)] dark:text-neutral-900"
              : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          }`}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}
