"use client";

import { useState } from "react";
import type { DesignSystemState } from "@/lib/builder/types";
import { toJSON, toCSS, toTailwind, toTokensStudio } from "@/lib/builder/formatters";
import { CopyButton } from "@/components/ui/CopyButton";
import { Button } from "@/components/ui/button";
import { BuilderPanel } from "./BuilderPanel";

interface ExportPanelProps {
  state: DesignSystemState;
  onReset: () => void;
}

const EXPORT_TABS = ["JSON", "CSS", "Tailwind", "Tokens Studio"] as const;

const tabBaseClass =
  "px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2";
const tabActiveClass = "border-b-2 border-[var(--color-accent)] text-[var(--color-text)]";
const tabInactiveClass = "text-[var(--color-text-muted)] hover:text-[var(--color-text)]";

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

  const header = (
    <div className="flex">
      {EXPORT_TABS.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTab(t)}
          className={`${tabBaseClass} ${tab === t ? tabActiveClass : tabInactiveClass}`}
        >
          {t}
        </button>
      ))}
    </div>
  );

  const footer = (
    <div className="flex flex-wrap gap-2">
      <CopyButton text={content} label="Copy" />
      <Button type="button" variant="outline" size="sm" onClick={download}>
        Download
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={onReset} className="text-[var(--color-text-muted)]">
        Reset
      </Button>
    </div>
  );

  return (
    <BuilderPanel header={header} footer={footer} className="min-h-[420px]">
      <div className="min-h-[280px] overflow-auto">
        <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-[var(--color-text-muted)]">
          {content}
        </pre>
      </div>
    </BuilderPanel>
  );
}
