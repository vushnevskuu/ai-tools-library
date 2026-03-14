"use client";

import type { Tool } from "@/types";
import type { ToolRuntimeConfig } from "@/types/runtime";
import { CopyButton } from "@/components/ui/CopyButton";

interface ToolOutputPanelProps {
  tool: Tool;
  runtime: ToolRuntimeConfig;
  inputs: Record<string, string | number>;
  filledPrompt: string;
}

export function ToolOutputPanel({
  tool,
  runtime,
  filledPrompt,
}: ToolOutputPanelProps) {
  const hasPlaceholders = filledPrompt.includes("{{");
  const copyLabel = hasPlaceholders ? "Copy (fill remaining)" : "Copy prompt";

  const handleDownload = () => {
    const body = `# ${tool.title}\n\n${tool.tagline}\n\n---\n\n## Prompt\n\n${filledPrompt}`;
    const blob = new Blob([body], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Ready to use
        </h3>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={filledPrompt} label={copyLabel} />
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface-elevated)] dark:hover:bg-neutral-800"
          >
            Download .md
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <pre className="whitespace-pre-wrap break-words rounded-md bg-neutral-50 p-4 font-mono text-sm text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          {filledPrompt}
        </pre>
      </div>

      {tool.outputExample && (
        <div className="border-t border-[var(--color-border)] pt-4">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Expected output format
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {tool.outputExample}
          </p>
        </div>
      )}
    </div>
  );
}
