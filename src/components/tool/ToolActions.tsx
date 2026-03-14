"use client";

import Link from "next/link";
import type { Tool } from "@/types";
import { getToolGitHubPath } from "@/lib/github";
import { ExternalLink, Download } from "lucide-react";

interface ToolActionsProps {
  tool: Tool;
}

function getContentForDownload(tool: Tool): string {
  const { content } = tool;
  const body =
    content.prompt ??
    content.agent ??
    content.template ??
    content.rules ??
    content.instructions ??
    "";
  const format = content.prompt ? "prompt" : content.template ? "template" : "content";
  return `# ${tool.title}\n\n${tool.tagline}\n\n---\n\n## ${format}\n\n${body}`;
}

export function ToolActions({ tool }: ToolActionsProps) {
  const content = getContentForDownload(tool);
  const githubUrl = getToolGitHubPath(tool.slug);
  const filename = `${tool.slug}.md`;

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
        Download .md
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
