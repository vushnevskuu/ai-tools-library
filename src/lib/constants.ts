import type { Field, Task, Format } from "@/types";

export const FIELD_LABELS: Record<Field, string> = {
  "ui-ux": "UI / UX",
  "brand-visual": "Brand / Visual",
  "motion-3d": "Motion / 3D",
  "production-resize": "Production / Resize",
  "systems-critique": "Systems / Critique",
};

export const TASK_LABELS: Record<Task, string> = {
  critique: "Critique",
  direction: "Direction",
  structure: "Structure",
  transform: "Transform",
  motion: "Motion",
  resize: "Resize",
  workflow: "Workflow",
  systems: "Systems",
};

export const FORMAT_LABELS: Record<Format, string> = {
  prompt: "Prompt",
  agent: "Agent",
  template: "Template",
  rules: "Rules",
  instructions: "Instructions",
};

export const CATEGORIES = [
  "ui-ux",
  "brand-visual",
  "motion-3d",
  "production-resize",
  "systems-critique",
] as const;
