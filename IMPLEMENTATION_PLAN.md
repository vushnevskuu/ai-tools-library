# AI Tools Library — Implementation Plan

## Audit Summary

### Current State
- **Explore:** Search + FilterBar (field, task, format) работают; masonry grid; 33 tools. Проблема: фильтры слишком компактны, нет сортировки, нет фильтра testedWith/builder.
- **Tool cards:** Всегда показывают одно изображение (src или before); previewType (critique, beforeAfter, structured, miniWorkflow) не используется.
- **Design System Builder:** Только primary color, font, radius. Нет semantic tokens, нет расширенных секций.
- **Homepage:** Builders секция есть, но можно усилить.

### Files Inventory

| Area | Files to Change |
|------|-----------------|
| Explore | `src/app/explore/page.tsx`, `src/components/explore/ExploreToolsGrid.tsx`, `src/components/explore/FilterBar.tsx`, `src/components/explore/SearchInput.tsx` |
| Tool cards | `src/components/cards/ToolCard.tsx`, new `src/components/cards/ToolPreviewBlock.tsx` |
| Design System Builder | `src/app/builders/design-system/page.tsx`, new `src/lib/builder/` (store, types, formatters) |
| Homepage | `src/app/page.tsx` |
| Data | `src/lib/data.ts` (add getFilteredTools with testedWith), `src/types/index.ts` (optional: builderRelated flag) |

---

## Phase 1 — Explore Page (Real Catalog)

### 1.1 Add sorting
- **File:** `src/components/explore/ExploreToolsGrid.tsx`
- Add `sort` URL param: `newest`, `title`, `field`
- Add `SortSelect` component or inline sort chips
- Filter before sort; apply sort to filtered list

### 1.2 Add testedWith filter
- **File:** `src/lib/data.ts` — add `getToolsByTestedWith` or extend `getFilteredTools`
- **File:** `src/components/explore/FilterBar.tsx` — add testedWith chips (Claude, GPT-4, etc.) from aggregated tool data
- **File:** `src/types/index.ts` — testedWith already exists on Tool

### 1.3 Improve filter UX
- **File:** `src/components/explore/FilterBar.tsx`
- Slightly larger touch targets
- Collapsible "More filters" for testedWith
- Show result count next to Explore title

### 1.4 Result count
- **File:** `src/app/explore/page.tsx` or `ExploreToolsGrid.tsx`
- Display "X tools" after filters

---

## Phase 2 — Functional Previews (Replace Placeholders)

### 2.1 ToolPreviewBlock component
- **New file:** `src/components/cards/ToolPreviewBlock.tsx`
- Props: `tool: Tool`
- Switch on `tool.previewType`:
  - `image` → existing Image
  - `beforeAfter` → side-by-side before/after
  - `critique` → snippet block (outputExample or truncated prompt)
  - `structured` → mini table/list from outputExample
  - `miniWorkflow` → simple step indicators
- Fallback: if no real content, show compact "output type" badge + tagline

### 2.2 ToolCard integration
- **File:** `src/components/cards/ToolCard.tsx`
- Replace Image block with `<ToolPreviewBlock tool={tool} />`
- Keep aspect ratio; make preview block fill the area

### 2.3 Content enhancements
- **File:** `src/content/tools.ts` — ensure tools with critique/structured have `outputExample` for preview snippets
- Add `outputSnippet` optional field to Tool type if needed for card-only preview

---

## Phase 3 — Design System Builder (Real Builder)

### 3.1 State & types
- **New file:** `src/lib/builder/types.ts` — DesignSystemState interface
- **New file:** `src/lib/builder/store.ts` — Zustand store (or keep useState in page for MVP)
- State shape: brand, colors, typography, spacing, radius, shadows, borders, motion, semanticMap

### 3.2 Left panel — Controls
- **File:** `src/app/builders/design-system/page.tsx` or split into `BuilderControls.tsx`
- Collapsible sections: Brand, Colors, Typography, Spacing, Radius, Shadows, Borders, Motion
- Brand: systemName, productType, styleDirection, platform, density, mode (light/dark)
- Colors: primary, secondary, accent, success, warning, danger, neutral scale, bg, surface, text, border
- Typography: fontFamily, typeScale, weights, lineHeights, headingStyle, bodyStyle
- Spacing: xs–2xl scale + density presets
- Radius: none/small/medium/large/pill
- Shadows: subtle, medium, strong
- Borders: width, color, divider
- Motion: fast, normal, slow, easing

### 3.3 Semantic layer
- **File:** `src/lib/builder/semantic.ts`
- Map primitives → semantic tokens (bg.default, text.primary, action.primary.bg, etc.)
- Used by preview and export

### 3.4 Center panel — Live preview tabs
- **New file:** `src/components/builder/BuilderPreview.tsx`
- Tabs: Foundations | Components | App UI | Marketing UI
- Foundations: color swatches, type scale, spacing, radius, shadows
- Components: buttons, inputs, selects, checkbox, switch, badges, cards, alerts
- Component states: default, hover, active, focus, disabled
- App UI: mini sidebar + topbar + cards + table
- Marketing UI: hero + feature cards + CTA

### 3.5 Right panel — Export tabs
- **New file:** `src/components/builder/ExportPanel.tsx`
- Tabs: JSON Tokens | CSS Variables | Tailwind Theme | Tokens Studio | Prompt
- Actions: Copy, Download (JSON/CSS/Tailwind), Reset, Regenerate
- **New files:** `src/lib/builder/formatters/json.ts`, `css.ts`, `tailwind.ts`, `tokens-studio.ts`

---

## Phase 4 — Homepage Strengthening

### 4.1 Builders section
- **File:** `src/app/page.tsx`
- Larger Design System Builder block
- Add "Try it" or "Open builder" as primary CTA
- Optional: mini live preview (e.g. color + button) if feasible

### 4.2 Messaging
- Hero: emphasize "visual library + interactive builders"
- Add short line: "Not a prompt archive — real design outputs"

---

## Phase 5 — Polish

### 5.1 States & spacing
- Consistent focus states, hover states
- Ensure EmptyState, FilterBar, cards feel cohesive

### 5.2 Navigation
- Verify: Home, Explore, Builders, About (already in place)

---

## Implementation Sequence

```
Phase 1 (Explore)     → Phase 2 (Previews) → Phase 3 (Builder) → Phase 4 (Homepage) → Phase 5 (Polish)
     │                        │                    │                    │
     ├─ Sort                  ├─ ToolPreviewBlock ├─ Store + types    ├─ Builders block
     ├─ testedWith filter     ├─ ToolCard refactor ├─ Controls panel   └─ Messaging
     ├─ Filter UX             └─ Content check     ├─ Semantic layer
     └─ Result count                                 ├─ Preview tabs
                                                    └─ Export panel
```

---

## MVP Scope Decisions

1. **Builder:** Use collapsible sections; start with Brand, Colors, Typography, Spacing, Radius visible; Shadows/Borders/Motion in "Advanced".
2. **Previews:** For tools without outputExample, show formatted tagline + format badge instead of generic placeholder.
3. **Explore sort:** Implement `newest` (by updatedAt) and `title`; skip `field` for MVP if time-constrained.
4. **testedWith filter:** Extract unique values from tools; add as optional filter row.
