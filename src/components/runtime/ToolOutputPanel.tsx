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

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Ready to use
        </h3>
        <CopyButton text={filledPrompt} label={copyLabel} />
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
