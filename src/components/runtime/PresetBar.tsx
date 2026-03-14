"use client";

import type { ToolPreset } from "@/types/runtime";

interface PresetBarProps {
  presets: ToolPreset[];
  activeId: string | null;
  onSelect: (id: string, inputs: Record<string, string | number>) => void;
}

export function PresetBar({ presets, activeId, onSelect }: PresetBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
        Presets:
      </span>
      {presets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => onSelect(preset.id, preset.inputs)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeId === preset.id
              ? "bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent)] dark:text-neutral-900"
              : "bg-[var(--color-surface-elevated)] text-neutral-600 hover:bg-[var(--color-border)] dark:text-neutral-400 dark:hover:bg-neutral-700"
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
