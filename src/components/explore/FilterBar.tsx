"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FIELD_LABELS, TASK_LABELS, FORMAT_LABELS, INTERACTION_MODE_LABELS } from "@/lib/constants";
import { VISIBLE_FIELDS } from "@/config/homepage";
import type { Field, Task, Format } from "@/types";
import type { InteractionMode } from "@/types/runtime";

interface FilterBarProps {
  className?: string;
  /** When on category page, pass the category to show as selected */
  category?: string;
  testedWithOptions?: string[];
  showInteractionMode?: boolean;
}

const INTERACTION_MODES: InteractionMode[] = ["interactive", "builder", "static"];

export function FilterBar({ className = "", category, testedWithOptions = [], showInteractionMode = true }: FilterBarProps) {
  const searchParams = useSearchParams();
  const currentField = category ?? searchParams.get("field");
  const currentTask = searchParams.get("task");
  const currentFormat = searchParams.get("format");
  const currentTested = searchParams.get("tested");
  const currentMode = searchParams.get("mode");

  const buildUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("field", category);
    }
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
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Field
        </span>
        <div className="flex flex-wrap gap-1.5">
          <Link
            href={buildUrl({ field: null })}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-[var(--transition-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
              !currentField
                ? "bg-[var(--color-accent)] text-white hover:opacity-90 dark:bg-[var(--color-accent)] dark:text-neutral-900 dark:hover:opacity-90"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
            }`}
          >
            All
          </Link>
          {VISIBLE_FIELDS.map((slug) => (
            <Link
              key={slug}
              href={buildUrl({ field: slug })}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-[var(--transition-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
              currentField === slug
                ? "bg-[var(--color-accent)] text-white hover:opacity-90 dark:bg-[var(--color-accent)] dark:text-neutral-900 dark:hover:opacity-90"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
              }`}
            >
              {FIELD_LABELS[slug as Field]}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Task
        </span>
        <div className="flex flex-wrap gap-1">
          <Link
            href={buildUrl({ task: null })}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-[var(--transition-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
              !currentTask
                ? "bg-[var(--color-accent)] text-white hover:opacity-90 dark:bg-[var(--color-accent)] dark:text-neutral-900 dark:hover:opacity-90"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
            }`}
          >
            All
          </Link>
          {(Object.keys(TASK_LABELS) as Task[]).map((slug) => (
            <Link
              key={slug}
              href={buildUrl({ task: slug })}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-[var(--transition-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                currentTask === slug
                  ? "bg-[var(--color-accent)] text-white hover:opacity-90 dark:bg-[var(--color-accent)] dark:text-neutral-900 dark:hover:opacity-90"
                  : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
              }`}
            >
              {TASK_LABELS[slug]}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Format
        </span>
        <div className="flex flex-wrap gap-1">
          <Link
            href={buildUrl({ format: null })}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-[var(--transition-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
              !currentFormat
                ? "bg-[var(--color-accent)] text-white hover:opacity-90 dark:bg-[var(--color-accent)] dark:text-neutral-900 dark:hover:opacity-90"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
            }`}
          >
            All
          </Link>
          {(Object.keys(FORMAT_LABELS) as Format[]).map((slug) => (
            <Link
              key={slug}
              href={buildUrl({ format: slug })}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-[var(--transition-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                currentFormat === slug
                  ? "bg-[var(--color-accent)] text-white hover:opacity-90 dark:bg-[var(--color-accent)] dark:text-neutral-900 dark:hover:opacity-90"
                  : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
              }`}
            >
              {FORMAT_LABELS[slug]}
            </Link>
          ))}
        </div>
      </div>

      {showInteractionMode && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Mode
          </span>
          <div className="flex flex-wrap gap-1.5">
            <Link
              href={buildUrl({ mode: null })}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                !currentMode
                  ? "bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent)] dark:text-neutral-900"
                  : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
              }`}
            >
              All
            </Link>
            {INTERACTION_MODES.map((m) => (
              <Link
                key={m}
                href={buildUrl({ mode: m })}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                  currentMode === m
                    ? "bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent)] dark:text-neutral-900"
                    : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
                }`}
              >
                {INTERACTION_MODE_LABELS[m] ?? m}
              </Link>
            ))}
          </div>
        </div>
      )}
      {testedWithOptions.length > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Tested with
          </span>
          <div className="flex flex-wrap gap-1">
            <Link
              href={buildUrl({ tested: null })}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                !currentTested
                  ? "bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent)] dark:text-neutral-900"
                  : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
              }`}
            >
              All
            </Link>
            {testedWithOptions.map((v) => (
              <Link
                key={v}
                href={buildUrl({ tested: v })}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                  currentTested === v
                    ? "bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent)] dark:text-neutral-900"
                    : "bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border)]"
                }`}
              >
                {v}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
