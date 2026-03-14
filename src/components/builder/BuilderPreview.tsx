"use client";

import { useState } from "react";
import type { DesignSystemState } from "@/lib/builder/types";
import { BuilderPanel } from "./BuilderPanel";

interface BuilderPreviewProps {
  state: DesignSystemState;
}

const TABS = ["Foundations", "Components", "App UI", "Marketing"] as const;

const tabBaseClass =
  "px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2";
const tabActiveClass = "border-b-2 border-[var(--color-accent)] text-[var(--color-text)]";
const tabInactiveClass = "text-[var(--color-text-muted)] hover:text-[var(--color-text)]";

export function BuilderPreview({ state }: BuilderPreviewProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Foundations");
  const { colors, typography, spacing, radius, shadows } = state;
  const r = radius.medium;

  const previewStyle: React.CSSProperties = {
    fontFamily: typography.fontFamily,
    ["--preview-primary" as string]: colors.primary,
    ["--preview-secondary" as string]: colors.secondary,
    ["--preview-accent" as string]: colors.accent,
    ["--preview-success" as string]: colors.success,
    ["--preview-warning" as string]: colors.warning,
    ["--preview-danger" as string]: colors.danger,
    ["--preview-bg" as string]: colors.background,
    ["--preview-surface" as string]: colors.surface,
    ["--preview-text" as string]: colors.text,
    ["--preview-text-muted" as string]: colors.textMuted,
    ["--preview-border" as string]: colors.border,
    ["--preview-radius" as string]: `${r}px`,
    ["--preview-space-sm" as string]: `${spacing.sm}px`,
    ["--preview-space-md" as string]: `${spacing.md}px`,
    ["--preview-space-lg" as string]: `${spacing.lg}px`,
    ["--preview-shadow-subtle" as string]: shadows.subtle,
    ["--preview-shadow-medium" as string]: shadows.medium,
    ["--preview-shadow-strong" as string]: shadows.strong,
  };

  const sectionTitleClass = "mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]";
  const previewCardClass = "rounded-[var(--preview-radius)]";

  const header = (
    <div className="flex">
      {TABS.map((t) => (
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

  return (
    <BuilderPanel header={header} className="min-h-[420px]">
      <div
        className="min-h-[340px]"
        style={previewStyle}
      >
        {tab === "Foundations" && (
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className={sectionTitleClass}>Colors</h4>
              <div className="flex flex-wrap gap-3">
                {["primary", "secondary", "accent", "success", "warning", "danger"].map((k) => (
                  <div key={k} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`h-12 w-14 ${previewCardClass} ring-1 ring-black/5`}
                      style={{ backgroundColor: colors[k as keyof typeof colors] as string }}
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--preview-text-muted)]">{k}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className={sectionTitleClass}>Typography</h4>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>Heading</h3>
                <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
                  Body text with your chosen font. The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <h4 className={sectionTitleClass}>Spacing & Radius</h4>
              <div className="flex flex-wrap gap-4">
                <div className={`${previewCardClass} bg-neutral-100 px-3 py-2 dark:bg-neutral-800`}>
                  <span className="text-xs font-medium">xs</span>
                </div>
                <div className={`${previewCardClass} bg-neutral-100 px-5 py-3 dark:bg-neutral-800`}>
                  <span className="text-xs font-medium">sm</span>
                </div>
                <div className={`${previewCardClass} bg-neutral-100 px-6 py-4 dark:bg-neutral-800`}>
                  <span className="text-xs font-medium">md</span>
                </div>
                <div className={`${previewCardClass} bg-neutral-100 px-8 py-6 dark:bg-neutral-800`}>
                  <span className="text-xs font-medium">lg</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === "Components" && (
          <div className="space-y-8">
            <div>
              <h4 className={sectionTitleClass}>Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className={`${previewCardClass} px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90`}
                  style={{ backgroundColor: colors.primary }}
                >
                  Primary
                </button>
                <button
                  type="button"
                  className={`${previewCardClass} border-2 px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90`}
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Secondary
                </button>
                <button
                  type="button"
                  className={`${previewCardClass} px-5 py-2.5 text-sm font-medium text-white opacity-50`}
                  style={{ backgroundColor: colors.primary }}
                >
                  Disabled
                </button>
              </div>
            </div>
            <div>
              <h4 className={sectionTitleClass}>Inputs</h4>
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Placeholder"
                  className={`${previewCardClass} w-48 border px-3 py-2 text-sm`}
                  style={{ borderColor: colors.border }}
                />
                <select
                  className={`${previewCardClass} w-40 border px-3 py-2 text-sm`}
                  style={{ borderColor: colors.border }}
                >
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            <div>
              <h4 className={sectionTitleClass}>Cards & Badges</h4>
              <div className="flex flex-wrap gap-4">
                <div
                  className={`${previewCardClass} p-4`}
                  style={{ backgroundColor: colors.surface, boxShadow: shadows.medium }}
                >
                  <p className="text-sm font-medium" style={{ color: colors.text }}>Card title</p>
                  <p className="mt-1 text-xs" style={{ color: colors.textMuted }}>Supporting text</p>
                </div>
                <span
                  className={`${previewCardClass} inline-flex px-3 py-1 text-xs font-medium text-white`}
                  style={{ backgroundColor: colors.primary }}
                >
                  Badge
                </span>
              </div>
            </div>
          </div>
        )}
        {tab === "App UI" && (
          <div className="flex gap-4">
            <div
              className={`w-36 shrink-0 ${previewCardClass} p-3`}
              style={{ backgroundColor: colors.surface, boxShadow: shadows.subtle }}
            >
              <div className="mb-3 h-8 rounded px-2" style={{ backgroundColor: colors.primary, opacity: 0.2 }} />
              <nav className="space-y-1">
                {["Dashboard", "Projects", "Settings"].map((n) => (
                  <div
                    key={n}
                    className="rounded px-2 py-1.5 text-xs"
                    style={{ color: colors.textMuted, backgroundColor: "transparent" }}
                  >
                    {n}
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex-1 space-y-4">
              <div className={`h-10 ${previewCardClass}`} style={{ backgroundColor: colors.border, opacity: 0.3 }} />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`${previewCardClass} p-4`}
                    style={{ backgroundColor: colors.surface, boxShadow: shadows.subtle }}
                  >
                    <div className="h-4 w-2/3 rounded" style={{ backgroundColor: colors.border, opacity: 0.5 }} />
                    <div className="mt-2 h-3 w-full rounded" style={{ backgroundColor: colors.border, opacity: 0.3 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "Marketing" && (
          <div className="space-y-8">
            <div
              className={`${previewCardClass} p-10 text-center`}
              style={{ backgroundColor: colors.surface, boxShadow: shadows.subtle }}
            >
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>Hero headline</h2>
              <p className="mt-3 text-sm" style={{ color: colors.textMuted }}>Supporting copy that explains the value proposition.</p>
              <button
                type="button"
                className={`mt-6 ${previewCardClass} px-8 py-3 text-sm font-medium text-white`}
                style={{ backgroundColor: colors.primary }}
              >
                Get started
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`${previewCardClass} p-5`}
                  style={{ backgroundColor: colors.surface, boxShadow: shadows.subtle }}
                >
                  <div className="h-8 w-12 rounded" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                  <h3 className="mt-3 text-sm font-semibold" style={{ color: colors.text }}>Feature {i}</h3>
                  <p className="mt-1 text-xs" style={{ color: colors.textMuted }}>Supporting text</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BuilderPanel>
  );
}
