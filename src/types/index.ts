// Taxonomy - controlled vocabularies
export const FIELDS = [
  "ui-ux",
  "brand-visual",
  "motion-3d",
  "production-resize",
  "systems-critique",
] as const;

export const TASKS = [
  "critique",
  "direction",
  "structure",
  "transform",
  "motion",
  "resize",
  "workflow",
  "systems",
] as const;

export const FORMATS = [
  "prompt",
  "agent",
  "template",
  "rules",
  "instructions",
] as const;

export const PREVIEW_TYPES = [
  "image",
  "beforeAfter",
  "critique",
  "structured",
  "miniWorkflow",
] as const;

export type Field = (typeof FIELDS)[number];
export type Task = (typeof TASKS)[number];
export type Format = (typeof FORMATS)[number];
export type PreviewType = (typeof PREVIEW_TYPES)[number];

// Preview structures
export interface ImagePreview {
  src: string;
  alt: string;
}

export interface BeforeAfterPreview {
  before: string;
  after: string;
  alt?: string;
}

export type ToolPreview = ImagePreview | BeforeAfterPreview;

// Tool content - what the tool contains
export interface ToolContent {
  prompt?: string;
  agent?: string;
  template?: string;
  rules?: string;
  instructions?: string;
}

import type { ToolRuntimeConfig } from "./runtime";

// Tool schema
export interface Tool {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  field: Field;
  tasks: Task[];
  format: Format;
  previewType: PreviewType;
  preview: ToolPreview;
  content: ToolContent;
  useCases: string[];
  inputRequirements?: string;
  outputExample?: string;
  limitations?: string[];
  relatedTools?: string[];
  relatedWorkflows?: string[];
  testedWith?: string[];
  updatedAt: string;
  version?: string;
  /** Runtime config for interactive/builder tools. Omit = static (copy-only) */
  runtime?: ToolRuntimeConfig;
}

// Workflow step
export interface WorkflowStep {
  toolSlug: string;
  title: string;
  order: number;
}

// Workflow schema
export interface Workflow {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  steps: WorkflowStep[];
  preview: ImagePreview;
  field: Field;
  tasks: Task[];
  relatedTools?: string[];
  updatedAt: string;
}

// Collection schema
export interface Collection {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  toolSlugs: string[];
  workflowSlugs?: string[];
  preview: ImagePreview;
  field?: Field;
  updatedAt: string;
}
