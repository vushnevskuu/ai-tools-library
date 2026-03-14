import type { Workflow } from "@/types";

export const workflows: Workflow[] = [
  {
    slug: "design-system-audit",
    title: "Design System Audit",
    tagline: "Full audit from hierarchy to spacing to contrast.",
    description:
      "A 4-step workflow that audits button hierarchy, color contrast, spacing consistency, and produces a consolidated report.",
    steps: [
      { toolSlug: "critique-button-hierarchy", title: "Button hierarchy", order: 1 },
      { toolSlug: "critique-color-contrast", title: "Color contrast", order: 2 },
      { toolSlug: "critique-spacing", title: "Spacing consistency", order: 3 },
    ],
    preview: {
      src: "/previews/systems-critique.svg",
      alt: "Design system audit workflow",
    },
    field: "systems-critique",
    tasks: ["critique", "workflow", "systems"],
    relatedTools: ["critique-button-hierarchy", "critique-color-contrast", "critique-spacing"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "brand-to-motion",
    title: "Brand to Motion",
    tagline: "From voice to motion direction.",
    description:
      "Extract brand voice first, then use it to inform motion direction for consistent brand expression.",
    steps: [
      { toolSlug: "brand-voice-extractor", title: "Extract brand voice", order: 1 },
      { toolSlug: "motion-direction-brief", title: "Motion direction", order: 2 },
    ],
    preview: {
      src: "/previews/brand-visual.svg",
      alt: "Brand to motion workflow",
    },
    field: "brand-visual",
    tasks: ["direction", "workflow", "motion"],
    relatedTools: ["brand-voice-extractor", "motion-direction-brief"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "production-pipeline",
    title: "Production Pipeline",
    tagline: "From source to multi-format delivery.",
    description:
      "Batch resize specs, format conversion, and asset naming in one workflow for production-ready deliverables.",
    steps: [
      { toolSlug: "batch-resize-prompt", title: "Batch resize specs", order: 1 },
      { toolSlug: "format-converter-specs", title: "Format conversion", order: 2 },
      { toolSlug: "asset-naming-convention", title: "Asset naming", order: 3 },
    ],
    preview: {
      src: "/previews/production-resize.svg",
      alt: "Production pipeline workflow",
    },
    field: "production-resize",
    tasks: ["workflow", "resize", "transform"],
    relatedTools: ["batch-resize-prompt", "format-converter-specs", "asset-naming-convention", "social-crop-specs"],
    updatedAt: "2025-03-14",
  },
];
