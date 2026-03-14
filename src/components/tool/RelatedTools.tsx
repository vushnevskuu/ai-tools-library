import type { Tool } from "@/types";
import { ToolCard } from "@/components/cards/ToolCard";

interface RelatedToolsProps {
  tools: Tool[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Related tools
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
