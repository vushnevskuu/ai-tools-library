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
      src: "/previews/ui-ux.svg",
      alt: "Button hierarchy critique output example",
    },
    content: {
      prompt: `You are a senior UI designer with 10+ years of experience in conversion-focused interfaces. Your task is to critique button hierarchy and CTA design.

## Interface to analyze
{{interfaceDescription}}

## Critique framework
Evaluate and provide actionable feedback on:

1. **Button hierarchy** — Is there a clear primary/secondary/tertiary distinction? Are visual weights (color, size, fill vs outline) used consistently to signal importance?

2. **CTA prominence** — Is the main action immediately scannable? Does it compete with or dominate secondary actions appropriately?

3. **Visual weight distribution** — Is the eye drawn to the right place? Are there competing focal points that dilute the primary action?

4. **Action affordance** — Do buttons look clickable? Is the label-action match clear (e.g., "Submit" vs "Get started")?

## Output format
- Start with a 1–2 sentence overall assessment
- Use bullet points for each finding
- For each issue, add a concrete recommendation (e.g., "Increase primary button contrast to 4.5:1")
- End with 2–3 high-impact quick wins`,
    },
    runtime: {
      interactionMode: "interactive",
      outputType: "critique",
      previewRenderer: "critiquePanel",
      exportFormats: ["prompt"],
      runtimeCategory: "critique",
      inputSchema: {
        fields: [
          { key: "interfaceDescription", label: "Screenshot or interface description", type: "textarea", placeholder: "Paste or describe the interface to critique...", rows: 6 },
        ],
      },
      defaultInputs: { interfaceDescription: "" },
      presets: [
        { id: "modal", label: "Modal dialog", inputs: { interfaceDescription: "A modal dialog with primary CTA, secondary cancel, and close icon." } },
        { id: "form", label: "Form page", inputs: { interfaceDescription: "A multi-step form with next/back buttons and submit." } },
      ],
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
      before: "/previews/ui-ux.svg",
      after: "/previews/ui-ux.svg",
      alt: "Color contrast improvement",
    },
    content: {
      prompt: `You are an accessibility specialist (WCAG 2.1). Analyze the following color palette for contrast and usability.

## Color values
{{colorValues}}

## Analysis requirements
1. **Contrast ratios** — For each text-on-background pair (normal and large text), calculate ratio. Mark WCAG AA (4.5:1 / 3:1) and AAA (7:1 / 4.5:1) pass/fail.

2. **Color blindness** — Note any pairs that may be indistinguishable for deuteranopia/protanopia. Flag red-green or similar-hue combinations.

3. **Recommendations** — If a pair fails, suggest the nearest passing alternative (adjust lightness, not hue) with hex value.

## Output format
| Foreground | Background | Ratio | AA | AAA | Notes |
|------------|------------|-------|----|-----|-------|
(Fill for each pair)

Then a short "Key findings" section with 2–4 bullet points.`,
    },
    runtime: {
      interactionMode: "interactive",
      outputType: "beforeAfter",
      previewRenderer: "beforeAfterPanel",
      exportFormats: ["prompt"],
      runtimeCategory: "audit",
      inputSchema: {
        fields: [
          { key: "colorValues", label: "Hex color values (one per line or comma-separated)", type: "textarea", placeholder: "#000000, #ffffff\n#6366f1, #22c55e", rows: 4 },
        ],
      },
      defaultInputs: { colorValues: "" },
      presets: [
        { id: "grayscale", label: "Grayscale", inputs: { colorValues: "#ffffff, #f5f5f5, #e5e5e5, #737373, #404040, #171717" } },
        { id: "brand", label: "Brand primary + neutrals", inputs: { colorValues: "#6366f1, #ffffff, #f8fafc, #64748b, #0f172a" } },
      ],
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
      src: "/previews/systems-critique.svg",
      alt: "Spacing audit output",
    },
    content: {
      prompt: `You are a design systems specialist. Audit the following layout and spacing for consistency and token alignment.

## Input
{{layoutSpec}}

## Audit criteria
1. **Grid alignment** — Are values on a 4px or 8px base? List any off-grid values (e.g., 6px, 10px, 14px) and suggest nearest token.

2. **Token usage** — If tokens are provided: are they used consistently? If not: propose a token scale (e.g., space-1 through space-12) that matches the current usage.

3. **Rhythm and hierarchy** — How do spacing values create visual rhythm? Are there clear jumps (e.g., 8→16→24) or too many similar values?

4. **Edge cases** — Modal padding, card gaps, list spacing — any outliers or inconsistencies?

## Output format
- **Summary** (2–3 sentences)
- **Pass/fail** per section with brief rationale
- **Recommendations** — Prioritized list of changes (high impact first)`,
    },
    runtime: {
      interactionMode: "interactive",
      outputType: "structured",
      previewRenderer: "structuredPanel",
      exportFormats: ["prompt"],
      runtimeCategory: "audit",
      inputSchema: {
        fields: [
          { key: "layoutSpec", label: "Layout or spacing specification", type: "textarea", placeholder: "Paste spacing spec, token list, or describe the layout...", rows: 6 },
        ],
      },
      defaultInputs: { layoutSpec: "" },
      presets: [
        { id: "card-grid", label: "Card grid", inputs: { layoutSpec: "Card grid: 3 columns, 24px gap. Cards: 16px padding, 8px between title and body. Mobile: 1 column, 16px gap." } },
        { id: "form-layout", label: "Form layout", inputs: { layoutSpec: "Form: 2-column on desktop, 1 on mobile. Label-input gap: 8px. Between fields: 24px. Section spacing: 32px." } },
        { id: "header-nav", label: "Header/nav", inputs: { layoutSpec: "Header: 64px height, 24px horizontal padding. Nav items: 8px gap. Logo-text gap: 16px." } },
      ],
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
      src: "/previews/brand-visual.svg",
      alt: "Brand voice guidelines output",
    },
    content: {
      prompt: `Analyze the provided brand copy:

{{brandCopy}}

Extract:
1. Tone descriptors (3-5 words)
2. Vocabulary patterns (words they use/avoid)
3. Sentence structure preferences
4. 5 sample voice guidelines

Output as a reusable brand voice brief.`,
    },
    runtime: {
      interactionMode: "interactive",
      outputType: "structured",
      previewRenderer: "structuredPanel",
      exportFormats: ["prompt"],
      runtimeCategory: "generate",
      inputSchema: {
        fields: [
          { key: "brandCopy", label: "Brand copy (website, ads, social)", type: "textarea", placeholder: "Paste brand materials to analyze...", rows: 6 },
        ],
      },
      defaultInputs: { brandCopy: "" },
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
      src: "/previews/production-resize.svg",
      alt: "Resize specification output",
    },
    content: {
      template: `Source: {{sourceDimensions}}
Output formats needed: {{formats}}

Generate a resize specification table:
| Format | Dimensions | Crop | Notes |
For each format, specify exact px dimensions, aspect ratio, and any crop/safe zone notes.`,
    },
    runtime: {
      interactionMode: "interactive",
      outputType: "resizeSet",
      previewRenderer: "resizeArtboards",
      exportFormats: ["prompt"],
      runtimeCategory: "transform",
      inputSchema: {
        fields: [
          { key: "sourceDimensions", label: "Source dimensions", type: "text", placeholder: "e.g. 1920×1080" },
          { key: "formats", label: "Output formats needed", type: "text", placeholder: "e.g. Instagram, LinkedIn, Print A4" },
        ],
      },
      defaultInputs: { sourceDimensions: "1920×1080", formats: "Instagram Square, Instagram Story, LinkedIn Banner" },
      presets: [
        { id: "social", label: "Social", inputs: { sourceDimensions: "1920×1080", formats: "Instagram Square (1080×1080), Instagram Story (1080×1920), LinkedIn (1200×627)" } },
        { id: "print", label: "Print", inputs: { sourceDimensions: "3000×4000", formats: "A4, A5, Business card" } },
      ],
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
      src: "/previews/motion-3d.svg",
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
    runtime: {
      interactionMode: "interactive",
      outputType: "motionBrief",
      previewRenderer: "miniWorkflowPanel",
      exportFormats: ["prompt"],
      runtimeCategory: "generate",
      inputSchema: {
        fields: [
          { key: "keyframes", label: "Keyframe descriptions", type: "textarea", placeholder: "Frame 1: Button at rest. Frame 2: Button hover. Frame 3: Modal slides in from top...", rows: 6 },
        ],
      },
      defaultInputs: { keyframes: "" },
      presets: [
        { id: "modal", label: "Modal entrance", inputs: { keyframes: "Frame 1: Modal off-screen (top). Frame 2: Modal slides down, backdrop fades in. Frame 3: Modal at rest, backdrop visible." } },
        { id: "button", label: "Button hover", inputs: { keyframes: "Frame 1: Default state. Frame 2: Hover state (slight scale + shadow). Frame 3: Active/pressed state." } },
      ],
    },
    useCases: ["Micro-interactions", "Page transitions", "Lottie production"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  // UI/UX +3
  {
    slug: "critique-typography",
    title: "Typography Hierarchy Critique",
    tagline: "Audit type scale and readability.",
    description:
      "Reviews typography choices for hierarchy, readability, and consistency with design systems.",
    field: "ui-ux",
    tasks: ["critique", "structure"],
    format: "prompt",
    previewType: "critique",
    preview: { src: "/previews/ui-ux.svg", alt: "Typography critique output" },
    content: {
      prompt: `You are a typography and readability specialist. Audit the following typography specification or description.

## Input
{{typographySpec}}

## Evaluation criteria
1. **Type scale** — Is there a clear, consistent scale (e.g., 12/14/16/20/24/32)? Are h1–h6, body, caption, and overline defined? Any orphan sizes?

2. **Line height & letter spacing** — Are line heights appropriate (1.2–1.5 for headings, 1.4–1.6 for body)? Any tracking issues (too tight/loose)?

3. **Readability** — Font choices for long-form vs UI? Contrast with background? Minimum 16px for body on web?

4. **Hierarchy** — Can you distinguish headings from body at a glance? Is the scale jump (e.g., 1.25 or 1.333) consistent?

## Output format
- **Summary** — 1–2 sentences
- **Findings** — Bullet points with specific issues
- **Recommendations** — Concrete fixes (e.g., "Set body line-height to 1.5")`,
    },
    useCases: ["Design system", "Content audit", "Accessibility"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "critique-layout",
    title: "Layout Audit",
    tagline: "Review grid, alignment, and composition.",
    description:
      "Evaluates layout structure, grid usage, and visual balance for UI screens.",
    field: "ui-ux",
    tasks: ["critique", "structure"],
    format: "prompt",
    previewType: "critique",
    preview: { src: "/previews/ui-ux.svg", alt: "Layout audit output" },
    content: {
      prompt: `You are a UI/UX designer specializing in layout and composition. Audit the following layout description or screenshot.

## Input
{{layoutDescription}}

## Audit criteria
1. **Grid alignment** — Is content aligned to a consistent grid? Are columns and gutters consistent? Any misaligned elements?

2. **Visual balance** — Is whitespace distributed well? Any cramped or overly sparse areas? Does the layout feel balanced (symmetry or intentional asymmetry)?

3. **Content hierarchy** — Does the layout guide the eye correctly? Is the most important content visually dominant? Any competing focal points?

4. **Responsive considerations** — How would this reflow at 768px and 375px? Are there fixed widths that would break? Touch target sizes (min 44px)?

## Output format
- **Overall** — Pass / Needs work / Fail + 1 sentence
- **Findings** — Bullet points with specific locations (e.g., "Card grid: 3rd card misaligned")
- **Fixes** — Actionable recommendations in priority order`,
    },
    useCases: ["Pre-handoff", "Design review", "QA"],
    testedWith: ["Claude 3.5", "GPT-4"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "component-naming",
    title: "Component Naming Convention",
    tagline: "Generate consistent component names.",
    description:
      "Suggests clear, consistent naming for UI components based on usage and hierarchy.",
    field: "ui-ux",
    tasks: ["structure", "systems"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/ui-ux.svg", alt: "Component naming output" },
    content: {
      prompt: `You are a design system architect. Suggest component naming following BEM-inspired and React conventions.

## Component description
{{description}}

## Naming requirements
1. **Primary name** — PascalCase, descriptive (e.g., Button, Card, Modal). Avoid generic names (Box, Item) unless it's a primitive.

2. **Variants** — Use consistent suffix or prop-style: size (sm, md, lg), state (default, hover, active), intent (primary, secondary). Format as: ComponentName--variant or componentNameVariant.

3. **Slot names** — For composition (header, body, footer, icon, label). Use lowercase, hyphenated if multi-word.

4. **Alternatives** — If the description is ambiguous, suggest 2–3 naming options with pros/cons.

## Output format
| Element | Name | Notes |
|---------|------|-------|
(Populate for each)

Include a brief rationale for the primary name choice.`,
    },
    useCases: ["Design system", "Handoff", "Developer handoff"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "form-critique",
    title: "Form UX Critique",
    tagline: "Improve form usability and conversion.",
    description:
      "Reviews form design for usability, error handling, and conversion best practices.",
    field: "ui-ux",
    tasks: ["critique", "structure"],
    format: "prompt",
    previewType: "critique",
    preview: { src: "/previews/ui-ux.svg", alt: "Form critique output" },
    content: {
      prompt: `You are a form UX specialist focused on conversion and usability. Audit the following form design.

## Input
{{formDescription}}

## Evaluation criteria
1. **Field order & grouping** — Is the flow logical (e.g., name before email)? Are related fields grouped (shipping vs billing)? Any unnecessary steps?

2. **Labels & placeholders** — Are labels visible (not placeholder-only)? Is placeholder text helpful? Any ambiguous labels (e.g., "Name" vs "Full name")?

3. **Error handling** — Inline vs summary errors? Clear, actionable messages? Error state visible (color + icon)? Validation timing (on blur vs submit)?

4. **CTA placement & copy** — Is the submit button above the fold on mobile? Is the copy action-oriented ("Create account" vs "Submit")? Secondary actions (Cancel, Back) appropriately de-emphasized?

## Output format
- **Conversion risks** — Top 3 issues that may hurt completion rate
- **Usability issues** — Bullet list with severity (high/medium/low)
- **Recommendations** — Specific, actionable fixes`,
    },
    useCases: ["Conversion optimization", "Usability review"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  // Brand/Visual +5
  {
    slug: "logo-direction",
    title: "Logo Direction Brief",
    tagline: "Write clear logo design direction.",
    description:
      "Creates structured creative briefs for logo design projects.",
    field: "brand-visual",
    tasks: ["direction", "structure"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/brand-visual.svg", alt: "Logo direction output" },
    content: {
      prompt: `Create a logo direction brief for: {{brandContext}}

Include:
1. Brand essence (2-3 sentences)
2. Visual direction (style, references)
3. Must-have elements
4. Avoid list
5. Deliverable specs

Format for designer handoff.`,
    },
    useCases: ["Logo projects", "Rebrand", "Creative briefs"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "color-palette-generator",
    title: "Color Palette Direction",
    tagline: "Define palette from brand context.",
    description:
      "Generates color palette direction and hex suggestions from brand description.",
    field: "brand-visual",
    tasks: ["direction", "transform"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/brand-visual.svg", alt: "Color palette output" },
    content: {
      prompt: `Given brand context: {{brandContext}}

Generate a color palette direction:
1. Primary (2-3 colors)
2. Secondary/accent
3. Neutrals
4. Semantic (success, error, warning)
5. Usage notes

Include hex values and WCAG notes.`,
    },
    useCases: ["Brand guidelines", "Design systems"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "tagline-generator",
    title: "Tagline Generator",
    tagline: "Generate on-brand taglines.",
    description:
      "Creates tagline options aligned with brand voice and positioning.",
    field: "brand-visual",
    tasks: ["direction", "transform"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/brand-visual.svg", alt: "Tagline output" },
    content: {
      prompt: `Brand: {{brandName}}
Voice: {{brandVoice}}
Positioning: {{positioning}}

Generate 10 tagline options. For each:
- The tagline
- Why it works
- Best use case

Keep under 6 words where possible.`,
    },
    useCases: ["Campaigns", "Landing pages", "Brand refresh"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "visual-mood-board",
    title: "Visual Mood Direction",
    tagline: "Define visual mood from brief.",
    description:
      "Translates brand brief into visual mood descriptors and reference directions.",
    field: "brand-visual",
    tasks: ["direction", "structure"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/brand-visual.svg", alt: "Mood direction output" },
    content: {
      prompt: `Brand brief: {{brief}}

Create visual mood direction:
1. 5-7 mood adjectives
2. Color temperature and saturation
3. Imagery style (photography, illustration)
4. Reference keywords for stock/search
5. Avoid list

Format for creative handoff.`,
    },
    useCases: ["Campaigns", "Brand guidelines", "Photo direction"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "competitor-visual-analysis",
    title: "Competitor Visual Analysis",
    tagline: "Compare brand visual positioning.",
    description:
      "Analyzes competitor visual identity and suggests differentiation angles.",
    field: "brand-visual",
    tasks: ["critique", "direction"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/brand-visual.svg", alt: "Competitor analysis output" },
    content: {
      prompt: `Brand: {{brand}}
Competitors: {{competitors}}

Analyze:
1. Visual patterns across competitors
2. Gaps and opportunities
3. Differentiation angles
4. Recommended visual strategy

Output as structured report.`,
    },
    useCases: ["Rebrand", "Positioning", "Strategy"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  // Motion/3D +4
  {
    slug: "easing-specs",
    title: "Easing Specification",
    tagline: "Generate easing curves for animations.",
    description:
      "Creates cubic-bezier and CSS easing specs from natural language descriptions.",
    field: "motion-3d",
    tasks: ["motion", "transform"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/motion-3d.svg", alt: "Easing specs output" },
    content: {
      prompt: `Describe the motion feel: {{description}}

Output:
1. cubic-bezier(x1, y1, x2, y2)
2. CSS easing keyword equivalent
3. Use case (entrance, exit, etc.)
4. Duration suggestion (ms)`,
    },
    useCases: ["Micro-interactions", "Design systems"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "lottie-brief",
    title: "Lottie Animation Brief",
    tagline: "Spec Lottie animations for developers.",
    description:
      "Creates handoff-ready specs for Lottie/JSON animation implementation.",
    field: "motion-3d",
    tasks: ["direction", "motion"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/motion-3d.svg", alt: "Lottie brief output" },
    content: {
      prompt: `Animation concept: {{concept}}

Create Lottie implementation brief:
1. Layer structure
2. Keyframe timing
3. Easing per property
4. Loop behavior
5. Performance notes (avoid masks, etc.)

Format for developer handoff.`,
    },
    useCases: ["Lottie production", "Developer handoff"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "3d-asset-direction",
    title: "3D Asset Direction",
    tagline: "Brief 3D renders and assets.",
    description:
      "Creates direction for 3D renders, style, lighting, and composition.",
    field: "motion-3d",
    tasks: ["direction", "structure"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/motion-3d.svg", alt: "3D direction output" },
    content: {
      prompt: `3D asset need: {{description}}

Create direction brief:
1. Style (realistic, stylized, low-poly)
2. Lighting and mood
3. Camera angle and composition
4. Color palette
5. Reference keywords

Format for 3D artist or AI tool.`,
    },
    useCases: ["Product viz", "Marketing assets", "AI 3D generation"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "keyframe-to-css",
    title: "Keyframe to CSS",
    tagline: "Convert keyframes to CSS animation.",
    description:
      "Translates keyframe descriptions into CSS @keyframes and animation properties.",
    field: "motion-3d",
    tasks: ["transform", "motion"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/motion-3d.svg", alt: "CSS animation output" },
    content: {
      prompt: `Keyframe description: {{keyframes}}

Output:
1. @keyframes block
2. animation shorthand
3. animation-fill-mode
4. Performance notes

Use transform/opacity where possible.`,
    },
    useCases: ["Frontend implementation", "Design handoff"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  // Production/Resize +4
  {
    slug: "social-crop-specs",
    title: "Social Crop Specifications",
    tagline: "Spec safe zones for social formats.",
    description:
      "Generates crop and safe zone specs for Instagram, LinkedIn, Twitter, etc.",
    field: "production-resize",
    tasks: ["resize", "transform"],
    format: "template",
    previewType: "structured",
    preview: { src: "/previews/production-resize.svg", alt: "Social crop specs" },
    content: {
      template: `Source: {{sourceDimensions}}
Platforms: {{platforms}}

Output table:
| Platform | Dimensions | Aspect | Safe zone | Notes |
Include safe zone px from edges for each.`,
    },
    useCases: ["Social campaigns", "Asset production"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "print-bleed-specs",
    title: "Print Bleed Specifications",
    tagline: "Generate print bleed and trim specs.",
    description:
      "Creates bleed, trim, and safe area specs for print production.",
    field: "production-resize",
    tasks: ["resize", "transform"],
    format: "template",
    previewType: "structured",
    preview: { src: "/previews/production-resize.svg", alt: "Print bleed specs" },
    content: {
      template: `Print format: {{format}}
Final size: {{dimensions}}

Output:
1. Trim size
2. Bleed (mm)
3. Safe area inset
4. Color mode (CMYK)
5. Resolution (DPI)`,
    },
    useCases: ["Print production", "Packaging", "Collateral"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "asset-naming-convention",
    title: "Asset Naming Convention",
    tagline: "Generate consistent file naming.",
    description:
      "Creates naming conventions for exported assets (icons, images, etc.).",
    field: "production-resize",
    tasks: ["structure", "transform"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/production-resize.svg", alt: "Naming convention" },
    content: {
      prompt: `Asset type: {{assetType}}
Context: {{context}}

Generate naming convention:
1. Pattern (e.g. [category]-[name]-[size].[ext])
2. Examples (5)
3. Variant handling (2x, dark, etc.)
4. Avoid list`,
    },
    useCases: ["Design systems", "Export workflows"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "format-converter-specs",
    title: "Format Converter Specs",
    tagline: "Spec export formats for assets.",
    description:
      "Creates format conversion specs (SVG, PNG, WebP, etc.) for different use cases.",
    field: "production-resize",
    tasks: ["transform", "resize"],
    format: "template",
    previewType: "structured",
    preview: { src: "/previews/production-resize.svg", alt: "Format specs" },
    content: {
      template: `Source: {{sourceType}}
Use cases: {{useCases}}

Output table:
| Format | Settings | Use case |
Include compression, resolution, color profile.`,
    },
    useCases: ["Asset pipelines", "Web optimization"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  // Systems/Critique +7
  {
    slug: "design-token-audit",
    title: "Design Token Audit",
    tagline: "Audit token consistency and coverage.",
    description:
      "Reviews design token structure for consistency, naming, and coverage.",
    field: "systems-critique",
    tasks: ["critique", "systems"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/systems-critique.svg", alt: "Token audit" },
    content: {
      prompt: `You are a design tokens architect. Audit the following token structure for consistency, scalability, and best practices.

## Token structure
{{tokens}}

## Audit criteria
1. **Naming consistency** — Follow a convention (e.g., category-scale-step: color-neutral-500, spacing-4)? Any outliers? camelCase vs kebab-case?

2. **Scale alignment** — Do spacing tokens follow a scale (4, 8, 12, 16...)? Type scale (modular or linear)? Are there arbitrary values that should be tokens?

3. **Semantic vs primitive** — Is there a clear split? Primitives (gray-500) vs semantics (text-primary, bg-surface)? Are semantics mapped to primitives correctly?

4. **Gaps & redundancies** — Missing tokens (e.g., no focus ring)? Duplicate or near-duplicate values? Unused tokens?

## Output format
- **Score** (1–5) per category with brief justification
- **Critical issues** — Must-fix list
- **Recommendations** — Prioritized improvements`,
    },
    useCases: ["Design system", "Token migration"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "component-consistency",
    title: "Component Consistency Audit",
    tagline: "Check component usage across screens.",
    description:
      "Identifies inconsistent component usage and suggests standardization.",
    field: "systems-critique",
    tasks: ["critique", "systems"],
    format: "prompt",
    previewType: "critique",
    preview: { src: "/previews/systems-critique.svg", alt: "Component audit" },
    content: {
      prompt: `You are a design system lead. Audit component usage for consistency and consolidation opportunities.

## Component inventory
{{inventory}}

## Screens / usage context
{{screens}}

## Analysis
1. **Duplicate patterns** — Identify components that solve the same need (e.g., Card vs Panel vs Tile). Map overlaps and suggest consolidation.

2. **Inconsistent variants** — Same component used with different props/APIs across screens? (e.g., Button with size="sm" vs size="small"). List inconsistencies.

3. **Missing components** — Patterns used repeatedly but not formalized? (e.g., empty states, loading skeletons). Recommend net-new components.

4. **Standardization** — Which components should be deprecated in favor of others? Migration path (low/medium/high effort)?

## Output format
- **Executive summary** — 2–3 sentences
- **Duplicate matrix** — Component A vs B: overlap, recommendation
- **Action plan** — Prioritized list (quick wins first)`,
    },
    useCases: ["Design system", "Consolidation"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "accessibility-checklist",
    title: "Accessibility Checklist",
    tagline: "Generate WCAG-focused audit checklist.",
    description:
      "Creates actionable accessibility checklists for UI screens.",
    field: "systems-critique",
    tasks: ["critique", "systems"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/systems-critique.svg", alt: "A11y checklist" },
    content: {
      prompt: `You are an accessibility specialist (WCAG 2.1 AA). Generate a focused audit checklist for the following screen or component.

## Screen/component description
{{description}}

## Checklist structure (WCAG 2.1 AA)

**Perceivable**
- Color contrast: 4.5:1 normal text, 3:1 large text
- Non-text content: alt text for images, labels for icons
- Adaptable: content reflows, no information lost
- Distinguishable: focus visible, no color-only cues

**Operable**
- Keyboard: all functionality available, no trap
- Enough time: no auto-advance without control
- Seizures: no flashing >3 per second
- Navigable: skip links, headings, focus order

**Understandable**
- Readable: language set, no jargon without explanation
- Predictable: no context change on focus
- Input assistance: labels, errors, help text

**Robust**
- Compatible: valid HTML, ARIA when needed, roles correct

## Output format
For each item: [ ] Checkbox | Criterion | Pass/fail criteria | How to test`,
    },
    useCases: ["A11y audit", "Pre-launch", "Compliance"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "handoff-review",
    title: "Handoff Review Checklist",
    tagline: "Ensure complete design handoff.",
    description:
      "Creates handoff review checklists for design-to-dev delivery.",
    field: "systems-critique",
    tasks: ["critique", "workflow"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/systems-critique.svg", alt: "Handoff checklist" },
    content: {
      prompt: `You are a design-to-dev handoff specialist. Generate a review checklist to ensure complete, developer-ready delivery.

## Handoff context
{{context}}

## Checklist categories

**1. Assets**
- Exports: correct format (SVG, PNG @1x/2x), naming convention
- Icons: consistent stroke, size variants
- Images: optimized, alt text provided

**2. Specs**
- Spacing: values or tokens, not "about 8px"
- Typography: font, size, weight, line-height
- Colors: hex/token, not "blue"
- Borders, radius, shadows: explicit values

**3. States**
- Default, hover, focus, active, disabled
- Error, loading, empty
- All states documented or designed

**4. Responsive**
- Breakpoints defined
- Behavior at each breakpoint (stack, hide, resize)
- Touch targets ≥44px on mobile

**5. Edge cases**
- Long text, empty state, max items
- Loading, error, permission denied

## Output format
[ ] Item | Category | Notes
Prioritize: P0 (blocking) / P1 (should have) / P2 (nice to have)`,
    },
    useCases: ["Handoff", "QA", "Developer handoff"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "icon-audit",
    title: "Icon Set Audit",
    tagline: "Audit icon consistency and coverage.",
    description:
      "Reviews icon sets for visual consistency, sizing, and coverage.",
    field: "systems-critique",
    tasks: ["critique", "systems"],
    format: "prompt",
    previewType: "critique",
    preview: { src: "/previews/systems-critique.svg", alt: "Icon audit" },
    content: {
      prompt: `You are an icon system specialist. Audit the following icon set for consistency and completeness.

## Icon set description
{{iconSet}}

## Audit criteria
1. **Stroke weight** — Consistent across set (e.g., 1.5px or 2px)? Any icons that feel heavier/lighter? Recommend standard.

2. **Size variants** — 16, 20, 24px? Are icons designed for each size or scaled? Pixel-grid alignment at small sizes?

3. **Naming convention** — Consistent? (e.g., icon-name, IconName, name-outline). Searchable? Avoid abbreviations unless standard (info, warn, err).

4. **Coverage gaps** — Missing common actions (edit, delete, share, settings)? Industry-specific needs? Suggest 5–10 additions.

5. **Duplicates & similar** — Icons that are too similar (check vs check-circle)? Redundant (arrow-right vs chevron-right)? Consolidation recommendations.

## Output format
- **Summary score** (1–5) with rationale
- **Critical issues** — Must-fix
- **Recommendations** — Prioritized list`,
    },
    useCases: ["Icon libraries", "Design systems"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "responsive-audit",
    title: "Responsive Design Audit",
    tagline: "Check breakpoint and layout consistency.",
    description:
      "Reviews responsive behavior across breakpoints for consistency.",
    field: "systems-critique",
    tasks: ["critique", "structure"],
    format: "prompt",
    previewType: "critique",
    preview: { src: "/previews/systems-critique.svg", alt: "Responsive audit" },
    content: {
      prompt: `You are a responsive design specialist. Audit the following breakpoints and layouts for consistency and mobile usability.

## Breakpoints
{{breakpoints}}

## Layouts (per breakpoint)
{{layouts}}

## Audit criteria
1. **Breakpoint logic** — Are breakpoints based on content or device? Common values (375, 768, 1024, 1280)? Any odd gaps (e.g., 900px only)? Mobile-first or desktop-first?

2. **Content reflow** — How does layout change between breakpoints? Single-column on mobile? Grid collapse (3→2→1)? Any horizontal scroll? Images/videos responsive?

3. **Touch targets** — Buttons/links ≥44×44px on mobile? Adequate spacing between tappable elements? Thumb-zone consideration for one-handed use?

4. **Consistency** — Same component behaves similarly across breakpoints? Navigation pattern (hamburger vs tabs) consistent? No orphan breakpoints (one screen at 900px, rest at 768/1024)?

## Output format
- **Overall** — Pass / Needs work / Fail
- **Breakpoint assessment** — Per breakpoint: strengths, issues
- **Recommendations** — Prioritized fixes`,
    },
    useCases: ["Responsive review", "Mobile QA"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
  {
    slug: "design-system-health",
    title: "Design System Health Check",
    tagline: "High-level system maturity assessment.",
    description:
      "Assesses design system maturity across documentation, adoption, and governance.",
    field: "systems-critique",
    tasks: ["critique", "systems", "workflow"],
    format: "prompt",
    previewType: "structured",
    preview: { src: "/previews/systems-critique.svg", alt: "Health check" },
    content: {
      prompt: `You are a design system maturity assessor. Evaluate the following design system and provide a health score with actionable recommendations.

## Design system context
{{context}}

## Assessment framework

**1. Documentation (1–5)**
- Completeness: usage, props, examples, do's/don'ts
- Clarity: can a new designer/dev use it without asking?
- Discoverability: structure, search, onboarding

**2. Component coverage (1–5)**
- Core UI: buttons, inputs, forms, navigation
- Patterns: cards, modals, tables, empty states
- Gaps: what's missing for common use cases?

**3. Token structure (1–5)**
- Primitives vs semantics
- Scale consistency (spacing, type, color)
- Theming support

**4. Governance (1–5)**
- Contribution model: who can add? process?
- Versioning: semantic? changelog?
- Deprecation: how are old components retired?

**5. Adoption (1–5)**
- Usage metrics (if available)
- Barriers to adoption
- Migration path from legacy

## Output format
- **Overall score** (average) + maturity stage (Emerging / Growing / Mature / Scaling)
- **Per area**: score, 2–3 strengths, 2–3 improvements
- **Top 5 priorities** — Ranked recommendations`,
    },
    useCases: ["System maturity", "Roadmap planning"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
];
