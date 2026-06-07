# Quidax Design System

Design tokens, component specifications, composition patterns, and governance rules for the Quidax product design system.

The companion design file is `dsm-design.pen` — open it in the Pencil editor to see all tokens, components, and compositions rendered visually.

> **Font note:** All code must use **Uncut Sans Variable** via `var(--font-family-sans)` (loaded from `public/fonts/uncut-sans-variable.woff2`).

---

## Table of Contents

1. [Design File Structure](#design-file-structure)
2. [Variables (Design Tokens)](#variables-design-tokens)
3. [Type Scale](#type-scale)
4. [Elements](#elements)
5. [Components](#components)
6. [Composition Patterns](#composition-patterns)
7. [Consumption Rules](#consumption-rules)
8. [Update Rules](#update-rules)
9. [Deprecation Rules](#deprecation-rules)

---

## Design File Structure

The `.pen` file is organized into three top-level sections for discoverability:

```
dsm-design.pen
├── Elements                        ← Atomic UI primitives
│   ├── BUTTONS
│   │   ├── Button/Ghost
│   │   ├── Button/Secondary
│   │   └── Button/Primary
│   ├── INPUT
│   │   └── Input
│   ├── BADGES
│   │   ├── Badge/Default
│   │   ├── Badge/Brand
│   │   ├── Badge/Success
│   │   └── Badge/Warning
│   ├── CONTROLS
│   │   ├── Avatar
│   │   ├── Toggle/Off
│   │   ├── Toggle/On
│   │   ├── Chip
│   │   └── Chip/Active
│   ├── TABS
│   │   ├── Tab
│   │   └── Tab/Active
│   └── DIVIDER
│       └── Divider
│
├── Components                      ← Composed UI patterns
│   ├── CARD
│   │   └── Card
│   ├── ALERTS
│   │   ├── Alert/Info
│   │   ├── Alert/Success
│   │   ├── Alert/Warning
│   │   └── Alert/Error
│   ├── DATA
│   │   ├── CoinRow
│   │   ├── StatCard
│   │   └── TransactionRow
│   ├── NAVIGATION
│   │   └── NavBar
│   └── TABLE
│       └── MarketTableRow
│
└── Compositions                    ← Assembled screens and showcases
    ├── MARKET TABLE                ← Full table with header + data rows
    └── SHOWCASE                    ← Quidax Design System documentation frame
```

**Naming conventions:**
- Elements use `Category/Variant` format (e.g. `Button/Primary`, `Badge/Success`)
- Stateful variants append the state (e.g. `Toggle/On`, `Chip/Active`, `Tab/Active`)
- Components use PascalCase (e.g. `CoinRow`, `StatCard`, `MarketTableRow`)

---

## Variables (Design Tokens)

All tokens are defined as Pencil variables. Reference them with the `$` prefix in the design file (e.g. `$--color-brand`) and as CSS custom properties in code (e.g. `var(--color-brand)`).

### Colors — Brand & Palette

| Pencil Variable | CSS Token | Hex | Role |
|-----------------|-----------|-----|------|
| `$--color-brand` | `var(--color-brand)` | `#6100A5` | Primary brand purple — CTAs, links, active states |
| `$--foreground` | `var(--foreground)` | `#201749` | Primary text (deep navy-purple) |
| `$--foreground-contrast` | `var(--foreground-contrast)` | `#4C4A55` | Secondary / muted text |
| `$--background` | `var(--background)` | `#FFFFFF` | Page and card backgrounds |
| `$--color-neutral-100` | `var(--color-neutral-100)` | `#F7F7F7` | Light surfaces, inactive fills |
| `$--color-neutral-150` | `var(--color-neutral-150)` | `#F2F2EC` | Warm off-white sections |
| `$--color-neutral-200` | `var(--color-neutral-200)` | `#DEDEDE` | Borders, dividers |
| `$--color-neutral-250` | `var(--color-neutral-250)` | `#E3E2E2` | Subtle borders, disabled UI |
| `$--color-black` | `var(--color-black)` | `#000000` | Strong contrast, emphasis |
| `$--app-icon-color` | `var(--app-icon-color)` | `#EC5DA0` | Accent pink — app icons only, not primary brand |

### Colors — Semantic Status

| Pencil Variable | CSS Token | Hex | Role |
|-----------------|-----------|-----|------|
| `$--color-success-bg` | `var(--color-success-bg)` | `#D1FAE5` | Success background (badges, alerts) |
| `$--color-success-fg` | `var(--color-success-fg)` | `#065F46` | Success foreground text |

> **Hardcoded status colors (not yet tokenized):** The following colors appear in components but do not yet have corresponding variables. Tokenize them before using in new components.
>
> | Hex | Usage | Suggested Variable |
> |-----|-------|--------------------|
> | `#3B82F6` | Alert/Info icon | `--color-info-fg` |
> | `#EFF6FF` | Alert/Info background | `--color-info-bg` |
> | `#16A34A` | Positive price change, trends | `--color-positive` |
> | `#D97706` | Alert/Warning icon | `--color-warning-fg` |
> | `#FFFBEB` | Alert/Warning background | `--color-warning-bg` |
> | `#DC2626` | Alert/Error icon | `--color-error-fg` |
> | `#FEF2F2` | Alert/Error background | `--color-error-bg` |
> | `#F0FDF4` | Alert/Success background | (merge with `--color-success-bg`) |

### Colors — Aliases

Convenience tokens that map to canonical values. Use the canonical token when the intent is specific; use the alias when the semantic meaning matches.

| Pencil Variable | Resolves To | When to Use |
|-----------------|-------------|-------------|
| `$--primary` | `$--color-brand` (`#6100A5`) | Generic "primary action" context |
| `$--muted-foreground` | `$--foreground-contrast` (`#4C4A55`) | Muted/secondary text |
| `$--border` | `$--color-neutral-200` (`#DEDEDE`) | Default border color |
| `$--card` | `$--background` (`#FFFFFF`) | Card surface fill |

### Typography

| Pencil Variable | CSS Token | Value |
|-----------------|-----------|-------|
| `$--font-family-sans` | `var(--font-family-sans)` | `"Uncut Sans Variable"` |
| `$--font-weight-regular` | `var(--font-weight-regular)` | `400` |
| `$--font-weight-medium` | `var(--font-weight-medium)` | `500` |
| `$--font-weight-semibold` | `var(--font-weight-semibold)` | `600` |
| `$--font-weight-bold` | `var(--font-weight-bold)` | `700` |

### Spacing (4px base grid)

| Pencil Variable | CSS Token | px | Typical Use |
|-----------------|-----------|-----|-------------|
| `$--space-1` | `var(--space-1)` | 4 | Tight icon padding |
| `$--space-2` | `var(--space-2)` | 8 | Inline gaps, dense lists |
| `$--space-3` | `var(--space-3)` | 12 | Input vertical padding |
| `$--space-4` | `var(--space-4)` | 16 | Default stack gap |
| `$--space-6` | `var(--space-6)` | 24 | Card padding, sub-blocks |
| `$--space-8` | `var(--space-8)` | 32 | Large component gaps |
| `$--space-12` | `var(--space-12)` | 48 | Between content groups |
| `$--space-16` | `var(--space-16)` | 64 | Section vertical padding |
| `$--space-20` | `var(--space-20)` | 80 | Large section breaks |
| `$--space-24` | `var(--space-24)` | 96 | Hero / footer rhythm |

### Gap Tokens (flex & grid)

| Pencil Variable | CSS Token | px | Use |
|-----------------|-----------|-----|-----|
| `$--gap-xs` | `var(--gap-xs)` | 8 | Icon + label, tight toolbars |
| `$--gap-sm` | `var(--gap-sm)` | 12 | Form fields, inline controls |
| `$--gap-md` | `var(--gap-md)` | 16 | Default stack / grid gap |
| `$--gap-lg` | `var(--gap-lg)` | 24 | Card content, feature columns |
| `$--gap-xl` | `var(--gap-xl)` | 32 | Section sub-grids |
| `$--gap-2xl` | `var(--gap-2xl)` | 48 | Major blocks within a section |
| `$--gap-3xl` | `var(--gap-3xl)` | 64 | Large marketing layouts |

### Border Radius

| Pencil Variable | CSS Token | px | Use |
|-----------------|-----------|-----|-----|
| `$--radius-sm` | `var(--radius-sm)` | 4 | Subtle rounding |
| `$--radius-md` | `var(--radius-md)` | 8 | Inputs, small cards, buttons |
| `$--radius-lg` | `var(--radius-lg)` | 12 | Cards, modals, panels |
| `$--radius-full` | `var(--radius-full)` | 9999 | Pill buttons, badges, avatars |

### Component Padding

| Pencil Variable | CSS Token | px | Component |
|-----------------|-----------|-----|-----------|
| `$--button-padding-y` | `var(--button-padding-y)` | 12 | Button vertical |
| `$--button-padding-x` | `var(--button-padding-x)` | 24 | Button horizontal |
| `$--input-padding-y` | `var(--input-padding-y)` | 12 | Input vertical |
| `$--input-padding-x` | `var(--input-padding-x)` | 16 | Input horizontal |
| `$--card-padding` | `var(--card-padding)` | 24 | Card body |
| `$--section-padding-y` | `var(--section-padding-y)` | 64 | Section vertical |

---

## Type Scale

Base: `1rem = 16px`. Headings use fluid `clamp()` in code.

| Style | Class | Size | Line Height | Weight | Tracking |
|-------|-------|------|-------------|--------|----------|
| Display XL | `.text-display-xl` | 40-64px (fluid) | 1.05 | 600 | -0.03em |
| Display | `.text-display` | 36-48px (fluid) | 1.1 | 600 | -0.02em |
| H1 | `.text-h1` | 32-40px (fluid) | 1.15 | 600 | -0.02em |
| H2 | `.text-h2` | 28-32px (fluid) | 1.2 | 600 | -0.015em |
| H3 | `.text-h3` | 24px | 1.25 | 600 | -0.01em |
| H4 | `.text-h4` | 20px | 1.3 | 500 | 0 |
| Body Large | `.text-body-lg` | 18px | 1.55 | 400 | 0 |
| Body | `.text-body` | 16px | 1.5 | 400 | 0 |
| Body Small | `.text-body-sm` | 14px | 1.45 | 400 | +0.005em |
| Caption | `.text-caption` | 12px | 1.4 | 400 | +0.01em |
| Label | `.text-label` | 12px | 1.2 | 500 | +0.08em, uppercase |

**Usage guidance:**
- Hero / page titles: Display XL or Display
- Section titles: H1 or H2
- Card titles: H3 or H4
- Paragraphs & UI: Body or Body Large
- Metadata, hints: Body Small or Caption (pair with `$--foreground-contrast`)
- Eyebrows, chips, badge labels: Label

---

## Elements

Atomic primitives that cannot be decomposed further. All elements are reusable Pencil components.

### Button

Three variants. Pill shape (`cornerRadius: 9999`). Padding: `12px 24px`. Contains an icon (Lucide `arrow-right`, 16x16) and a label (14px, weight 600).

| Component | Fill | Stroke | Icon Color | Text Color |
|-----------|------|--------|------------|------------|
| `Button/Primary` | `$--color-brand` | none | `#FFFFFF` | `#FFFFFF` |
| `Button/Secondary` | `$--background` | `$--color-brand` 1.5px | `$--color-brand` | `$--color-brand` |
| `Button/Ghost` | transparent | none | `$--color-brand` | `$--foreground` |

**Overridable descendants:**
| Descendant | ID | Overridable Properties |
|------------|-----|----------------------|
| `icon` | varies | `icon`, `fill`, `enabled` (set `false` to hide) |
| `label` | varies | `content`, `fill` |

```tsx
<Button variant="primary">Buy Crypto</Button>
<Button variant="secondary">Sell Crypto</Button>
<Button variant="ghost">Cancel</Button>
```

```css
.button-primary {
  background: var(--color-brand);
  color: var(--background);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  font-size: 0.875rem; /* 14px */
}
```

### Input

Vertical layout: label text above a bordered field. Field has a trailing icon and placeholder text.

| Property | Value |
|----------|-------|
| Width | 280px (default) |
| Label | 12px, weight 500, `$--foreground`, tracking +0.08em |
| Field radius | `$--radius-md` (8px) |
| Field border | `$--border` 1.5px |
| Field padding | `12px 16px` |
| Placeholder | 14px, weight 400, `$--foreground-contrast` |
| Trailing icon | Lucide `search`, 16x16, `$--foreground-contrast` |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Label | `label` | `content`, `enabled` |
| Placeholder | `placeholder` | `content` |
| Icon | `icon` | `icon`, `fill`, `enabled` |

```tsx
<Input label="Amount (USDT)" placeholder="0.00" icon="search" />
```

### Badge

Four semantic variants. Pill shape. Font: 11px, weight 500, tracking +0.08em (Label style).

| Component | Background | Text Color | Semantic |
|-----------|------------|------------|----------|
| `Badge/Default` | `$--color-neutral-150` | `$--foreground-contrast` | Neutral / informational |
| `Badge/Brand` | `$--color-brand` | `$--color-neutral-100` | Brand-highlighted |
| `Badge/Success` | `$--color-success-bg` | `$--color-success-fg` | Positive / active |
| `Badge/Warning` | `$--app-icon-color` | `$--foreground` | Pending / caution |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Label | `label` | `content` |

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending KYC</Badge>
```

### Avatar

Circular container with initials text. Used for user identification.

| Property | Value |
|----------|-------|
| Size | 40x40px |
| Shape | Circle (`cornerRadius: 9999`) |
| Fill | `$--color-brand` |
| Text | 14px, weight 600, white |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Initials | `Initials` | `content` (1-2 character string) |

### Toggle

Two state components representing on/off. Fixed size with a sliding thumb.

| Component | Track Fill | Thumb Position |
|-----------|------------|----------------|
| `Toggle/Off` | `$--color-neutral-250` | Left (start) |
| `Toggle/On` | `$--color-brand` | Right (end) |

| Property | Value |
|----------|-------|
| Size | 44x24px |
| Track radius | `$--radius-full` |
| Thumb | 18x18px, white circle |
| Track padding | 3px |

### Chip

Selectable pill for filtering and categorization. Two states.

| Component | Fill | Stroke | Text Color |
|-----------|------|--------|------------|
| `Chip` | `$--color-neutral-100` | `$--color-neutral-200` 1px | `$--foreground-contrast` |
| `Chip/Active` | `$--color-brand` | none | `#FFFFFF` |

| Property | Value |
|----------|-------|
| Shape | Pill (`cornerRadius: 9999`) |
| Padding | `4px 12px` |
| Font | 12px, weight 500 |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Label | `Label` | `content` |

### Tab

Navigation tab for switching between views. Two states.

| Component | Stroke | Text Color | Text Weight |
|-----------|--------|------------|-------------|
| `Tab` | none | `$--foreground-contrast` | 500 |
| `Tab/Active` | `$--color-brand` bottom 2px | `$--color-brand` | 600 |

| Property | Value |
|----------|-------|
| Padding | `10px 20px` |
| Font | 14px |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Label | `Label` | `content` |

### Divider

Simple horizontal line separator.

| Property | Value |
|----------|-------|
| Width | 320px (default, override with `fill_container`) |
| Height | 1px |
| Fill | `$--color-neutral-200` |

---

## Components

Composed patterns built from elements. All components are reusable Pencil components.

### Card

Three-slot container: header (title + description), content (open slot), and actions (open slot). Separated by a 1px divider.

| Property | Value |
|----------|-------|
| Width | 320px (default) |
| Fill | `$--card` |
| Radius | `$--radius-lg` (12px) |
| Border | `$--border` 1px |
| Layout | Vertical, no gap |

**Slots:**
| Slot | Name | Default Size | Padding |
|------|------|-------------|---------|
| Header | `header` | Auto height | `20px 24px 16px 24px` |
| Content | `content` | 64px height | `16px 24px` |
| Actions | `actions` | 48px height | `12px 24px 16px 24px` |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Title | `title` | `content` (16px, weight 600, `$--foreground`) |
| Description | `description` | `content` (13px, weight 400, `$--foreground-contrast`) |
| Content slot | `content` | Replace with custom content tree |
| Actions slot | `actions` | Replace with buttons or controls |

```tsx
<Card>
  <CardHeader title="Portfolio" description="Your total holdings." />
  <CardContent>{/* custom content */}</CardContent>
  <CardActions>
    <Button variant="primary">Trade</Button>
  </CardActions>
</Card>
```

### Alert

Contextual notification banners. Four semantic variants sharing the same structure: icon + content (title + description).

| Component | Background | Icon | Icon Color |
|-----------|------------|------|------------|
| `Alert/Info` | `#EFF6FF` | `info` (Lucide) | `#3B82F6` |
| `Alert/Success` | `#F0FDF4` | `check-circle` (Feather) | `#16A34A` |
| `Alert/Warning` | `#FFFBEB` | `alert-triangle` (Feather) | `#D97706` |
| `Alert/Error` | `#FEF2F2` | `x-circle` (Feather) | `#DC2626` |

| Property | Value |
|----------|-------|
| Width | 320px (default) |
| Radius | `$--radius-md` (8px) |
| Padding | `12px 16px` |
| Gap | 12px |
| Layout | Horizontal, vertically centered |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Icon | `Icon` | `icon`, `fill` |
| Title | `Title` | `content` (13px, weight 600) |
| Description | `Desc` | `content` (12px, weight 400) |

```tsx
<Alert variant="success" title="Trade Complete" description="Your BTC purchase was successful." />
<Alert variant="error" title="Failed" description="Insufficient balance." />
```

### CoinRow

Compact row for displaying a cryptocurrency with its price and change. Used in wallet lists and simple market views.

| Property | Value |
|----------|-------|
| Width | 360px (default) |
| Fill | `$--background` |
| Border | `$--border` 1px |
| Padding | `12px 16px` |
| Gap | 12px |
| Layout | Horizontal, vertically centered |

**Structure:**
```
CoinRow
├── CoinIcon (40x40 circle, colored per coin)
│   └── Symbol (text, 16px bold white)
├── CoinInfo (vertical, fill_container)
│   ├── CoinName (14px, weight 600, $--foreground)
│   └── Ticker (12px, weight 400, $--foreground-contrast)
└── PriceInfo (110px wide, vertical, right-aligned)
    ├── Price (14px, weight 600, $--foreground)
    └── Change (12px, weight 500, green/red)
```

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Icon container | `CoinIcon` | `fill` (background color per coin) |
| Symbol text | `Symbol` | `content` (single character) |
| Coin name | `CoinName` | `content` |
| Ticker | `Ticker` | `content` |
| Price | `Price` | `content` |
| Change | `Change` | `content`, `fill` (`#16A34A` positive, `#DC2626` negative) |

### StatCard

Metric display card showing a label, large value, and trend indicator.

| Property | Value |
|----------|-------|
| Width | 220px (default) |
| Fill | `$--background` |
| Radius | `$--radius-lg` (12px) |
| Border | `$--border` 1px |
| Padding | `20px 24px` |
| Gap | 4px |
| Layout | Vertical |

**Structure:**
```
StatCard
├── Label (12px, weight 500, $--foreground-contrast)
├── Value (28px, weight 700, $--foreground)
└── Trend (horizontal)
    ├── TrendIcon (Lucide trending-up, 14x14, #16A34A)
    └── TrendText (12px, #16A34A)
```

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Label | `Label` | `content` |
| Value | `Value` | `content` |
| Trend icon | `TrendIcon` | `icon` (`trending-up` or `trending-down`), `fill` |
| Trend text | `TrendText` | `content`, `fill` |

### TransactionRow

Row displaying a single transaction with action, date, and amount.

| Property | Value |
|----------|-------|
| Width | 360px (default) |
| Fill | `$--background` |
| Border | `$--border` 1px |
| Padding | `12px 16px` |
| Gap | 12px |
| Layout | Horizontal, vertically centered |

**Structure:**
```
TransactionRow
├── TxIcon (40x40, $--color-neutral-100, radius 12px)
│   └── Arrow (Lucide arrow-up-right, 18x18)
├── TxInfo (fill_container, vertical)
│   ├── Action (14px, weight 500, $--foreground)
│   └── Date (12px, weight 400, $--foreground-contrast)
└── TxAmount (100px wide, vertical, right-aligned)
    ├── Amount (14px, weight 600, green/red)
    └── Coin (12px, $--foreground-contrast)
```

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Icon | `Arrow` | `icon` (e.g. `arrow-up-right`, `arrow-down-left`) |
| Action | `Action` | `content` (e.g. "Bought Bitcoin", "Sold ETH") |
| Date | `Date` | `content` |
| Amount | `Amount` | `content`, `fill` (`#16A34A` credit, `#DC2626` debit) |
| Coin amount | `Coin` | `content` |

### NavBar

Top-level navigation bar with logo, nav links, user avatar, and sign-up CTA.

| Property | Value |
|----------|-------|
| Width | 1200px (default) |
| Height | 64px |
| Fill | `$--background` |
| Border | Bottom stroke `$--border` 1px (inner alignment) |
| Padding | `0 32px` |
| Layout | Horizontal, space-between, vertically centered |

**Structure:**
```
NavBar
├── Left (horizontal, gap 48px)
│   ├── Logo (text "Quidax-demo", 20px, weight 700, $--color-brand)
│   └── NavLinks (horizontal, gap 32px)
│       ├── Markets (14px, weight 600, $--color-brand — active)
│       ├── Trade (14px, weight 500, $--foreground)
│       ├── Wallets
│       └── Earn
└── Right (horizontal, gap 16px)
    ├── UserAvatar (instance of Avatar)
    └── SignUpBtn (CTA button, $--color-brand fill, radius 8px)
```

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Logo | `Logo` | `content` |
| Nav links | `Markets`, `Trade`, `Wallets`, `Earn` | `content`, `fill` (brand = active) |
| Avatar | `UserAvatar` | Standard Avatar overrides |
| CTA label | `CTALabel` | `content` |

### MarketTableRow

Full-width table row for the currency market table. Contains five cells: coin info, price, 24h change, volume, and trade action.

| Property | Value |
|----------|-------|
| Width | 900px (default) |
| Fill | `$--background` |
| Padding | `12px 16px` |
| Layout | Horizontal, vertically centered |

**Cell structure:**

| Cell | Name | Width | Content |
|------|------|-------|---------|
| Coin | `CoinCell` | 220px | Icon (36px circle) + name + ticker |
| Price | `PriceCell` | 160px | Naira price + USD equivalent (right-aligned) |
| Change | `ChangeCell` | 120px | Pill badge with `$--color-success-bg/fg` or red equivalent |
| Volume | `VolumeCell` | 160px | Volume text (right-aligned) |
| Action | `ActionCell` | fill | "Trade" button (outlined, `$--color-brand`) |

**Overridable descendants:**
| Descendant | Name | Properties |
|------------|------|------------|
| Coin icon | `CoinIcon` | `fill` (brand color per coin) |
| Symbol | `CoinSymbol` | `content` |
| Name | `CoinName` | `content` |
| Ticker | `Ticker` | `content` (e.g. "BTC/NGN") |
| Price | `LastPrice` | `content` |
| USD price | `PriceUSD` | `content` |
| Change badge | `ChangeBadge` | `fill` (green or red background) |
| Change value | `ChangeValue` | `content`, `fill` (green or red text) |
| Volume | `VolumeValue` | `content` |

---

## Composition Patterns

Compositions are full assemblies built from the element and component library. They are not reusable components themselves — they represent complete UI sections or screens.

### Market Table

A full market data table for displaying cryptocurrency pairs. Located in the Compositions section.

**Structure:**
```
MarketTable (900px, vertical, rounded, bordered, clip)
├── MarketHeader (padded section)
│   ├── Title row: "Markets" heading + search input
│   └── Filter tabs: Tab/Active("All") + Tab("Gainers", "Losers", "New Listings")
└── MarketDataTable
    ├── TableHeaderRow (horizontal, $--color-neutral-100 background)
    │   ├── "NAME" (220px)
    │   ├── "LAST PRICE" (160px, right-aligned)
    │   ├── "24H CHANGE" (120px, right-aligned)
    │   ├── "VOLUME" (160px, right-aligned)
    │   └── empty action column (fill)
    ├── MarketTableRow instance (Bitcoin)
    ├── MarketTableRow instance (Ethereum)
    ├── MarketTableRow instance (Solana)
    ├── MarketTableRow instance (Tether)
    ├── MarketTableRow instance (BNB)
    └── MarketTableRow instance (Cardano)
```

**Pattern rules:**
- Header row uses Label style (12px, weight 600, `$--foreground-contrast`, tracking +0.04em, uppercase)
- Data rows are instances of `MarketTableRow` with descendant overrides for each coin
- Row separators use bottom stroke `$--border` 1px (omit on last row)
- Positive changes: `$--color-success-bg` background, `$--color-success-fg` text
- Negative changes: `#FEE2E2` background, `#991B1B` text

### Assembling New Compositions

When building new screens or sections:

1. **Start with a screen frame** — use `clip: true`, set a fixed width (e.g. 1440px for desktop, 375px for mobile)
2. **Use vertical layout** as the primary axis with `$--section-padding-y` between major sections
3. **Compose from existing components** — instantiate with `ref`, override only the descendants that differ
4. **Use consistent spacing** — `$--gap-md` between siblings, `$--gap-lg` between groups, `$--gap-2xl` between sections
5. **Place in the Compositions section** of the design file

---

## Consumption Rules

Rules for anyone using this design system in new designs or code.

### Variables

1. **Never hardcode hex values.** Use `$--*` variables in Pencil, `var(--*)` in CSS. If a color you need doesn't exist as a variable, request it be added before using a raw hex.
2. **Brand purple is `$--color-brand` only.** Do not substitute similar violets or purples from other palettes.
3. **Use semantic tokens over palette tokens** when intent matches. Prefer `$--foreground` over `$--color-black` for text; prefer `$--border` over `$--color-neutral-200` for borders.
4. **Spacing must use the 4px grid.** All values come from `$--space-*` or `$--gap-*` tokens. No off-scale values (13px, 22px, 7px, etc.).
5. **Typography must reference the type scale.** Use font-size/weight/tracking combos from the scale table. Do not invent new text styles. If the Figma source differs by 2px or less, snap to the nearest token.
6. **Radius tokens are prescriptive.** Use `$--radius-sm` (4), `$--radius-md` (8), `$--radius-lg` (12), or `$--radius-full` (pill). No custom radius values.

### Components

1. **Check the library first.** Before creating a new element or component, verify that an existing one doesn't already serve the purpose. Search the Elements and Components sections in the design file.
2. **Use instances (`ref`), not copies.** Always reference components via Pencil's `ref` mechanism. Never duplicate a reusable component as a standalone frame — this breaks the update chain.
3. **Override only what differs.** When instantiating a component, only override the descendants that need to change (label text, icon, colors). Do not re-specify properties that match the defaults.
4. **Respect the slot API.** Card's `content` and `actions` are slots — replace their entire subtree via `Replace`, don't try to insert children into them directly.
5. **Do not modify the source component for one-off needs.** If a component doesn't fit your use case, discuss whether to add a new variant or create a separate component. One-off modifications to source components break all existing instances.
6. **Stateful variants are separate components.** `Toggle/On` and `Toggle/Off` are distinct components, not a single Toggle with a state prop. Same for `Tab`/`Tab/Active` and `Chip`/`Chip/Active`. In code, implement these as a single component with state props; in the design file, maintain both variants.

### Patterns

1. **Tables follow the established hierarchy:** Table frame (vertical) > Header row (horizontal) > Data rows (horizontal). Each cell is a frame containing its content. Never put content directly in a row without a cell wrapper.
2. **Data display components (CoinRow, StatCard, TransactionRow) are designed for list contexts.** Use them as repeating instances within vertical layouts, not standalone.
3. **Color-coding for financial data:** Green (`#16A34A` / `$--color-success-fg`) = positive/credit. Red (`#DC2626`) = negative/debit. Never reverse this convention.
4. **NavBar is full-width.** Always use at 1200px or `fill_container` width. Do not resize to smaller widths — use a dedicated mobile nav component instead.

---

## Update Rules

Rules for modifying or extending the design system.

### Adding a New Variable

1. **Check for duplication.** Search existing variables for one that already serves the same purpose. Review the alias table — the value you want might exist under a different name.
2. **Follow naming conventions:**
   - Colors: `--color-{category}-{variant}` (e.g. `--color-error-bg`, `--color-error-fg`)
   - Spacing: `--space-{multiplier}` where multiplier is the 4px grid step
   - Gaps: `--gap-{size}` using the t-shirt scale (xs, sm, md, lg, xl, 2xl, 3xl)
   - Component-specific: `--{component}-{property}` (e.g. `--card-padding`, `--button-padding-x`)
3. **Add to the design file first** using `set_variables`. Then update `src/styles/tokens.css` to match.
4. **Update this document** — add the variable to the appropriate table in the Variables section.
5. **Announce the addition** in the PR description so consumers know it's available.

### Adding a New Element or Component

1. **Propose the component** before building. Describe its purpose, variants, and how it differs from existing components.
2. **Build as a reusable frame** in the design file with `reusable: true`. Place it in the appropriate section (Elements for primitives, Components for composed patterns).
3. **Use existing variables** for all colors, spacing, radius, and typography. If you need a new token, add it first (see above).
4. **Name all descendants** with clear, human-readable names. These become the override API.
5. **Follow the naming convention:** `Category/Variant` for elements (e.g. `Badge/Error`), PascalCase for components (e.g. `PriceTicker`).
6. **Document the component** in this file with: structure diagram, property table, overridable descendants table, and code example.
7. **Create at least one instance** in a composition to validate that the component works in context.

### Adding a New Variant to an Existing Component

1. **Verify the variant is justified.** Can the same result be achieved by overriding an existing variant's descendants? If so, document the override pattern instead.
2. **Mirror the structure** of sibling variants exactly — same descendants, same names, same layout. Only the visual properties (fill, stroke, text color) should differ.
3. **Name consistently:** append the variant name after the slash (e.g. `Badge/Error` follows `Badge/Success`).
4. **Update the component documentation** in this file to include the new variant row.

### Modifying an Existing Component

1. **Audit all instances first.** Before changing a source component, search the design file for all `ref` instances that point to it. Understand the impact of your change.
2. **Non-breaking changes** (safe to make): adding a new optional descendant, changing default content text, adjusting internal spacing within established patterns.
3. **Breaking changes** (require migration): removing a descendant that instances override, renaming a descendant, changing the component's layout direction, altering the slot structure.
4. **For breaking changes:** create the new version as a separate component (e.g. `Card-v2`), migrate instances, then deprecate the old version (see Deprecation Rules).

### Modifying Variables

1. **Value changes propagate immediately** to all components and instances that reference the variable. Test all affected components visually after changing a value.
2. **Renaming a variable is a breaking change.** All references in the design file and codebase must be updated simultaneously. Prefer adding an alias that points to the new name, keeping the old name as a deprecated alias.
3. **Do not delete variables that are in use.** Always deprecate first (see below).

---

## Deprecation Rules

Rules for retiring variables, components, or patterns that are no longer needed.

### Deprecating a Variable

1. **Mark as deprecated** by prefixing the variable name in this documentation with `[DEPRECATED]` and noting the replacement.
2. **Add an alias** if renaming: keep the old variable name but point it to the new one. This prevents immediate breakage.
3. **Set a removal timeline:** variables should remain available for at least 2 design iterations (or 2 sprints) after deprecation announcement.
4. **Grep for usage** in both the design file (search for `$--variable-name`) and codebase (search for `var(--variable-name)`) before removal.
5. **Remove in a dedicated cleanup pass**, not mixed with feature work. Update this document to remove the variable's row.

### Deprecating a Component

1. **Stop using in new work immediately.** Mark the component name with a `[DEPRECATED]` prefix in this document and note the replacement.
2. **Do not delete the source component** while instances exist. Deleting a reusable component breaks all `ref` instances that point to it.
3. **Migrate existing instances** to the replacement component. This may require creating new instances and deleting old ones, since you cannot change a `ref`'s target.
4. **Inventory check:** after migration, search the design file for any remaining `ref` nodes pointing to the deprecated component's ID.
5. **Delete the source component** only after all instances are migrated and the removal timeline has passed.
6. **Move to an "Archive" section** (if one exists) rather than deleting, if historical reference is valuable.

### Deprecating a Pattern

1. **Document the replacement pattern** in this file before announcing deprecation.
2. **Add a note** to the deprecated pattern's section explaining why it was replaced and what to use instead.
3. **Update existing compositions** that use the deprecated pattern in a dedicated cleanup pass.
4. **Remove the deprecated pattern documentation** after all compositions are migrated.

### General Deprecation Principles

- **Never silently remove.** All deprecations must be announced and documented before removal.
- **Provide a migration path.** Every deprecated item must have a documented replacement or workaround.
- **Batch removals.** Collect deprecated items and remove them together in periodic cleanup passes, not one at a time mixed with feature work.
- **Respect the dependency chain.** If Component A depends on Variable X, you cannot deprecate X without first updating A. Map the dependency tree before deprecating anything at a low level.

---

## Quick Reference

### Brand Colors at a Glance

| Role | Variable | Hex |
|------|----------|-----|
| Primary brand | `$--color-brand` | `#6100A5` |
| Primary text | `$--foreground` | `#201749` |
| Secondary text | `$--foreground-contrast` | `#4C4A55` |
| Background | `$--background` | `#FFFFFF` |
| Border | `$--border` | `#DEDEDE` |
| Success | `$--color-success-fg` | `#065F46` |
| Accent pink | `$--app-icon-color` | `#EC5DA0` |

### Component Count

| Category | Count | Items |
|----------|-------|-------|
| Elements | 15 | 3 Buttons, 1 Input, 4 Badges, 1 Avatar, 2 Toggles, 2 Chips, 2 Tabs, 1 Divider |
| Components | 11 | 1 Card, 4 Alerts, 1 CoinRow, 1 StatCard, 1 TransactionRow, 1 NavBar, 1 MarketTableRow |
| Compositions | 2 | Market Table, Design System Showcase |
| **Total** | **28** | |

### File Map

| File | Purpose |
|------|---------|
| `dsm-design.pen` | Source of truth for visual design tokens and components |
| `DESIGN-SYSTEM.md` | This document — specifications and governance rules |
| `CLAUDE.md` | Agent instructions — build rules, Figma MCP flow, code conventions |
| `src/styles/tokens.css` | CSS custom properties (code equivalent of Pencil variables) |
| `src/styles/fonts.css` | Uncut Sans Variable font-face declaration |
| `src/styles/typography.css` | Semantic `.text-*` utility classes |
| `src/styles/global.css` | Resets and base body styles |
| `src/components/ui/` | Code implementations of design system components |
