"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Tool } from "@/types";
import { ToolCard } from "@/components/cards/ToolCard";
import { EmptyState } from "@/components/ui/EmptyState";

interface ExploreToolsGridProps {
  tools: Tool[];
}

export function ExploreToolsGrid({ tools }: ExploreToolsGridProps) {
  const searchParams = useSearchParams();
  const field = searchParams.get("field") ?? undefined;
  const task = searchParams.get("task") ?? undefined;
  const format = searchParams.get("format") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const filteredTools = useMemo(() => {
    let result = tools;

    if (field) {
      result = result.filter((t) => t.field === field);
    }
    if (task) {
      result = result.filter((t) => t.tasks.includes(task as Tool["tasks"][number]));
    }
    if (format) {
      result = result.filter((t) => t.format === format);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.useCases.some((u) => u.toLowerCase().includes(q))
      );
    }

    return result;
  }, [tools, field, task, format, search]);

  if (filteredTools.length === 0) {
    return (
      <EmptyState
        title="No tools match your filters"
        description="Try adjusting filters or search query."
      />
    );
  }

  return (
    <div className="columns-2 gap-6 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
      {filteredTools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
