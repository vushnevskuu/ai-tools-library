"use client";

import { useState, useCallback } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

const FONT_OPTIONS = [
  { value: "Inter", label: "Inter" },
  { value: "Geist", label: "Geist" },
  { value: "system-ui", label: "System UI" },
  { value: "Georgia", label: "Georgia" },
];

export default function DesignSystemBuilderPage() {
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [radius, setRadius] = useState(8);

  const tokens = {
    color: { primary: primaryColor },
    typography: { fontFamily },
    radius: { base: radius },
  };

  const exportJSON = useCallback(() => {
    const json = JSON.stringify(tokens, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-tokens.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [primaryColor, fontFamily, radius]);

  const exportCSS = useCallback(() => {
    const css = `:root {
  --color-primary: ${primaryColor};
  --font-family: ${fontFamily}, system-ui, sans-serif;
  --radius: ${radius}px;
}`;
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-tokens.css";
    a.click();
    URL.revokeObjectURL(url);
  }, [primaryColor, fontFamily, radius]);

  return (
    <PageContainer className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Design System Builder
        </h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Edit tokens, preview live, export JSON or CSS
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr_240px]">
        {/* Left: inputs */}
        <aside className="flex flex-col gap-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Primary color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm dark:bg-neutral-900"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Font family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm dark:bg-neutral-900"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Radius (px)
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full"
            />
            <span className="mt-1 block text-sm text-neutral-500">{radius}px</span>
          </div>
        </aside>

        {/* Center: live preview */}
        <main className="flex min-h-[320px] items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 dark:bg-[var(--color-surface-elevated)]">
          <div
            className="flex flex-col gap-6"
            style={{
              fontFamily: `${fontFamily}, system-ui, sans-serif`,
              ["--preview-primary" as string]: primaryColor,
              ["--preview-radius" as string]: `${radius}px`,
            }}
          >
            <div className="flex gap-3">
              <div
                className="h-12 w-24 rounded-[var(--preview-radius)]"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="h-12 w-24 rounded-[var(--preview-radius)] border-2"
                style={{ borderColor: primaryColor }}
              />
            </div>
            <div className="space-y-2">
              <h3
                className="text-lg font-semibold"
                style={{ color: primaryColor }}
              >
                Heading
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Body text with your chosen font and radius applied to buttons
                and cards.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-[var(--preview-radius)] px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Primary
              </button>
              <button
                type="button"
                className="rounded-[var(--preview-radius)] border px-4 py-2 text-sm font-medium"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Secondary
              </button>
            </div>
          </div>
        </main>

        {/* Right: export */}
        <aside className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Export
          </h3>
          <button
            type="button"
            onClick={exportJSON}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            JSON
          </button>
          <button
            type="button"
            onClick={exportCSS}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            CSS
          </button>
        </aside>
      </div>
    </PageContainer>
  );
}
