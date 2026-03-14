"use client";

import { useState, useCallback } from "react";
import type { Tool } from "@/types";
import { buildPromptFromTemplate, extractPlaceholders } from "@/lib/runtime/promptBuilder";
import { CopyButton } from "@/components/ui/CopyButton";
import { loadToolState, saveToolState } from "@/lib/runtime/persistence";
import { useEffect } from "react";

interface PromptConfiguratorProps {
  tool: Tool;
}

function getToolContent(tool: Tool): string {
  return (
    tool.content.prompt ??
    tool.content.template ??
    tool.content.agent ??
    tool.content.rules ??
    tool.content.instructions ??
    ""
  );
}

export function PromptConfigurator({ tool }: PromptConfiguratorProps) {
  const content = getToolContent(tool);
  const placeholders = extractPlaceholders(content);

  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    placeholders.forEach((k) => {
      defaults[k] = "";
    });
    return defaults;
  });

  useEffect(() => {
    const saved = loadToolState(tool.slug);
    if (saved && typeof saved === "object") {
      setInputs((prev) => {
        const next = { ...prev };
        placeholders.forEach((k) => {
          const v = saved[k];
          if (v !== undefined && v !== null) {
            next[k] = String(v);
          }
        });
        return next;
      });
    }
  }, [tool.slug]);

  useEffect(() => {
    const hasValues = Object.values(inputs).some((v) => v.trim() !== "");
    if (hasValues) {
      saveToolState(tool.slug, inputs);
    }
  }, [tool.slug, inputs]);

  const handleChange = useCallback((key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const filledPrompt = buildPromptFromTemplate(tool, inputs);
  const hasPlaceholders = filledPrompt.includes("{{");

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
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
          <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Configure
          </h3>
          <div className="space-y-4">
            {placeholders.map((key) => (
              <div key={key}>
                <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                </label>
                <textarea
                  value={inputs[key] ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={`Enter ${key}...`}
                  rows={3}
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm dark:bg-neutral-900"
                />
              </div>
            ))}
          </div>
        </aside>

        <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Ready to use
            </h3>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={filledPrompt} label={hasPlaceholders ? "Copy (fill remaining)" : "Copy prompt"} />
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface-elevated)] dark:hover:bg-neutral-800"
              >
                Download .md
              </button>
            </div>
          </div>
          <pre className="flex-1 overflow-auto whitespace-pre-wrap break-words rounded-md bg-neutral-50 p-4 font-mono text-sm text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
            {filledPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
