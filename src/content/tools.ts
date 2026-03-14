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
      prompt: `You are a senior UI designer. Analyze this interface:

{{interfaceDescription}}

Provide structured critique on:
1. Button hierarchy (primary vs secondary vs tertiary)
2. CTA prominence and placement
3. Visual weight distribution
4. Action affordance clarity

Format your response as bullet points with specific recommendations.`,
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
      prompt: `You are an accessibility specialist. Given these hex color values:

{{colorValues}}

Analyze:
1. Contrast ratios for text on background (WCAG AA/AAA)
2. Color blindness considerations
3. Suggested alternative values if needed

Provide a table with: color pair, ratio, pass/fail, recommendation.`,
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
      prompt: `Analyze this layout/spacing specification:

{{layoutSpec}}

Check:
1. Consistency with 4/8px grid
2. Token usage (if provided)
3. Rhythm and visual hierarchy
4. Edge cases and outliers

Output as a structured report with pass/fail per section.`,
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
      prompt: `Analyze this typography specification or screenshot. Evaluate:
1. Type scale consistency (h1–h6, body, caption)
2. Line height and letter spacing
3. Readability and contrast
4. Hierarchy clarity

Output as bullet-point recommendations.`,
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
      prompt: `Analyze this layout/screenshot. Check:
1. Grid alignment and consistency
2. Visual balance and whitespace
3. Content hierarchy
4. Responsive considerations

Provide structured feedback with specific fixes.`,
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
      prompt: `Given this component description: {{description}}

Suggest naming following best practices:
1. Primary name (PascalCase)
2. Variants (e.g. size, state)
3. Slot names for composition
4. Alternative names if ambiguous

Format as a naming table.`,
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
      prompt: `Analyze this form design. Evaluate:
1. Field order and grouping
2. Label and placeholder clarity
3. Error state handling
4. CTA placement and copy

Provide actionable recommendations.`,
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
      prompt: `Token structure: {{tokens}}

Audit for:
1. Naming consistency
2. Scale alignment (spacing, type)
3. Semantic vs primitive balance
4. Gaps and redundancies

Output as structured report.`,
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
      prompt: `Component inventory: {{inventory}}
Screens: {{screens}}

Analyze:
1. Duplicate patterns (same need, different component)
2. Inconsistent variants
3. Missing components
4. Standardization recommendations`,
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
      prompt: `Screen/component: {{description}}

Generate WCAG 2.1 AA checklist:
1. Perceivable (contrast, alt, etc.)
2. Operable (keyboard, focus)
3. Understandable (labels, errors)
4. Robust (semantics, ARIA)

Format as checkable items with pass/fail criteria.`,
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
      prompt: `Handoff context: {{context}}

Generate checklist:
1. Assets (exports, naming)
2. Specs (spacing, type, colors)
3. States (hover, focus, error)
4. Responsive breakpoints
5. Edge cases

Format as pass/fail items.`,
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
      prompt: `Icon set: {{iconSet}}

Audit:
1. Stroke weight consistency
2. Size variants
3. Naming convention
4. Coverage gaps
5. Duplicate/similar icons

Output as recommendations.`,
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
      prompt: `Breakpoints: {{breakpoints}}
Layouts: {{layouts}}

Audit:
1. Breakpoint logic
2. Content reflow
3. Touch targets (mobile)
4. Consistency across views

Output as structured feedback.`,
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
      prompt: `Design system context: {{context}}

Assess across:
1. Documentation (completeness, clarity)
2. Component coverage
3. Token structure
4. Governance (contribution, versioning)
5. Adoption metrics

Output as score + recommendations per area.`,
    },
    useCases: ["System maturity", "Roadmap planning"],
    testedWith: ["Claude 3.5"],
    updatedAt: "2025-03-14",
  },
];
