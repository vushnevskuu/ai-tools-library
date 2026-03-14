interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search query.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-16 dark:border-neutral-700">
      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {title}
      </p>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}
