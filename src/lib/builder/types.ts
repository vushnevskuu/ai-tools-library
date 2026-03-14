export type Density = "compact" | "regular" | "comfortable";
export type RadiusPreset = "none" | "small" | "medium" | "large" | "pill";
export type EasingPreset = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

export interface BrandSetup {
  systemName: string;
  productType: string;
  styleDirection: string;
  platform: string;
  density: Density;
  mode: "light" | "dark";
}

export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  neutral: string[];
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontFamilyMono: string;
  typeScale: number[];
  fontWeight: Record<string, number>;
  lineHeight: Record<string, number>;
  headingStyle: string;
  bodyStyle: string;
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

export interface RadiusTokens {
  none: number;
  small: number;
  medium: number;
  large: number;
  pill: number;
}

export interface ShadowTokens {
  subtle: string;
  medium: string;
  strong: string;
}

export interface BorderTokens {
  width: number;
  color: string;
  dividerStrength: number;
}

export interface MotionTokens {
  fast: number;
  normal: number;
  slow: number;
  easing: EasingPreset;
}

export interface DesignSystemState {
  brand: BrandSetup;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  borders: BorderTokens;
  motion: MotionTokens;
}
