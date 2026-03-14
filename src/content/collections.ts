import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    slug: "daily-ui-critique",
    title: "Daily UI Critique",
    tagline: "Quick critique tools for everyday design review.",
    description:
      "A curated set of prompts and templates for fast, structured feedback on UI decisions. Use before handoff or in design review.",
    toolSlugs: [
      "critique-button-hierarchy",
      "critique-color-contrast",
      "critique-spacing",
    ],
    workflowSlugs: ["design-system-audit"],
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Daily UI Critique collection",
    },
    field: "systems-critique",
    updatedAt: "2025-03-14",
  },
  {
    slug: "production-essentials",
    title: "Production Essentials",
    tagline: "Tools for asset production and resizing.",
    description:
      "Templates and prompts for production workflows: resizing, format specs, batch instructions.",
    toolSlugs: ["batch-resize-prompt"],
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Production Essentials collection",
    },
    field: "production-resize",
    updatedAt: "2025-03-14",
  },
  {
    slug: "brand-and-motion",
    title: "Brand & Motion",
    tagline: "Voice extraction and motion direction.",
    description:
      "From brand voice to motion specs. Tools for consistent brand expression across static and animated assets.",
    toolSlugs: ["brand-voice-extractor", "motion-direction-brief"],
    workflowSlugs: ["brand-to-motion"],
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Brand & Motion collection",
    },
    field: "brand-visual",
    updatedAt: "2025-03-14",
  },
];
