import type { DesignSystemState } from "./types";

export function toJSON(state: DesignSystemState): string {
  return JSON.stringify(state, null, 2);
}

export function toCSS(state: DesignSystemState): string {
  const { colors, typography, spacing, radius, shadows, borders, motion } = state;
  const vars: string[] = [
    `--color-primary: ${colors.primary};`,
    `--color-secondary: ${colors.secondary};`,
    `--color-accent: ${colors.accent};`,
    `--color-success: ${colors.success};`,
    `--color-warning: ${colors.warning};`,
    `--color-danger: ${colors.danger};`,
    `--color-background: ${colors.background};`,
    `--color-surface: ${colors.surface};`,
    `--color-text: ${colors.text};`,
    `--color-text-muted: ${colors.textMuted};`,
    `--color-border: ${colors.border};`,
    `--font-family: ${typography.fontFamily};`,
    `--font-family-mono: ${typography.fontFamilyMono};`,
    `--space-xs: ${spacing.xs}px;`,
    `--space-sm: ${spacing.sm}px;`,
    `--space-md: ${spacing.md}px;`,
    `--space-lg: ${spacing.lg}px;`,
    `--space-xl: ${spacing.xl}px;`,
    `--space-2xl: ${spacing["2xl"]}px;`,
    `--radius-none: ${radius.none}px;`,
    `--radius-sm: ${radius.small}px;`,
    `--radius-md: ${radius.medium}px;`,
    `--radius-lg: ${radius.large}px;`,
    `--radius-pill: ${radius.pill}px;`,
    `--shadow-subtle: ${shadows.subtle};`,
    `--shadow-medium: ${shadows.medium};`,
    `--shadow-strong: ${shadows.strong};`,
    `--border-width: ${borders.width}px;`,
    `--border-color: ${borders.color};`,
    `--duration-fast: ${motion.fast}ms;`,
    `--duration-normal: ${motion.normal}ms;`,
    `--duration-slow: ${motion.slow}ms;`,
    `--ease: ${motion.easing};`,
  ];
  return `:root {\n  ${vars.join("\n  ")}\n}\n`;
}

export function toTailwind(state: DesignSystemState): string {
  const { colors, typography, spacing, radius, shadows } = state;
  return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "${colors.primary}",
        secondary: "${colors.secondary}",
        accent: "${colors.accent}",
        success: "${colors.success}",
        warning: "${colors.warning}",
        danger: "${colors.danger}",
      },
      fontFamily: {
        sans: [${typography.fontFamily.split(",").map((f) => `"${f.trim()}"`).join(", ")}],
        mono: [${typography.fontFamilyMono.split(",").map((f) => `"${f.trim()}"`).join(", ")}],
      },
      spacing: {
        xs: "${spacing.xs}px",
        sm: "${spacing.sm}px",
        md: "${spacing.md}px",
        lg: "${spacing.lg}px",
        xl: "${spacing.xl}px",
        "2xl": "${spacing["2xl"]}px",
      },
      borderRadius: {
        none: "${radius.none}px",
        sm: "${radius.small}px",
        md: "${radius.medium}px",
        lg: "${radius.large}px",
        pill: "${radius.pill}px",
      },
      boxShadow: {
        subtle: "${shadows.subtle}",
        medium: "${shadows.medium}",
        strong: "${shadows.strong}",
      },
    },
  },
};
`;
}

export function toTokensStudio(state: DesignSystemState): string {
  const { colors, typography, spacing, radius } = state;
  const tokens: Record<string, unknown> = {
    "color.primary": { value: colors.primary, type: "color" },
    "color.secondary": { value: colors.secondary, type: "color" },
    "color.accent": { value: colors.accent, type: "color" },
    "color.success": { value: colors.success, type: "color" },
    "color.warning": { value: colors.warning, type: "color" },
    "color.danger": { value: colors.danger, type: "color" },
    "color.background": { value: colors.background, type: "color" },
    "color.surface": { value: colors.surface, type: "color" },
    "color.text": { value: colors.text, type: "color" },
    "color.textMuted": { value: colors.textMuted, type: "color" },
    "color.border": { value: colors.border, type: "color" },
    "font.family": { value: typography.fontFamily, type: "fontFamily" },
    "font.familyMono": { value: typography.fontFamilyMono, type: "fontFamily" },
    "space.xs": { value: `${spacing.xs}px`, type: "dimension" },
    "space.sm": { value: `${spacing.sm}px`, type: "dimension" },
    "space.md": { value: `${spacing.md}px`, type: "dimension" },
    "space.lg": { value: `${spacing.lg}px`, type: "dimension" },
    "space.xl": { value: `${spacing.xl}px`, type: "dimension" },
    "space.2xl": { value: `${spacing["2xl"]}px`, type: "dimension" },
    "radius.none": { value: `${radius.none}px`, type: "dimension" },
    "radius.small": { value: `${radius.small}px`, type: "dimension" },
    "radius.medium": { value: `${radius.medium}px`, type: "dimension" },
    "radius.large": { value: `${radius.large}px`, type: "dimension" },
    "radius.pill": { value: `${radius.pill}px`, type: "dimension" },
  };
  return JSON.stringify({ [state.brand.systemName]: tokens }, null, 2);
}
