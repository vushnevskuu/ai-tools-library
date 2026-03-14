"use client";

import type { DesignSystemState } from "@/lib/builder/types";

interface BuilderControlsProps {
  state: DesignSystemState;
  onChange: (updates: Partial<DesignSystemState>) => void;
}

const FONTS = ["Inter", "Geist", "system-ui", "Georgia", "JetBrains Mono"];
const DENSITIES = ["compact", "regular", "comfortable"] as const;
const RADIUS_PRESETS = ["none", "small", "medium", "large", "pill"] as const;
const EASINGS = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group" open>
      <summary className="cursor-pointer list-none py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {title}
      </summary>
      <div className="space-y-3 pb-4">{children}</div>
    </details>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{children}</label>;
}

export function BuilderControls({ state, onChange }: BuilderControlsProps) {
  const { brand, colors, typography, spacing, radius, shadows, borders, motion } = state;

  return (
    <aside className="flex max-h-[calc(100vh-12rem)] flex-col gap-2 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
      <Section title="Brand">
        <div>
          <Label>System name</Label>
          <input
            type="text"
            value={brand.systemName}
            onChange={(e) => onChange({ brand: { ...brand, systemName: e.target.value } })}
            className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1.5 text-sm dark:bg-neutral-900"
          />
        </div>
        <div>
          <Label>Product type</Label>
          <input
            type="text"
            value={brand.productType}
            onChange={(e) => onChange({ brand: { ...brand, productType: e.target.value } })}
            className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1.5 text-sm dark:bg-neutral-900"
          />
        </div>
        <div>
          <Label>Density</Label>
          <select
            value={brand.density}
            onChange={(e) => onChange({ brand: { ...brand, density: e.target.value as typeof brand.density } })}
            className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1.5 text-sm dark:bg-neutral-900"
          >
            {DENSITIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Mode</Label>
          <select
            value={brand.mode}
            onChange={(e) => onChange({ brand: { ...brand, mode: e.target.value as "light" | "dark" } })}
            className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1.5 text-sm dark:bg-neutral-900"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </Section>

      <Section title="Colors">
        {(["primary", "secondary", "accent", "success", "warning", "danger", "background", "surface", "text", "textMuted", "border"] as const).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="color"
              value={colors[key] as string}
              onChange={(e) => onChange({ colors: { ...colors, [key]: e.target.value } })}
              className="h-8 w-10 shrink-0 cursor-pointer rounded border border-[var(--color-border)]"
            />
            <input
              type="text"
              value={colors[key] as string}
              onChange={(e) => onChange({ colors: { ...colors, [key]: e.target.value } })}
              className="min-w-0 flex-1 rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-xs dark:bg-neutral-900"
            />
          </div>
        ))}
      </Section>

      <Section title="Typography">
        <div>
          <Label>Font family</Label>
          <select
            value={typography.fontFamily.split(",")[0]}
            onChange={(e) => onChange({ typography: { ...typography, fontFamily: `${e.target.value}, system-ui, sans-serif` } })}
            className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1.5 text-sm dark:bg-neutral-900"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </Section>

      <Section title="Spacing">
        {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((key) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <Label>{key}</Label>
            <input
              type="number"
              min={0}
              value={spacing[key]}
              onChange={(e) => onChange({ spacing: { ...spacing, [key]: Number(e.target.value) || 0 } })}
              className="w-16 rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-xs dark:bg-neutral-900"
            />
          </div>
        ))}
      </Section>

      <Section title="Radius">
        {RADIUS_PRESETS.map((key) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <Label>{key}</Label>
            <input
              type="number"
              min={0}
              value={radius[key]}
              onChange={(e) => onChange({ radius: { ...radius, [key]: Number(e.target.value) || 0 } })}
              className="w-16 rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-xs dark:bg-neutral-900"
            />
          </div>
        ))}
      </Section>

      <details className="group">
        <summary className="cursor-pointer list-none py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Advanced
        </summary>
        <div className="space-y-3 pb-4 pt-2">
          <Section title="Shadows">
            <div>
              <Label>Subtle</Label>
              <input
                type="text"
                value={shadows.subtle}
                onChange={(e) => onChange({ shadows: { ...shadows, subtle: e.target.value } })}
                className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-xs dark:bg-neutral-900"
              />
            </div>
            <div>
              <Label>Medium</Label>
              <input
                type="text"
                value={shadows.medium}
                onChange={(e) => onChange({ shadows: { ...shadows, medium: e.target.value } })}
                className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-xs dark:bg-neutral-900"
              />
            </div>
            <div>
              <Label>Strong</Label>
              <input
                type="text"
                value={shadows.strong}
                onChange={(e) => onChange({ shadows: { ...shadows, strong: e.target.value } })}
                className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-xs dark:bg-neutral-900"
              />
            </div>
          </Section>
          <Section title="Borders">
            <div>
              <Label>Width</Label>
              <input
                type="number"
                min={0}
                value={borders.width}
                onChange={(e) => onChange({ borders: { ...borders, width: Number(e.target.value) || 0 } })}
                className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-sm dark:bg-neutral-900"
              />
            </div>
          </Section>
          <Section title="Motion">
            <div>
              <Label>Fast (ms)</Label>
              <input
                type="number"
                min={0}
                value={motion.fast}
                onChange={(e) => onChange({ motion: { ...motion, fast: Number(e.target.value) || 0 } })}
                className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1 text-sm dark:bg-neutral-900"
              />
            </div>
            <div>
              <Label>Easing</Label>
              <select
                value={motion.easing}
                onChange={(e) => onChange({ motion: { ...motion, easing: e.target.value as typeof motion.easing } })}
                className="mt-1 w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1.5 text-sm dark:bg-neutral-900"
              >
                {EASINGS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
          </Section>
        </div>
      </details>
    </aside>
  );
}
