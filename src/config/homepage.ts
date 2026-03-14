/**
 * Homepage curation — explicit whitelists for MVP feel.
 * Explore page and category routes use full dataset.
 */

export const HOMEPAGE_CORE_TOOL_SLUGS = [
  "critique-button-hierarchy",
  "critique-color-contrast",
  "critique-spacing",
  "brand-voice-extractor",
  "batch-resize-prompt",
  "motion-direction-brief",
  "design-token-audit",
  "design-system-health",
  "color-palette-generator",
  "form-critique",
] as const;

export const HOMEPAGE_COLLECTION_SLUGS = [
  "daily-ui-critique",
  "brand-foundations",
  "motion-production",
] as const;
