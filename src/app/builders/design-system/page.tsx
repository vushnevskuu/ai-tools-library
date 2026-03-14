"use client";

import { useState, useCallback } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { BuilderControls } from "@/components/builder/BuilderControls";
import { BuilderPreview } from "@/components/builder/BuilderPreview";
import { ExportPanel } from "@/components/builder/ExportPanel";
import type { DesignSystemState } from "@/lib/builder/types";
import { defaultState } from "@/lib/builder/defaults";

export default function DesignSystemBuilderPage() {
  const [state, setState] = useState<DesignSystemState>(defaultState);

  const handleChange = useCallback((updates: Partial<DesignSystemState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
      ...(updates.brand && { brand: { ...prev.brand, ...updates.brand } }),
      ...(updates.colors && { colors: { ...prev.colors, ...updates.colors } }),
      ...(updates.typography && { typography: { ...prev.typography, ...updates.typography } }),
      ...(updates.spacing && { spacing: { ...prev.spacing, ...updates.spacing } }),
      ...(updates.radius && { radius: { ...prev.radius, ...updates.radius } }),
      ...(updates.shadows && { shadows: { ...prev.shadows, ...updates.shadows } }),
      ...(updates.borders && { borders: { ...prev.borders, ...updates.borders } }),
      ...(updates.motion && { motion: { ...prev.motion, ...updates.motion } }),
    }));
  }, []);

  const handleReset = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <PageContainer className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Design System Builder
        </h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Edit tokens, preview live, export JSON, CSS, Tailwind, or Tokens Studio
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr_280px]">
        <BuilderControls state={state} onChange={handleChange} />
        <BuilderPreview state={state} />
        <ExportPanel state={state} onReset={handleReset} />
      </div>
    </PageContainer>
  );
}
