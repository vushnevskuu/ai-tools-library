"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FIELD_LABELS, TASK_LABELS, FORMAT_LABELS } from "@/lib/constants";
import { CATEGORIES } from "@/lib/constants";
import type { Field, Task, Format } from "@/types";

interface FilterBarProps {
  className?: string;
  /** When on category page, pass the category to show as selected */
  category?: string;
}

export function FilterBar({ className = "", category }: FilterBarProps) {
  const searchParams = useSearchParams();
  const currentField = category ?? searchParams.get("field");
  const currentTask = searchParams.get("task");
  const currentFormat = searchParams.get("format");

  const buildUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    return `/explore${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Field
        </span>
        <div className="flex flex-wrap gap-1">
          <Link
            href={buildUrl({ field: null })}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !currentField
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((slug) => (
            <Link
              key={slug}
              href={buildUrl({ field: slug })}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                currentField === slug
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {FIELD_LABELS[slug as Field]}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Task
        </span>
        <div className="flex flex-wrap gap-1">
          <Link
            href={buildUrl({ task: null })}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !currentTask
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            }`}
          >
            All
          </Link>
          {(Object.keys(TASK_LABELS) as Task[]).map((slug) => (
            <Link
              key={slug}
              href={buildUrl({ task: slug })}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                currentTask === slug
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {TASK_LABELS[slug]}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Format
        </span>
        <div className="flex flex-wrap gap-1">
          <Link
            href={buildUrl({ format: null })}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !currentFormat
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            }`}
          >
            All
          </Link>
          {(Object.keys(FORMAT_LABELS) as Format[]).map((slug) => (
            <Link
              key={slug}
              href={buildUrl({ format: slug })}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                currentFormat === slug
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {FORMAT_LABELS[slug]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
