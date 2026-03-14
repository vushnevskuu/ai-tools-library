"use client";

import { useState } from "react";
import type { DesignSystemState } from "@/lib/builder/types";

interface BuilderPreviewProps {
  state: DesignSystemState;
}

const TABS = ["Foundations", "Components", "App UI", "Marketing"] as const;

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
    ["--preview-shadow" as string]: shadows.medium,
  };

  return (
    <main className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-elevated)]">
      <div className="flex border-b border-[var(--color-border)]">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "border-b-2 border-[var(--color-accent)] text-[var(--color-text)]"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="min-h-[360px] flex-1 p-6" style={previewStyle}>
        {tab === "Foundations" && (
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Colors</h4>
              <div className="flex flex-wrap gap-2">
                {["primary", "secondary", "accent", "success", "warning", "danger"].map((k) => (
                  <div
                    key={k}
                    className="h-10 w-16 rounded-[var(--preview-radius)]"
                    style={{ backgroundColor: colors[k as keyof typeof colors] as string }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Typography</h4>
              <div className="space-y-1">
                <h3 style={{ color: colors.primary }}>Heading</h3>
                <p className="text-sm" style={{ color: colors.textMuted }}>Body text with chosen font and scale.</p>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Spacing & Radius</h4>
              <div className="flex gap-2">
                <div className="rounded-[var(--preview-radius)] bg-neutral-100 p-2 dark:bg-neutral-800">xs</div>
                <div className="rounded-[var(--preview-radius)] bg-neutral-100 p-4 dark:bg-neutral-800">md</div>
                <div className="rounded-[var(--preview-radius)] bg-neutral-100 p-6 dark:bg-neutral-800">lg</div>
              </div>
            </div>
          </div>
        )}
        {tab === "Components" && (
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Buttons</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-[var(--preview-radius)] px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  Primary
                </button>
                <button
                  type="button"
                  className="rounded-[var(--preview-radius)] border px-4 py-2 text-sm font-medium"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Secondary
                </button>
                <button
                  type="button"
                  className="rounded-[var(--preview-radius)] px-4 py-2 text-sm font-medium opacity-50"
                  style={{ backgroundColor: colors.primary, color: "white" }}
                >
                  Disabled
                </button>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Inputs</h4>
              <input
                type="text"
                placeholder="Placeholder"
                className="w-full max-w-xs rounded-[var(--preview-radius)] border px-3 py-2 text-sm"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">Cards & Badges</h4>
              <div className="flex flex-wrap gap-2">
                <div
                  className="rounded-[var(--preview-radius)] p-4"
                  style={{ backgroundColor: colors.surface, boxShadow: shadows.medium }}
                >
                  Card
                </div>
                <span
                  className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
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
              className="w-32 shrink-0 rounded-[var(--preview-radius)] p-2"
              style={{ backgroundColor: colors.surface }}
            >
              <div className="mb-2 h-6 rounded" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
              <div className="space-y-1">
                {["Nav 1", "Nav 2", "Nav 3"].map((n) => (
                  <div key={n} className="h-6 rounded text-xs" style={{ backgroundColor: colors.border, opacity: 0.5 }} />
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-8 rounded-[var(--preview-radius)]" style={{ backgroundColor: colors.border, opacity: 0.5 }} />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-[var(--preview-radius)] p-4"
                    style={{ backgroundColor: colors.surface, boxShadow: shadows.subtle }}
                  >
                    Card {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "Marketing" && (
          <div className="space-y-6">
            <div
              className="rounded-[var(--preview-radius)] p-8 text-center"
              style={{ backgroundColor: colors.surface }}
            >
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>Hero headline</h2>
              <p className="mt-2 text-sm" style={{ color: colors.textMuted }}>Supporting copy</p>
              <button
                type="button"
                className="mt-4 rounded-[var(--preview-radius)] px-6 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: colors.primary }}
              >
                CTA
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[var(--preview-radius)] p-4"
                  style={{ backgroundColor: colors.surface, boxShadow: shadows.subtle }}
                >
                  Feature {i}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
