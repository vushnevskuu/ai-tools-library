"use client";

import { useState, useCallback, useEffect } from "react";
import type { Tool } from "@/types";
import type { ToolRuntimeConfig } from "@/types/runtime";
import { ToolInputPanel } from "./ToolInputPanel";
import { ToolOutputPanel } from "./ToolOutputPanel";
import { PresetBar } from "./PresetBar";
import { buildPromptFromTemplate } from "@/lib/runtime/promptBuilder";
import { loadToolState, saveToolState } from "@/lib/runtime/persistence";

interface ToolWorkbenchProps {
  tool: Tool;
  runtime: ToolRuntimeConfig;
}

export function ToolWorkbench({ tool, runtime }: ToolWorkbenchProps) {
  const [inputs, setInputs] = useState<Record<string, string | number>>(
    runtime.defaultInputs ?? {}
  );

  useEffect(() => {
    const saved = loadToolState(tool.slug);
    if (saved && Object.keys(saved).length > 0) {
      setInputs((prev) => ({ ...runtime.defaultInputs, ...prev, ...saved }));
    }
  }, [tool.slug]);

  useEffect(() => {
    const hasValues = Object.values(inputs).some((v) => v !== "" && v !== undefined);
    if (hasValues) {
      saveToolState(tool.slug, inputs);
    }
  }, [tool.slug, inputs]);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const filledPrompt = buildPromptFromTemplate(tool, inputs);

  const handleInputChange = useCallback((key: string, value: string | number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setActivePresetId(null);
  }, []);

  const handlePresetSelect = useCallback((presetId: string, presetInputs: Record<string, string | number>) => {
    setInputs(presetInputs);
    setActivePresetId(presetId);
  }, []);

  return (
    <div className="space-y-6">
      {runtime.presets && runtime.presets.length > 0 && (
        <PresetBar
          presets={runtime.presets}
          activeId={activePresetId}
          onSelect={handlePresetSelect}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <ToolInputPanel
          schema={runtime.inputSchema!}
          inputs={inputs}
          onChange={handleInputChange}
        />
        <ToolOutputPanel
          tool={tool}
          runtime={runtime}
          inputs={inputs}
          filledPrompt={filledPrompt}
        />
      </div>
    </div>
  );
}
