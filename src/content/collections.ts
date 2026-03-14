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
      src: "/previews/systems-critique.svg",
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
      src: "/previews/production-resize.svg",
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
      src: "/previews/brand-visual.svg",
      alt: "Brand & Motion collection",
    },
    field: "brand-visual",
    updatedAt: "2025-03-14",
  },
  {
    slug: "design-system-deep-dive",
    title: "Design System Deep Dive",
    tagline: "Token audit, spacing, contrast, component consistency.",
    description:
      "A comprehensive set of tools for auditing and improving design system health: tokens, spacing, color contrast, and component consistency.",
    toolSlugs: [
      "design-token-audit",
      "critique-spacing",
      "critique-color-contrast",
      "component-consistency",
      "design-system-health",
    ],
    workflowSlugs: ["design-system-audit"],
    preview: {
      src: "/previews/systems-critique.svg",
      alt: "Design System Deep Dive collection",
    },
    field: "systems-critique",
    updatedAt: "2025-03-14",
  },
  {
    slug: "brand-foundations",
    title: "Brand Foundations",
    tagline: "Voice, palette, mood, taglines.",
    description:
      "Core brand tools: voice extraction, color palette direction, visual mood, and tagline generation for brand consistency.",
    toolSlugs: [
      "brand-voice-extractor",
      "color-palette-generator",
      "visual-mood-board",
      "tagline-generator",
    ],
    preview: {
      src: "/previews/brand-visual.svg",
      alt: "Brand Foundations collection",
    },
    field: "brand-visual",
    updatedAt: "2025-03-14",
  },
  {
    slug: "motion-production",
    title: "Motion Production",
    tagline: "Direction briefs, easing, Lottie, keyframe specs.",
    description:
      "Tools for motion design handoff: direction briefs, easing specs, Lottie implementation, and keyframe-to-CSS conversion.",
    toolSlugs: [
      "motion-direction-brief",
      "easing-specs",
      "lottie-brief",
      "keyframe-to-css",
    ],
    workflowSlugs: ["brand-to-motion"],
    preview: {
      src: "/previews/motion-3d.svg",
      alt: "Motion Production collection",
    },
    field: "motion-3d",
    updatedAt: "2025-03-14",
  },
];
