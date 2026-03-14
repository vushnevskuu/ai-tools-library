"use client";

import { useState } from "react";
import type { Tool } from "@/types";
import { CopyButton } from "@/components/ui/CopyButton";

interface ToolContentTabsProps {
  tool: Tool;
}

const TAB_LABELS: Record<string, string> = {
  prompt: "Prompt",
  agent: "Agent",
  template: "Template",
  rules: "Rules",
  instructions: "Instructions",
};

export function ToolContentTabs({ tool }: ToolContentTabsProps) {
  const content = tool.content;
  const tabs = (
    ["prompt", "agent", "template", "rules", "instructions"] as const
  ).filter((key) => content[key]);

  const [activeTab, setActiveTab] = useState(tabs[0] ?? "prompt");
  const activeContent = content[activeTab] ?? "";

  if (tabs.length === 0) return null;
  if (tabs.length === 1) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {TAB_LABELS[tabs[0]]}
        </h3>
        <div className="relative">
          <pre className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-800">
            <code className="whitespace-pre-wrap">{activeContent}</code>
          </pre>
          <div className="absolute right-2 top-2">
            <CopyButton text={activeContent} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-800">
          <code className="whitespace-pre-wrap">{activeContent}</code>
        </pre>
        <div className="absolute right-2 top-2">
          <CopyButton text={activeContent} />
        </div>
      </div>
    </div>
  );
}
