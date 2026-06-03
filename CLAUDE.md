# Quidax Demo — Design System & Figma MCP Rules

This document guides agents implementing Figma designs for **quidax-demo**. It encodes brand tokens, project conventions, and the required Figma MCP workflow.

## Current project state

| Area | Status |
|------|--------|
| Framework | **Not scaffolded yet** — default target: **React 18+** with **TypeScript** |
| Styling | **CSS custom properties** in `src/styles/tokens.css` (no Tailwind until added explicitly) |
| Components | **None** — create under `src/components/` |
| Storybook | **None** |
| Build | **None** — add Vite or Next.js when app work begins |

When scaffolding, align with the paths and token usage below rather than introducing parallel token systems.

---

## Design System Structure

### 1. Token definitions

**Location:** `src/styles/tokens.css`

**Format:** CSS custom properties on `:root`. Semantic aliases (`--foreground`, `--color-brand`) sit on top of raw palette values.

**Brand & palette (from Quidax live site — do not invent alternate purples)**

| Token | Hex | Role |
|-------|-----|------|
| `--color-brand` | `#6100A5` | Primary brand purple — CTAs, links, key accents |
| `--color-black` | `#000000` | Strong contrast, icons, emphasis |
| `--color-neutral-100` | `#F7F7F7` | Light surfaces |
| `--color-neutral-150` | `#F2F2EC` | Warm off-white sections |
| `--color-neutral-200` | `#DEDEDE` | Borders, dividers |
| `--color-neutral-250` | `#E3E2E2` | Subtle borders, disabled UI |

**Semantic tokens (from browser devtools on production UI)**

| Token | Hex | Role |
|-------|-----|------|
| `--foreground` | `#201749` | Primary text (deep navy-purple) |
| `--foreground-contrast` | `#4C4A55` | Secondary / muted text |
| `--background` | `#FFFFFF` | Page and card backgrounds |
| `--app-icon-color` | `#EC5DA0` | App-icon / accent pink (not primary brand) |

**Typography, sizing, gaps & spacing** — see dedicated sections below and `src/styles/tokens.css`, `src/styles/typography.css`, `src/styles/fonts.css`.

**Transformation:** No Style Dictionary or Theo pipeline yet. If tokens move to JSON/Figma Variables, keep `src/styles/tokens.css` generated or manually synced — single source of truth for code.

**Example usage:**

```css
.hero {
  color: var(--foreground);
  background-color: var(--color-surface-muted);
}

.cta {
  background-color: var(--color-brand);
  color: var(--background);
}
```

```tsx
// Prefer CSS modules or a small styled layer that references tokens — not raw hex
import styles from "./Button.module.css";
// .button { background: var(--color-brand); }
```

- **IMPORTANT:** Never hardcode `#6100A5`, `#201749`, or other palette hex values in components. Use `var(--*)` from `tokens.css`.
- **IMPORTANT:** Brand purple is `--color-brand` only. Do not substitute similar violets from Figma defaults.

---

## Typography (Uncut Sans Variable)

### Typeface

| Property | Value |
|----------|--------|
| **Family** | **Uncut Sans Variable** (variable font) |
| **CSS stack** | `"Uncut Sans Variable", "Uncut Sans", "UncutSans",` + system fallbacks in `tokens.css` |
| **Load** | `src/styles/fonts.css` → `public/fonts/uncut-sans-variable.woff2` (licensed file from design team) |
| **Axis** | `wght` (weight) — use `font-weight` or `font-variation-settings: "wght" N` |
| **Supported weights** | 300–700 (use tokens `--font-weight-regular` through `--font-weight-bold`) |

```css
.heading {
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-semibold);
}

.hero {
  font-variation-settings: "wght" 650;
}
```

- **IMPORTANT:** Use **Uncut Sans Variable** for all marketing and product UI text. Do not use Times, standalone `sans-serif`, or substitute other families unless design explicitly changes.
- **Do not** hardcode `font-size`, `line-height`, or `letter-spacing` in px when a semantic token or `.text-*` class exists.
- Import order at app entry: `fonts.css` → `tokens.css` → `typography.css` → `global.css`.

### Type scale (semantic sizes)

Base: **`1rem = 16px`** (`--font-size-root`). Headings use fluid `clamp()` where noted.

| Style | Token / class | Size | Line height | Tracking | Weight |
|-------|-------------|------|-------------|----------|--------|
| Display XL | `--text-display-xl-*` / `.text-display-xl` | 40–64px (fluid) | 1.05 | -0.03em | 600 |
| Display | `--text-display-*` / `.text-display` | 36–48px (fluid) | 1.1 | -0.02em | 600 |
| H1 | `--text-h1-*` / `.text-h1` | 32–40px (fluid) | 1.15 | -0.02em | 600 |
| H2 | `--text-h2-*` / `.text-h2` | 28–32px (fluid) | 1.2 | -0.015em | 600 |
| H3 | `--text-h3-*` / `.text-h3` | 24px | 1.25 | -0.01em | 600 |
| H4 | `--text-h4-*` / `.text-h4` | 20px | 1.3 | 0 | 500 |
| Body large | `--text-body-lg-*` / `.text-body-lg` | 18px | 1.55 | 0 | 400 |
| Body | `--text-body-*` / `.text-body` | 16px | 1.5 | 0 | 400 |
| Body small | `--text-body-sm-*` / `.text-body-sm` | 14px | 1.45 | 0.005em | 400 |
| Caption | `--text-caption-*` / `.text-caption` | 12px | 1.4 | 0.01em | 400 |
| Label / overline | `--text-label-*` / `.text-label` | 12px | 1.2 | 0.08em | 500, uppercase |

**Usage rules**

- **Hero / page titles:** Display XL or Display.
- **Section titles:** H1 or H2.
- **Card titles:** H3 or H4.
- **Paragraphs & UI:** Body or Body large.
- **Metadata, hints:** Body small or Caption (often with `.text-muted` → `--foreground-contrast`).
- **Eyebrows, chips:** Label.
- Tighter negative tracking on large display type only; do not apply display tracking to body copy.

**Figma mapping:** Map Figma text styles to the closest semantic row above. If Figma size differs by ≤2px, use the token; if substantially different, add a one-off token in `tokens.css` and document it — do not scatter px values in components.

---

## Spacing, gaps & layout rhythm

### Spacing scale (4px base)

All layout spacing uses **`--space-*`** tokens from `tokens.css`. Multiples of **4px** (0.25rem).

| Token | rem | px | Typical use |
|-------|-----|-----|-------------|
| `--space-0` | 0 | 0 | Reset |
| `--space-1` | 0.25 | 4 | Tight icon padding, hairline stacks |
| `--space-2` | 0.5 | 8 | Inline gaps, dense lists |
| `--space-3` | 0.75 | 12 | Input vertical padding, compact gaps |
| `--space-4` | 1 | 16 | Default stack gap, card inner tight |
| `--space-5` | 1.25 | 20 | — |
| `--space-6` | 1.5 | 24 | Card padding, section sub-blocks |
| `--space-8` | 2 | 32 | Large component gaps |
| `--space-10` | 2.5 | 40 | — |
| `--space-12` | 3 | 48 | Between content groups |
| `--space-16` | 4 | 64 | **Section vertical padding** (production pattern) |
| `--space-20` | 5 | 80 | Large section breaks |
| `--space-24` | 6 | 96 | Hero / footer vertical rhythm |

```css
.section {
  padding-top: var(--section-padding-y);
  padding-bottom: var(--section-padding-y);
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);
}
```

`--rem-scaler` defaults to `1`; increase slightly on large viewports only if design specifies global scale (e.g. `1.05` at `min-width: 90rem`).

### Gap tokens (flex & grid)

Use **`--gap-*`** for `gap`, `row-gap`, and `column-gap` — not arbitrary rem values.

| Token | Maps to | px | Use |
|-------|---------|-----|-----|
| `--gap-xs` | `--space-2` | 8 | Icon + label, tight toolbars |
| `--gap-sm` | `--space-3` | 12 | Form fields, inline controls |
| `--gap-md` | `--space-4` | 16 | **Default** stack / grid gap |
| `--gap-lg` | `--space-6` | 24 | Card content, feature columns |
| `--gap-xl` | `--space-8` | 32 | Section sub-grids |
| `--gap-2xl` | `--space-12` | 48 | Major blocks within a section |
| `--gap-3xl` | `--space-16` | 64 | Rare; large marketing layouts |

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap-default); /* --gap-md */
}
```

- **IMPORTANT:** Prefer `gap` over margin hacks between children.
- **IMPORTANT:** Do not use spacing values outside the scale (e.g. `13px`, `22px`) unless added as a named token.

### Layout tokens

| Token | Value | Use |
|-------|--------|-----|
| `--section-padding-y` | `calc(4rem × rem-scaler)` | Top/bottom of page sections |
| `--section-padding-x` | `clamp(1rem, 4vw, 2rem)` | Horizontal page inset |
| `--container-max` | `75rem` (1200px) | Centered content width |
| `--container-padding` | same as section-x | Wrapper horizontal padding |
| `--card-padding` | `--space-6` (24px) | Card bodies |
| `--card-gap` | `--gap-md` | Space between card header/body/footer |
| `--button-padding-y` / `-x` | 12px / 24px | Primary button hit area |
| `--input-padding-y` / `-x` | 12px / 16px | Text inputs |

### Spacing decisions (quick guide)

| Situation | Token |
|-----------|--------|
| Between label and input | `--space-2` |
| Between form fields | `--gap-sm` or `--space-4` |
| Between paragraph blocks | `--space-4` or `--space-6` |
| Between section title and body | `--space-4` to `--space-6` |
| Between major sections | `--section-padding-y` |
| Page edge inset | `--section-padding-x` inside max-width container |
| Button icon to label | `--gap-xs` |

### Figma → code (spacing)

1. Read Figma auto-layout **gap** and **padding** in px.
2. Round to the **nearest 4px** step on the scale.
3. Apply the matching `--space-*` or `--gap-*` token.
4. Section frames with ~64px vertical padding → `--section-padding-y`.

---

### 2. Component library

**Planned locations:**

```
src/
  components/
    ui/           # Primitives: Button, Input, Badge, IconButton
    layout/       # Container, Stack, Grid, Section
    features/     # Page-specific compositions
  styles/
    tokens.css    # Design tokens
    fonts.css     # Uncut Sans Variable @font-face
    typography.css # Semantic .text-* classes
    global.css    # Resets, base body styles
```

**Architecture:**

- Functional React components with TypeScript props.
- One component per folder: `Button/Button.tsx`, `Button/Button.module.css`, `Button/index.ts`.
- Export public API from `index.ts`; default export optional.
- Variants via union types: `variant: "primary" | "secondary" | "ghost"`.
- Every component accepts optional `className` for composition.

**Documentation:** Add Storybook under `src/stories/` when the app is scaffolded. Until then, document variants in component JSDoc.

**Figma mapping:** Prefer Code Connect (`.figma.ts`) once components exist. Map Figma component names to `src/components/ui/*`.

---

### 3. Frameworks & libraries

| Concern | Choice |
|---------|--------|
| UI | React 18+ |
| Language | TypeScript (strict) |
| Styling | CSS Modules + `tokens.css` (Tailwind only if explicitly added to the repo) |
| Bundler | Vite (recommended) or Next.js App Router |
| Package manager | Match repo lockfile when present; default `npm` |

**Figma MCP output** is often React + Tailwind. **Translate** that output: replace Tailwind classes with CSS Modules and `var(--token)` references.

---

### 4. Asset management

| Asset type | Location |
|------------|----------|
| Raster / SVG from Figma | `public/assets/` or `src/assets/` |
| Optimized images | Use `width`/`height`, lazy loading, WebP where appropriate |
| Fonts | `public/fonts/` + `src/styles/fonts.css` |

- **IMPORTANT:** If Figma MCP returns a **localhost** asset URL, use it directly in implementation — do not substitute placeholders.
- **IMPORTANT:** Do not install icon packs (react-icons, lucide, etc.) for assets already supplied by Figma MCP.
- No CDN config until deployment target is chosen.

---

### 5. Icon system

- Icons from Figma export as **SVG** into `src/assets/icons/` or inline in components.
- Naming: `icon-{name}.svg` (kebab-case), React wrapper `Icon{Name}.tsx`.
- Size via CSS: `width`/`height` using `rem` or tokenized `--icon-size-sm|md|lg`.
- Tint with `currentColor` or `fill: var(--foreground)` — accent icons may use `var(--app-icon-color)`.

---

### 6. Styling approach

- **Methodology:** CSS Modules per component + global tokens.
- **Global styles:** `src/styles/global.css` imported once at app entry.
- **Responsive:** Mobile-first; heading sizes use fluid tokens; section padding uses `--section-padding-y` and `--rem-scaler`.
- **No** inline `style` for colors, font sizes, or spacing except truly dynamic runtime values.

---

### 7. Project structure

```
quidax-demo/
  CLAUDE.md                 # This file
  src/
    components/
    styles/
    assets/
  public/
  .cursor/rules/            # Cursor agent rules (optional supplements)
```

**Feature organization:** Colocate feature components under `src/components/features/{feature}/`. Shared UI stays in `src/components/ui/`.

**Imports:** When `tsconfig` paths exist, use `@/components/...`, `@/styles/...`.

---

## Figma MCP integration rules

These rules apply to **every** Figma-driven change.

### Required flow (do not skip)

1. Run **`get_design_context`** for the exact `fileKey` and `nodeId` (convert `-` to `:` in node IDs from URLs).
2. If truncated, run **`get_metadata`** for the frame map, then re-fetch only required nodes.
3. Run **`get_screenshot`** for visual reference of the variant being built.
4. Download assets from the MCP payload; use localhost sources as-is when provided.
5. Implement using this repo’s tokens and component paths — not raw Figma Tailwind output.
6. Compare result to the screenshot before marking complete.

### Implementation rules

- Treat MCP output as **design intent**, not final code style.
- Map Figma fills/text colors to tokens:

  | Figma / site value | Code token |
  |--------------------|------------|
  | `#6100A5` | `var(--color-brand)` |
  | `#201749` | `var(--foreground)` |
  | `#4C4A55` | `var(--foreground-contrast)` |
  | `#FFFFFF` | `var(--background)` |
  | `#F7F7F7` | `var(--color-neutral-100)` |
  | `#F2F2EC` | `var(--color-neutral-150)` |
  | `#DEDEDE` | `var(--color-neutral-200)` |
  | `#E3E2E2` | `var(--color-neutral-250)` |
  | `#EC5DA0` | `var(--app-icon-color)` |
  | `#000000` | `var(--color-black)` |

- Reuse existing components from `src/components/ui/` before creating duplicates.
- **search_design_system** (Figma MCP) before building new primitives if a Quidax Figma library is linked.
- Strive for **1:1 visual parity** with the screenshot; note intentional deviations in PR/commit text.

### Code Connect

When components exist, add `.figma.ts` mappings via **`add_code_connect_map`** / **`get_code_connect_map`**. Snippets should import from `@/components/ui/...` and use token-based styling.

---

## Asset handling

- Store downloads in `public/assets/` (static) or `src/assets/` (imported).
- SVGs: preserve `viewBox`; prefer single-color icons with `currentColor`.
- **Do not** add placeholder gray boxes when real assets are available from MCP.

---

## Accessibility & quality

- Text on `--color-brand` backgrounds: ensure WCAG AA contrast (often white `#FFFFFF` text).
- Interactive elements: visible focus rings using brand or foreground color.
- Prefer semantic HTML (`button`, `nav`, `main`, headings in order).

---

## General component rules

- **IMPORTANT:** Place new shared UI in `src/components/ui/`.
- **IMPORTANT:** Use tokens from `src/styles/tokens.css` for colors, type sizes, spacing, and gaps.
- **IMPORTANT:** Use Uncut Sans Variable via `var(--font-family-sans)` and semantic type tokens — not ad-hoc px typography.
- Name components **PascalCase**; files match component name.
- Props: explicit TypeScript interfaces; no `any`.
- Extract magic numbers to tokens or named constants in the same module.

---

## Maintaining this document

Update `CLAUDE.md`, `tokens.css`, and `typography.css` together when:

- Brand palette changes in Figma Variables
- Type scale or spacing scale changes in Figma
- New semantic text styles or spacing steps are added
- Stack choice changes (e.g. Tailwind adopted)

---

## Quick reference — brand color

**Primary brand purple:** `#6100A5` → `var(--color-brand)`

Use for primary buttons, active states, and brand moments — not for body text (use `--foreground`).
