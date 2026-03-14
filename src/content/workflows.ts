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
      src: "/previews/placeholder.svg",
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
      src: "/previews/placeholder.svg",
      alt: "Brand to motion workflow",
    },
    field: "brand-visual",
    tasks: ["direction", "workflow", "motion"],
    relatedTools: ["brand-voice-extractor", "motion-direction-brief"],
    updatedAt: "2025-03-14",
  },
];
