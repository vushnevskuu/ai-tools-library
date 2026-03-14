/**
 * Visibility — only UI/UX and design system shown. Rest is hidden site-wide.
 * Data stays in content/*.ts; expand VISIBLE_FIELDS to reveal more later.
 */
export const VISIBLE_FIELDS = ["ui-ux", "systems-critique"] as const;
export type VisibleField = (typeof VISIBLE_FIELDS)[number];

/**
 * Homepage curation — explicit whitelists for MVP feel.
 */
export const HOMEPAGE_CORE_TOOL_SLUGS = [
  "critique-button-hierarchy",
  "critique-color-contrast",
  "critique-spacing",
  "critique-typography",
  "critique-layout",
  "form-critique",
  "design-token-audit",
  "design-system-health",
  "component-consistency",
  "accessibility-checklist",
] as const;

export const HOMEPAGE_COLLECTION_SLUGS = [
  "daily-ui-critique",
  "design-system-deep-dive",
] as const;
