import type { Tool } from "@/types";

export const tools: Tool[] = [
  {
    slug: "critique-button-hierarchy",
    title: "Button Hierarchy Critique",
    tagline: "Get structured feedback on button prominence and hierarchy.",
    description:
      "Analyzes your UI screens and returns actionable critique on button hierarchy, CTA placement, and visual weight distribution.",
    field: "ui-ux",
    tasks: ["critique", "structure"],
    format: "prompt",
    previewType: "critique",
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Button hierarchy critique output example",
    },
    content: {
      prompt: `You are a senior UI designer. Analyze this interface screenshot and provide structured critique on:
1. Button hierarchy (primary vs secondary vs tertiary)
2. CTA prominence and placement
3. Visual weight distribution
4. Action affordance clarity

Format your response as bullet points with specific recommendations.`,
    },
    useCases: [
      "Pre-launch UI review",
      "Design system audit",
      "Conversion optimization",
    ],
    inputRequirements: "Screenshot or description of the interface",
    outputExample: "Structured bullet-point critique with actionable recommendations",
    limitations: ["Requires clear screenshot; may miss context"],
    relatedTools: ["critique-color-contrast", "critique-spacing"],
    relatedWorkflows: ["design-system-audit"],
    testedWith: ["Claude 3.5", "GPT-4"],
    updatedAt: "2025-03-01",
    version: "1.0",
  },
  {
    slug: "critique-color-contrast",
    title: "Color Contrast Audit",
    tagline: "Check accessibility and contrast ratios in your palette.",
    description:
      "Evaluates color combinations for WCAG compliance and suggests adjustments for better readability.",
    field: "ui-ux",
    tasks: ["critique", "systems"],
    format: "prompt",
    previewType: "beforeAfter",
    preview: {
      before: "/previews/placeholder.svg",
      after: "/previews/placeholder.svg",
      alt: "Color contrast improvement",
    },
    content: {
      prompt: `You are an accessibility specialist. Given these hex color values, analyze:
1. Contrast ratios for text on background (WCAG AA/AAA)
2. Color blindness considerations
3. Suggested alternative values if needed

Provide a table with: color pair, ratio, pass/fail, recommendation.`,
    },
    useCases: [
      "Design system compliance",
      "Accessibility audit",
      "Brand palette validation",
    ],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-05",
  },
  {
    slug: "critique-spacing",
    title: "Spacing Consistency Critique",
    tagline: "Audit spacing scale usage across layouts.",
    description:
      "Reviews layouts for spacing consistency, alignment with design tokens, and rhythm.",
    field: "systems-critique",
    tasks: ["critique", "systems"],
    format: "prompt",
    previewType: "structured",
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Spacing audit output",
    },
    content: {
      prompt: `Analyze this layout/spacing specification. Check:
1. Consistency with 4/8px grid
2. Token usage (if provided)
3. Rhythm and visual hierarchy
4. Edge cases and outliers

Output as a structured report with pass/fail per section.`,
    },
    useCases: ["Design system audit", "Handoff review", "QA"],
    testedWith: ["Claude 3.5", "GPT-4"],
    updatedAt: "2025-03-10",
  },
  {
    slug: "brand-voice-extractor",
    title: "Brand Voice Extractor",
    tagline: "Distill brand voice from existing copy.",
    description:
      "Analyzes brand materials and extracts tone, vocabulary, and voice guidelines.",
    field: "brand-visual",
    tasks: ["direction", "structure"],
    format: "prompt",
    previewType: "structured",
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Brand voice guidelines output",
    },
    content: {
      prompt: `Analyze the provided brand copy (website, ads, social). Extract:
1. Tone descriptors (3-5 words)
2. Vocabulary patterns (words they use/avoid)
3. Sentence structure preferences
4. 5 sample voice guidelines

Output as a reusable brand voice brief.`,
    },
    useCases: ["Brand guidelines", "Copy consistency", "Onboarding writers"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-08",
  },
  {
    slug: "batch-resize-prompt",
    title: "Batch Resize Instructions",
    tagline: "Generate resize specs for multiple formats.",
    description:
      "Creates structured resize instructions for social, print, and web from a single source.",
    field: "production-resize",
    tasks: ["resize", "transform"],
    format: "template",
    previewType: "structured",
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Resize specification output",
    },
    content: {
      template: `Source: {{sourceDimensions}}
Output formats needed: {{formats}}

Generate a resize specification table:
| Format | Dimensions | Crop | Notes |
For each format, specify exact px dimensions, aspect ratio, and any crop/safe zone notes.`,
    },
    useCases: ["Social asset production", "Print prep", "Multi-format campaigns"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-12",
  },
  {
    slug: "motion-direction-brief",
    title: "Motion Direction Brief",
    tagline: "Turn static frames into motion specs.",
    description:
      "Converts keyframe descriptions into structured motion direction for animators or Lottie.",
    field: "motion-3d",
    tasks: ["direction", "motion"],
    format: "prompt",
    previewType: "miniWorkflow",
    preview: {
      src: "/previews/placeholder.svg",
      alt: "Motion direction output",
    },
    content: {
      prompt: `Given these keyframe descriptions: {{keyframes}}

Generate a motion direction brief with:
1. Timing (duration, easing per element)
2. Stagger sequence
3. Easing curves (CSS or cubic-bezier)
4. Performance notes (prefer transform/opacity)

Format for handoff to animator or Lottie creator.`,
    },
    useCases: ["Micro-interactions", "Page transitions", "Lottie production"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
];
