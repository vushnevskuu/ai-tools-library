/**
 * Runtime layer types for interactive tools.
 * Tools can be static (copy-only), interactive (workbench), or builder-level.
 */

export const INTERACTION_MODES = ["static", "interactive", "builder"] as const;
export type InteractionMode = (typeof INTERACTION_MODES)[number];

export const OUTPUT_TYPES = [
  "critique",
  "structured",
  "beforeAfter",
  "tokens",
  "resizeSet",
  "motionBrief",
  "promptOnly",
] as const;
export type OutputType = (typeof OUTPUT_TYPES)[number];

export const PREVIEW_RENDERERS = [
  "critiquePanel",
  "structuredPanel",
  "beforeAfterPanel",
  "miniWorkflowPanel",
  "tokenPanel",
  "componentCanvas",
  "resizeArtboards",
] as const;
export type PreviewRenderer = (typeof PREVIEW_RENDERERS)[number];

export const EXPORT_FORMATS = ["json", "css", "text", "markdown", "prompt"] as const;
export type ExportFormat = (typeof EXPORT_FORMATS)[number];

/** Input field schema for interactive tools */
export interface InputFieldSchema {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "color" | "multiline";
  placeholder?: string;
  options?: { value: string; label: string }[];
  default?: string | number;
  required?: boolean;
  rows?: number;
}

/** Full input schema for a tool */
export interface InputSchema {
  fields: InputFieldSchema[];
}

/** Preset for quick input selection */
export interface ToolPreset {
  id: string;
  label: string;
  inputs: Record<string, string | number>;
}

/** Runtime config attached to interactive/builder tools */
export interface ToolRuntimeConfig {
  interactionMode: InteractionMode;
  inputSchema?: InputSchema;
  defaultInputs?: Record<string, string | number>;
  outputType: OutputType;
  previewRenderer?: PreviewRenderer;
  exportFormats?: ExportFormat[];
  presets?: ToolPreset[];
  runtimeCategory?: "critique" | "transform" | "generate" | "audit" | "builder";
}
