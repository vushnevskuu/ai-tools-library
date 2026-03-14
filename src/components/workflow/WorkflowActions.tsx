"use client";

import Link from "next/link";
import type { Workflow } from "@/types";
import type { Tool } from "@/types";
import { getWorkflowGitHubPath } from "@/lib/github";
import { ExternalLink, Download } from "lucide-react";

interface WorkflowActionsProps {
  workflow: Workflow;
  tools: Tool[];
}

function getWorkflowPackContent(workflow: Workflow, tools: Tool[]): string {
  const toolMap = Object.fromEntries(tools.map((t) => [t.slug, t]));
  const lines: string[] = [
    `# ${workflow.title}`,
    "",
    workflow.tagline,
    "",
    "---",
    "",
    "## Steps",
    "",
  ];
  workflow.steps
    .sort((a, b) => a.order - b.order)
    .forEach((step, i) => {
      const tool = toolMap[step.toolSlug];
      const content = tool
        ? (tool.content.prompt ?? tool.content.template ?? tool.content.agent ?? tool.content.rules ?? tool.content.instructions ?? "")
        : "";
      lines.push(`### ${i + 1}. ${step.title}`, "", "```", content, "```", "");
    });
  return lines.join("\n");
}

export function WorkflowActions({ workflow, tools }: WorkflowActionsProps) {
  const content = getWorkflowPackContent(workflow, tools);
  const githubUrl = getWorkflowGitHubPath(workflow.slug);
  const filename = `${workflow.slug}-workflow.md`;

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
        Download workflow pack
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
