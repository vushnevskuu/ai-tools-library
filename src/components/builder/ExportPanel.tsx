"use client";

import { useState } from "react";
import type { DesignSystemState } from "@/lib/builder/types";
import { toJSON, toCSS, toTailwind, toTokensStudio } from "@/lib/builder/formatters";
import { CopyButton } from "@/components/ui/CopyButton";

interface ExportPanelProps {
  state: DesignSystemState;
  onReset: () => void;
}

const EXPORT_TABS = ["JSON", "CSS", "Tailwind", "Tokens Studio"] as const;

export function ExportPanel({ state, onReset }: ExportPanelProps) {
  const [tab, setTab] = useState<(typeof EXPORT_TABS)[number]>("JSON");

  const getContent = () => {
    switch (tab) {
      case "JSON":
        return toJSON(state);
      case "CSS":
        return toCSS(state);
      case "Tailwind":
        return toTailwind(state);
      case "Tokens Studio":
        return toTokensStudio(state);
      default:
        return "";
    }
  };

  const getFilename = () => {
    const base = state.brand.systemName.replace(/\s+/g, "-").toLowerCase();
    switch (tab) {
      case "JSON":
        return `${base}-tokens.json`;
      case "CSS":
        return `${base}-variables.css`;
      case "Tailwind":
        return `tailwind-theme.js`;
      case "Tokens Studio":
        return `${base}-tokens-studio.json`;
      default:
        return "export.txt";
    }
  };

  const download = () => {
    const content = getContent();
    const blob = new Blob([content], { type: tab === "JSON" || tab === "Tokens Studio" ? "application/json" : "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = getFilename();
    a.click();
    URL.revokeObjectURL(url);
  };

  const content = getContent();

  return (
    <aside className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-elevated)]">
      <div className="flex border-b border-[var(--color-border)]">
        {EXPORT_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs font-medium transition-colors ${
              tab === t
                ? "border-b-2 border-[var(--color-accent)] text-[var(--color-text)]"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-3">
        <pre className="whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {content}
        </pre>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-[var(--color-border)] p-3">
        <CopyButton text={content} label="Copy" />
        <button
          type="button"
          onClick={download}
          className="rounded border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Download
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
