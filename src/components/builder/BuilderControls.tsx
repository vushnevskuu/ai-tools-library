"use client";

import type { DesignSystemState } from "@/lib/builder/types";
import { BuilderPanel } from "./BuilderPanel";

interface BuilderControlsProps {
  state: DesignSystemState;
  onChange: (updates: Partial<DesignSystemState>) => void;
}

const FONTS = ["Inter", "Geist", "system-ui", "Georgia", "JetBrains Mono"];
const DENSITIES = ["compact", "regular", "comfortable"] as const;
const RADIUS_PRESETS = ["none", "small", "medium", "large", "pill"] as const;
const EASINGS = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"] as const;

const inputClass =
  "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm transition-colors focus:border-[var(--color-border-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--color-border-strong)] dark:bg-neutral-900";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-[var(--color-border)] last:border-0" open>
      <summary className="cursor-pointer list-none py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
        {title}
      </summary>
      <div className="space-y-4 pb-4 pt-1">{children}</div>
    </details>
  );
}

export function BuilderControls({ state, onChange }: BuilderControlsProps) {
  const { brand, colors, typography, spacing, radius, shadows, borders, motion } = state;

  return (
    <BuilderPanel scrollable className="max-h-[calc(100vh-10rem)]">
      <div className="space-y-1">
        <Section title="Brand">
          <div>
            <label className={labelClass}>System name</label>
            <input
              type="text"
              value={brand.systemName}
              onChange={(e) => onChange({ brand: { ...brand, systemName: e.target.value } })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Product type</label>
            <input
              type="text"
              value={brand.productType}
              onChange={(e) => onChange({ brand: { ...brand, productType: e.target.value } })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Density</label>
            <select
              value={brand.density}
              onChange={(e) => onChange({ brand: { ...brand, density: e.target.value as typeof brand.density } })}
              className={inputClass}
            >
              {DENSITIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Mode</label>
            <select
              value={brand.mode}
              onChange={(e) => onChange({ brand: { ...brand, mode: e.target.value as "light" | "dark" } })}
              className={inputClass}
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
                className="h-9 w-11 shrink-0 cursor-pointer rounded-md border border-[var(--color-border)] bg-transparent"
              />
              <input
                type="text"
                value={colors[key] as string}
                onChange={(e) => onChange({ colors: { ...colors, [key]: e.target.value } })}
                className={`min-w-0 flex-1 ${inputClass} py-1.5 text-xs`}
              />
            </div>
          ))}
        </Section>

        <Section title="Typography">
          <div>
            <label className={labelClass}>Font family</label>
            <select
              value={typography.fontFamily.split(",")[0]}
              onChange={(e) => onChange({ typography: { ...typography, fontFamily: `${e.target.value}, system-ui, sans-serif` } })}
              className={inputClass}
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </Section>

        <Section title="Spacing">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((key) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <label className={labelClass + " mb-0"}>{key}</label>
              <input
                type="number"
                min={0}
                value={spacing[key]}
                onChange={(e) => onChange({ spacing: { ...spacing, [key]: Number(e.target.value) || 0 } })}
                className={`w-20 ${inputClass} py-1.5 text-center`}
              />
            </div>
          ))}
        </Section>

        <Section title="Radius">
          {RADIUS_PRESETS.map((key) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <label className={labelClass + " mb-0"}>{key}</label>
              <input
                type="number"
                min={0}
                value={radius[key]}
                onChange={(e) => onChange({ radius: { ...radius, [key]: Number(e.target.value) || 0 } })}
                className={`w-20 ${inputClass} py-1.5 text-center`}
              />
            </div>
          ))}
        </Section>

        <details className="group border-b border-[var(--color-border)]">
          <summary className="cursor-pointer list-none py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Advanced
          </summary>
          <div className="space-y-4 pb-4 pt-1">
            <Section title="Shadows">
              <div>
                <label className={labelClass}>Subtle</label>
                <input
                  type="text"
                  value={shadows.subtle}
                  onChange={(e) => onChange({ shadows: { ...shadows, subtle: e.target.value } })}
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
              <div>
                <label className={labelClass}>Medium</label>
                <input
                  type="text"
                  value={shadows.medium}
                  onChange={(e) => onChange({ shadows: { ...shadows, medium: e.target.value } })}
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
              <div>
                <label className={labelClass}>Strong</label>
                <input
                  type="text"
                  value={shadows.strong}
                  onChange={(e) => onChange({ shadows: { ...shadows, strong: e.target.value } })}
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
            </Section>
            <Section title="Borders">
              <div>
                <label className={labelClass}>Width</label>
                <input
                  type="number"
                  min={0}
                  value={borders.width}
                  onChange={(e) => onChange({ borders: { ...borders, width: Number(e.target.value) || 0 } })}
                  className={inputClass}
                />
              </div>
            </Section>
            <Section title="Motion">
              <div>
                <label className={labelClass}>Fast (ms)</label>
                <input
                  type="number"
                  min={0}
                  value={motion.fast}
                  onChange={(e) => onChange({ motion: { ...motion, fast: Number(e.target.value) || 0 } })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Easing</label>
                <select
                  value={motion.easing}
                  onChange={(e) => onChange({ motion: { ...motion, easing: e.target.value as typeof motion.easing } })}
                  className={inputClass}
                >
                  {EASINGS.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </Section>
          </div>
        </details>
      </div>
    </BuilderPanel>
  );
}
