"use client";

import Link from "next/link";
import type { Collection } from "@/types";
import type { Tool } from "@/types";
import { getCollectionGitHubPath } from "@/lib/github";
import { ExternalLink, Download } from "lucide-react";

interface CollectionActionsProps {
  collection: Collection;
  tools: Tool[];
}

function getCollectionPackContent(collection: Collection, tools: Tool[]): string {
  const lines: string[] = [
    `# ${collection.title}`,
    "",
    collection.tagline,
    "",
    "---",
    "",
    "## Tools in this collection",
    "",
  ];
  tools.forEach((tool) => {
    const content =
      tool.content.prompt ??
      tool.content.template ??
      tool.content.agent ??
      tool.content.rules ??
      tool.content.instructions ??
      "";
    lines.push(`### ${tool.title}`, "", tool.tagline, "", "```", content, "```", "");
  });
  return lines.join("\n");
}

export function CollectionActions({ collection, tools }: CollectionActionsProps) {
  const content = getCollectionPackContent(collection, tools);
  const githubUrl = getCollectionGitHubPath(collection.slug);
  const filename = `${collection.slug}-collection.md`;

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface-elevated)] dark:hover:bg-neutral-800"
      >
        <Download className="size-4" />
        Download collection pack
      </button>
      <Link
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface-elevated)] dark:hover:bg-neutral-800"
      >
        <ExternalLink className="size-4" />
        View on GitHub
      </Link>
    </div>
  );
}
