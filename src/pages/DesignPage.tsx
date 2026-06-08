import { useState } from 'react'
import {
  Alert, Avatar, Chip, CoinRow, Divider,
  NavBar, StatCard, TabBar, Toggle, TransactionRow,
} from '@/components/ui'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

// ── Static data from dsm-design.lib.pen ───────────────────────────────────────

const STATS = [
  { n: '15', label: 'Elements' },
  { n: '11', label: 'Components' },
  { n: '2', label: 'Compositions' },
  { n: '19', label: 'Color Tokens' },
]

const TYPE_SCALE = [
  { name: 'Display XL', size: 52, weight: 700, tracking: -0.03, sample: 'The quick brown fox' },
  { name: 'Display',    size: 42, weight: 700, tracking: -0.02, sample: 'The quick brown fox' },
  { name: 'H1',         size: 36, weight: 600, tracking: -0.02, sample: 'The quick brown fox' },
  { name: 'H2',         size: 30, weight: 600, tracking: -0.015, sample: 'The quick brown fox' },
  { name: 'H3',         size: 24, weight: 600, tracking: -0.01, sample: 'The quick brown fox' },
  { name: 'H4',         size: 20, weight: 500, tracking:  0,    sample: 'The quick brown fox' },
  { name: 'Body Large', size: 18, weight: 400, tracking:  0,    sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Body',       size: 16, weight: 400, tracking:  0,    sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Body Small', size: 14, weight: 400, tracking:  0.005, sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Caption',    size: 12, weight: 400, tracking:  0.01,  sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Label',      size: 12, weight: 500, tracking:  0.08,  sample: 'THE QUICK BROWN FOX', uppercase: true },
] as const

const SPACING_SCALE = [
  { token: '--space-1',  px: 4  },
  { token: '--space-2',  px: 8  },
  { token: '--space-3',  px: 12 },
  { token: '--space-4',  px: 16 },
  { token: '--space-6',  px: 24 },
  { token: '--space-8',  px: 32 },
  { token: '--space-12', px: 48 },
  { token: '--space-16', px: 64 },
  { token: '--space-20', px: 80 },
  { token: '--space-24', px: 96 },
]

const COLOR_PRIMITIVES = [
  { token: '--color-brand',    hex: '#6100A5', name: 'Brand Purple', usage: 'CTAs, active states, brand moments' },
  { token: '--app-icon-color', hex: '#EC5DA0', name: 'App Icon Pink', usage: 'Decorative accent — not for primary actions' },
]

const COLOR_SEMANTIC = [
  { token: '--foreground',          hex: '#201749', name: 'Foreground',         usage: 'Primary text' },
  { token: '--foreground-contrast', hex: '#4C4A55', name: 'Foreground Contrast', usage: 'Secondary / muted text' },
  { token: '--muted-foreground',    hex: '#4C4A55', name: 'Muted Foreground',   usage: 'Placeholder text, de-emphasised labels' },
  { token: '--background',          hex: '#FFFFFF', name: 'Background',          usage: 'Page and card backgrounds' },
  { token: '--card',                hex: '#FFFFFF', name: 'Card',                usage: 'Card surface fill' },
  { token: '--border',              hex: '#DEDEDE', name: 'Border',              usage: 'Stroke / divider colour' },
  { token: '--color-black',         hex: '#000000', name: 'Black',               usage: 'High-contrast icons, emphasis' },
  { token: '--color-neutral-100',   hex: '#F7F7F7', name: 'Neutral 100',         usage: 'Subtle backgrounds, demo canvases' },
  { token: '--color-neutral-150',   hex: '#F2F2EC', name: 'Neutral 150',         usage: 'Warm-tinted section fills' },
  { token: '--color-neutral-200',   hex: '#DEDEDE', name: 'Neutral 200',         usage: 'Borders, dividers' },
  { token: '--color-neutral-250',   hex: '#E3E2E2', name: 'Neutral 250',         usage: 'Subtle borders, disabled UI' },
  { token: '--color-success-fg',  hex: '#065F46', name: 'Success FG',  usage: 'Success text and icon' },
  { token: '--color-success-bg',  hex: '#D1FAE5', name: 'Success BG',  usage: 'Success alert background' },
  { token: '--color-positive',    hex: '#16A34A', name: 'Positive',    usage: 'Price up, market data indicators' },
  { token: '--color-negative',    hex: '#DC2626', name: 'Negative',    usage: 'Price down, error states' },
  { token: '--color-info-fg',     hex: '#3B82F6', name: 'Info',        usage: 'Informational messages' },
  { token: '--color-warning-fg',  hex: '#D97706', name: 'Warning',     usage: 'Caution, pending states' },
]

const GOVERNANCE_RULES = [
  {
    title: 'Color & Brand',
    dot: '#6100A5',
    rules: [
      'Use var(--color-brand) for brand purple — never hardcode #6100A5 in CSS',
      'Use var(--foreground) for primary text, var(--foreground-contrast) for secondary',
      '--app-icon-color (#EC5DA0) is accent only — not for primary actions',
      'Map all Figma fills to CSS token aliases before writing component styles',
    ],
  },
  {
    title: 'Typography',
    dot: '#4F46E5',
    rules: [
      'Always use Uncut Sans Variable via var(--font-family-sans) — no substitutes',
      'Apply semantic type tokens (.text-h1, .text-body etc.) — never hardcode px',
      'Negative letter-spacing on display sizes only — never apply to body copy',
      'Import order at app entry: fonts → tokens → typography → global',
    ],
  },
  {
    title: 'Spacing & Layout',
    dot: '#059669',
    rules: [
      'All spacing uses --space-* tokens (4px base scale) — no arbitrary values',
      'Use --gap-* tokens for flex/grid gaps — never raw rem values',
      'Section vertical padding always uses var(--section-padding-y)',
      'Never use values outside the 4px scale (e.g. 13px, 22px) without a named token',
    ],
  },
  {
    title: 'Components',
    dot: '#D97706',
    rules: [
      'One component per folder: Component.tsx + Component.module.css + index.ts',
      'No inline style for colors, font sizes, or spacing — CSS Modules only',
      'Every shared component must accept an optional className prop for composition',
      'Semantic HTML first: button, nav, main, headings in correct document order',
    ],
  },
]

const CRITICAL_RULES = [
  {
    title: 'No hardcoded colors',
    desc: 'Always var(--token). Hardcoded hex values break theming and make system-wide updates impossible.',
  },
  {
    title: 'No Tailwind without adoption',
    desc: 'Until explicitly added to the repo, use CSS Modules + tokens.css only. Mixing styling systems creates drift.',
  },
  {
    title: 'No external icon libraries',
    desc: 'If assets are available from Figma MCP, use those SVGs directly. Do not install react-icons or lucide.',
  },
  {
    title: 'Token changes require full sync',
    desc: 'When tokens change in Figma, update tokens.css, typography.css, and CLAUDE.md together — single source of truth.',
  },
]

const MAINTENANCE_ROWS = [
  {
    trigger: 'Brand palette changes in Figma Variables',
    action:  'Update tokens.css + CLAUDE.md token table + all component CSS references',
  },
  {
    trigger: 'Type scale or spacing scale changes',
    action:  'Update tokens.css, typography.css, and CLAUDE.md type scale table together',
  },
  {
    trigger: 'New semantic text styles added',
    action:  'Add a named token in tokens.css and document it — never scatter arbitrary px values',
  },
  {
    trigger: 'Tailwind is adopted in the repo',
    action:  'Update CLAUDE.md stack table and migrate relevant CSS Modules to Tailwind classes',
  },
]

// ── Shared primitives ─────────────────────────────────────────────────────────

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-label"
      style={{ color: 'var(--foreground-contrast)', opacity: 0.65, display: 'block', paddingBottom: 'var(--space-3)' }}
    >
      {children}
    </span>
  )
}

function Demo({ children, row }: { children: React.ReactNode; row?: boolean }) {
  return (
    <div className={[pageStyles.demo, row ? pageStyles.demoRow : ''].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

function ColorSwatch({ token, hex, name, usage }: { token: string; hex: string; name: string; usage: string }) {
  const [copied, setCopied] = useState(false)
  const light = ['#FFFFFF', '#F7F7F7', '#F2F2EC', '#DEDEDE', '#E3E2E2', '#F0FDF4'].includes(hex.toUpperCase())

  function copy() {
    navigator.clipboard.writeText(token).catch(() => null)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${token}`}
      style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
        padding: 'var(--space-2)', borderRadius: 'var(--radius-md)',
        border: '1px solid transparent', cursor: 'pointer',
        textAlign: 'left', background: 'none',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent' }}
    >
      <div style={{
        height: 56, borderRadius: 'var(--radius-sm)', background: hex,
        border: light ? '1px solid var(--color-border)' : '1px solid transparent',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 2px' }}>
        <span className="text-body-sm" style={{ fontWeight: 600, color: 'var(--foreground)' }}>{name}</span>
        <code style={{ fontSize: 10, fontFamily: 'SF Mono, ui-monospace, monospace', color: copied ? 'var(--color-positive)' : 'var(--color-brand)' }}>
          {copied ? '✓ Copied' : token}
        </code>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--foreground-contrast)' }}>{hex}</span>
        <span className="text-caption text-muted" style={{ marginTop: 2, lineHeight: 1.4 }}>{usage}</span>
      </div>
    </button>
  )
}

function RuleCard({ title, dot, rules }: { title: string; dot: string; rules: string[] }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: dot, flexShrink: 0 }} />
        <span className="text-body" style={{ fontWeight: 600, color: 'var(--foreground)' }}>{title}</span>
      </div>
      <div style={{ padding: '4px 20px 8px' }}>
        {rules.map((rule, i) => (
          <div
            key={i}
            style={{
              display: 'flex', gap: 8, padding: '10px 0',
              borderBottom: i < rules.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <span style={{ color: dot, fontSize: 11, fontWeight: 700, flexShrink: 0, paddingTop: 2, lineHeight: 1 }}>→</span>
            <span className="text-body-sm" style={{ color: 'var(--foreground-contrast)', lineHeight: 1.55 }}>{rule}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Inline previews for components not yet in the React library ───────────────

function ButtonPreviews() {
  const base: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '12px 24px', cursor: 'pointer',
    fontFamily: 'var(--font-family-sans)', fontSize: 14, fontWeight: 600,
  }
  return (
    <Demo row>
      <button style={{ ...base, borderRadius: 100, border: 'none', background: 'none', color: 'var(--foreground)' }}>
        Cancel
      </button>
      <button style={{ ...base, borderRadius: 'var(--radius-md)' as string, border: '1.5px solid var(--color-brand)', background: 'var(--background)', color: 'var(--color-brand)' }}>
        Learn More
      </button>
      <button style={{ ...base, borderRadius: 'var(--radius-md)' as string, border: 'none', background: 'var(--color-brand)', color: 'var(--background)' }}>
        Get Started
      </button>
    </Demo>
  )
}

function InputPreview() {
  return (
    <Demo>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
        <span style={{ fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Label
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', background: 'var(--background)', gap: 8 }}>
          <span style={{ fontSize: 14, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground-contrast)' }}>
            Enter value…
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--foreground-contrast)', flexShrink: 0 }} aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </div>
    </Demo>
  )
}

function BadgePreviews() {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center',
    padding: '4px 10px', borderRadius: 100,
    fontSize: 11, fontWeight: 500,
    fontFamily: 'var(--font-family-sans)', letterSpacing: '0.08em',
  }
  return (
    <Demo row>
      <span style={{ ...base, background: 'var(--color-neutral-150)', color: 'var(--foreground-contrast)' }}>Default</span>
      <span style={{ ...base, background: 'var(--color-brand)', color: 'var(--background)' }}>Brand</span>
      <span style={{ ...base, background: 'rgba(22,163,74,0.1)', color: 'var(--color-positive)' }}>Success</span>
      <span style={{ ...base, background: 'var(--app-icon-color)', color: 'var(--foreground)' }}>Pending</span>
    </Demo>
  )
}

function CardPreview() {
  return (
    <Demo>
      <div style={{ width: 320, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--background)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground)' }}>Card Title</span>
          <span style={{ fontSize: 13, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground-contrast)' }}>Supporting text goes here.</span>
        </div>
        <div style={{ height: 64, padding: '16px 24px', background: 'var(--color-neutral-100)' }} />
        <div style={{ height: 48, padding: '12px 24px 16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-family-sans)', color: 'var(--color-brand)', cursor: 'pointer' }}>Action</span>
        </div>
      </div>
    </Demo>
  )
}

function MarketTableRowPreview() {
  return (
    <Demo>
      <div style={{ width: '100%', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {/* Head */}
        <div style={{ display: 'flex', background: 'var(--color-neutral-100)', borderBottom: '1px solid var(--color-border)', padding: '10px 16px' }}>
          {[{ w: 220, label: 'Asset' }, { w: 160, label: 'Price' }, { w: 120, label: '24h' }, { w: 120, label: 'Volume' }].map(c => (
            <span key={c.label} style={{ width: c.w, flexShrink: 0, fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground-contrast)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'right', ...(c.label === 'Asset' ? { textAlign: 'left' } : {}) }}>
              {c.label}
            </span>
          ))}
        </div>
        {/* Row */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px' }}>
          <div style={{ width: 220, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F7931A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>B</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground)' }}>Bitcoin</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground-contrast)' }}>BTC</span>
            </div>
          </div>
          <div style={{ width: 160, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground)' }}>₦45,230,000</span>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground-contrast)' }}>$67,234.50</span>
          </div>
          <div style={{ width: 120, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 100, background: 'rgba(22,163,74,0.1)', fontSize: 11, fontWeight: 500, fontFamily: 'var(--font-family-sans)', color: 'var(--color-positive)' }}>▲ 2.45%</span>
          </div>
          <div style={{ width: 120, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground)' }}>₦1.2B</span>
          </div>
        </div>
      </div>
    </Demo>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DesignPage() {
  const [activeTab, setActiveTab]   = useState('Markets')
  const [toggleOn, setToggleOn]     = useState(false)
  const [chipActive, setChipActive] = useState(false)

  useToc([
    { id: 'overview',     label: 'Overview' },
    { id: 'canvas',       label: 'Canvas' },
    { id: 'elements',     label: 'Elements' },
    { id: 'components',   label: 'Components' },
    { id: 'color-tokens', label: 'Color Tokens' },
    { id: 'typography',   label: 'Typography' },
    { id: 'spacing',      label: 'Spacing' },
    { id: 'governance',   label: 'Governance' },
  ])

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Design Library"
        title="Design System"
        lead="Design tokens, component specs, composition patterns, and governance rules — sourced directly from dsm-design.lib.pen via the Pencil MCP server."
      />

      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <Block title="Overview">
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STATS.map(({ n, label }, i, arr) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', paddingRight: 'var(--space-8)' }}>
                <span className="text-h2" style={{ color: 'var(--color-brand)', fontVariantNumeric: 'tabular-nums' }}>{n}</span>
                <span className="text-body-sm text-muted">{label}</span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 1, height: '2.5rem', background: 'var(--color-border)', marginRight: 'var(--space-8)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
        <Callout icon="📁" title="Three frames">
          The .pen file contains three top-level frames: <strong>Elements</strong> (15 primitive atoms), <strong>Components</strong> (11 composed patterns), and <strong>Documentation</strong> (token specs, typography, spacing, and governance rules). This page renders all three in full.
        </Callout>
      </Block>

      <Divider />

      {/* ── Canvas ───────────────────────────────────────────────────────── */}
      <Block title="Canvas">
        <p className="text-body-sm text-muted">
          The design canvas in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>dsm-design.lib.pen</code> — three frames side by side as they sit in Pencil. Scroll horizontally to pan. Click to open full size.
        </p>

        <div style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          padding: 'var(--space-5)',
          background: 'var(--color-neutral-100)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-neutral-250) transparent',
        }}>
          {[
            { src: '/assets/design-canvas/JHAIr.webp', alt: 'Documentation frame — governance rules, colour tokens, typography and spacing' },
            { src: '/assets/design-canvas/uGjdP.webp', alt: 'Elements frame — buttons, input, badges, controls, tabs and divider' },
            { src: '/assets/design-canvas/e4Zvl.webp', alt: 'Components frame — card, alerts, data display, navigation and market table row' },
          ].map(({ src, alt }) => (
            <a
              key={src}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', flexShrink: 0, lineHeight: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-border)' }}
            >
              <img
                src={src}
                alt={alt}
                style={{ display: 'block', height: 380, width: 'auto' }}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </Block>

      <Divider />

      {/* ── Elements ─────────────────────────────────────────────────────── */}
      <Block title="Elements">
        <p className="text-body-sm text-muted">
          Primitive UI atoms — the smallest reusable pieces. 15 elements across 6 categories: Buttons, Input, Badges, Controls, Tabs, and Divider.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xl)' }}>

          <div>
            <SubLabel>Buttons · Ghost · Secondary · Primary</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              Three variants sharing 12 × 24 px padding and 14 px semi-bold labels. Ghost has no background or border; Secondary is outlined in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-brand</code>; Primary is filled brand.
            </p>
            <ButtonPreviews />
          </div>

          <div>
            <SubLabel>Input</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              Label (12 px · 500 · uppercase) + bordered field with placeholder text and optional trailing icon. 280 px default width, 12 × 16 px inner padding.
            </p>
            <InputPreview />
          </div>

          <div>
            <SubLabel>Badges · Default · Brand · Success · Warning</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              Pill-shaped status labels. 4 × 10 px padding, 11 px medium text, 0.08 em letter-spacing. Warning uses <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--app-icon-color</code> as a visual accent.
            </p>
            <BadgePreviews />
          </div>

          <div>
            <SubLabel>Controls · Avatar · Toggle · Chip</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              Avatar renders initials in a 40 px brand-filled circle. Toggle is a 44 × 24 px switch (Off uses <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-neutral-250</code>, On uses <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-brand</code>). Chip is a pill filter — click to toggle active state.
            </p>
            <Demo row>
              <Avatar initials="AO" />
              <Toggle checked={false} onChange={() => {}} label="Toggle off" />
              <Toggle checked={toggleOn} onChange={setToggleOn} label="Toggle" />
              <Chip label="All Assets" active={false} onClick={() => {}} />
              <Chip label="All Assets" active={chipActive} onClick={() => setChipActive(v => !v)} />
            </Demo>
          </div>

          <div>
            <SubLabel>Tabs · Tab · Tab/Active</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              10 × 20 px padding. Active tab gains brand-coloured label (600 weight) and a 2 px bottom border in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-brand</code>. Click to switch.
            </p>
            <Demo>
              <TabBar tabs={['Markets', 'Trade', 'Wallets', 'Earn']} activeTab={activeTab} onChange={setActiveTab} />
            </Demo>
          </div>

          <div>
            <SubLabel>Divider</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              1 px horizontal rule. Colour aliases <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-border</code> → <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-neutral-200</code>.
            </p>
            <Demo>
              <Divider />
            </Demo>
          </div>

        </div>
      </Block>

      <Divider />

      {/* ── Components ───────────────────────────────────────────────────── */}
      <Block title="Components">
        <p className="text-body-sm text-muted">
          11 composed components. Each lives in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>src/components/ui/</code> with its own CSS Module. All properties reference tokens — no hardcoded values.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xl)' }}>

          <div>
            <SubLabel>Card</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              Shell with three named slots: header (title + description), content, and actions footer. Uses <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-card</code> surface, <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--radius-lg</code>, and <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--border</code>.
            </p>
            <CardPreview />
          </div>

          <div>
            <SubLabel>Alert · Info · Success · Warning · Error</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              Four severity variants with icon, bold title, and optional description. Colours are hardcoded in the design file (not yet tokenised) — info uses <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>#3B82F6</code>, success <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>#16A34A</code>, warning <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>#D97706</code>, error <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>#DC2626</code>.
            </p>
            <Demo>
              <Alert variant="info"    title="Information" description="This is an informational message." />
              <Alert variant="success" title="Success"     description="Your action was completed successfully." />
              <Alert variant="warning" title="Warning"     description="Please review before proceeding." />
              <Alert variant="error"   title="Error"       description="Something went wrong. Try again." />
            </Demo>
          </div>

          <div>
            <SubLabel>Data Display · CoinRow · StatCard · TransactionRow</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              CoinRow: 360 px wide, coin icon + name/ticker + price/delta. StatCard: 319 px, label/value/trend layout. TransactionRow: 360 px, direction icon + action/date + amount/coin.
            </p>
            <Demo>
              <CoinRow symbol="B" name="Bitcoin" ticker="BTC" price="$67,234.50" change="2.45%" changePositive iconColor="#F7931A" />
              <StatCard label="Total Balance" value="$12,450.00" trend="+$234.56 (2.4%)" trendPositive />
              <TransactionRow action="Bought Bitcoin" date="Jun 04, 2026 · 2:41 PM" amount="+$500.00" coinAmount="0.00743 BTC" credit />
            </Demo>
          </div>

          <div>
            <SubLabel>NavBar</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              1200 × 64 px. Logo + nav links left; Avatar + Sign Up CTA right. Bottom border: 1 px inner stroke in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--color-neutral-200</code>. 0 × 32 px horizontal padding.
            </p>
            <div className={pageStyles.demo} style={{ padding: 0, overflow: 'hidden' }}>
              <NavBar
                links={[
                  { label: 'Markets', active: true },
                  { label: 'Trade' },
                  { label: 'Wallets' },
                  { label: 'Earn' },
                ]}
                userInitials="AO"
              />
            </div>
          </div>

          <div>
            <SubLabel>MarketTableRow</SubLabel>
            <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>
              900 px wide. Five cells: coin (icon + name + ticker), price (NGN + USD), 24h change badge, volume, and Trade action button. Used in the Market Table composition.
            </p>
            <MarketTableRowPreview />
          </div>

        </div>
      </Block>

      <Divider />

      {/* ── Color Tokens ─────────────────────────────────────────────────── */}
      <Block title="Color Tokens">
        <p className="text-body-sm text-muted">
          16 CSS custom properties on <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>:root</code>. Click any swatch to copy its token. Primitives are raw palette values; semantic tokens express intent and stay stable as the palette evolves.
        </p>

        <div>
          <SubLabel>Colour Primitives · 2 tokens</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 'var(--gap-md)' }}>
            {COLOR_PRIMITIVES.map(s => <ColorSwatch key={s.token} {...s} />)}
          </div>
        </div>

        <div>
          <SubLabel>Semantic Tokens · 14 tokens</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 'var(--gap-md)' }}>
            {COLOR_SEMANTIC.map(s => <ColorSwatch key={s.token} {...s} />)}
          </div>
        </div>
      </Block>

      <Divider />

      {/* ── Typography ───────────────────────────────────────────────────── */}
      <Block title="Typography">
        <p className="text-body-sm text-muted">
          11-step scale using <strong>Uncut Sans Variable</strong> (wght axis 300–700). Display sizes use fluid <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>clamp()</code>; smaller sizes are fixed. Negative letter-spacing applies to headings only.
        </p>

        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {TYPE_SCALE.map((row, i) => (
            <div
              key={row.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--gap-lg)',
                padding: '10px 20px',
                borderBottom: i < TYPE_SCALE.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <div style={{ width: 120, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span className="text-body-sm" style={{ fontWeight: 600, color: 'var(--foreground)' }}>{row.name}</span>
                <span style={{ fontSize: 10, fontFamily: 'SF Mono, ui-monospace, monospace', color: 'var(--foreground-contrast)' }}>
                  {row.size}px · {row.weight}{row.tracking ? ` · ${row.tracking > 0 ? '+' : ''}${row.tracking}em` : ''}
                </span>
              </div>
              <span style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: row.size,
                fontWeight: row.weight,
                letterSpacing: row.tracking ? `${row.tracking}em` : undefined,
                textTransform: 'uppercase' in row && row.uppercase ? 'uppercase' : undefined,
                color: 'var(--foreground)',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                minWidth: 0,
              }}>
                {row.sample}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Divider />

      {/* ── Spacing ──────────────────────────────────────────────────────── */}
      <Block title="Spacing">
        <p className="text-body-sm text-muted">
          10-step scale built on a <strong>4 px base grid</strong>. All layout uses <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--space-*</code> tokens. Gap tokens (<code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--gap-xs</code> → <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 5px', borderRadius: 4 }}>--gap-3xl</code>) alias the same values for flex and grid contexts.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-6)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          {SPACING_SCALE.map(({ token, px }) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ width: 100, fontSize: 11, fontFamily: 'SF Mono, ui-monospace, monospace', color: 'var(--foreground-contrast)', flexShrink: 0 }}>
                {token}
              </code>
              <div style={{ width: px, height: 12, borderRadius: 2, background: 'var(--color-brand)', flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontFamily: 'SF Mono, ui-monospace, monospace', color: 'var(--foreground-contrast)' }}>
                {px}px
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Divider />

      {/* ── Governance ───────────────────────────────────────────────────── */}
      <Block title="Governance">
        <p className="text-body-sm text-muted">
          Binding usage rules across four domains. Follow these to maintain visual consistency and accessibility across all Quidax product surfaces.
        </p>

        {/* 2 × 2 rule cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--gap-md)' }}>
          {GOVERNANCE_RULES.map(r => <RuleCard key={r.title} {...r} />)}
        </div>

        {/* Critical rules — brand background card */}
        <div style={{ borderRadius: 12, background: 'var(--color-brand)', padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 100, background: 'var(--app-icon-color)', fontSize: 11, fontWeight: 500, fontFamily: 'var(--font-family-sans)', color: 'var(--foreground)', letterSpacing: '0.08em' }}>
              Critical
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-family-sans)', color: '#FFFFFF' }}>
              Never Break These Rules
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
            {CRITICAL_RULES.map(r => (
              <div key={r.title} style={{ borderRadius: 6, background: 'rgba(255,255,255,0.08)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-family-sans)', color: '#FFFFFF' }}>{r.title}</span>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-family-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System maintenance table */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 'var(--space-4)' }}>
            <span className="text-label" style={{ color: 'var(--foreground-contrast)', opacity: 0.65 }}>When to update</span>
            <span className="text-h4" style={{ color: 'var(--foreground)' }}>System Maintenance</span>
          </div>
          <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', background: 'var(--color-neutral-100)', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ flex: 1, padding: '10px 16px', borderRight: '1px solid var(--color-border)' }}>
                <span className="text-label" style={{ color: 'var(--foreground-contrast)' }}>Trigger</span>
              </div>
              <div style={{ flex: 1, padding: '10px 16px' }}>
                <span className="text-label" style={{ color: 'var(--foreground-contrast)' }}>Action Required</span>
              </div>
            </div>
            {MAINTENANCE_ROWS.map((row, i) => (
              <div key={i} style={{ display: 'flex', borderBottom: i < MAINTENANCE_ROWS.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div style={{ flex: 1, padding: '14px 16px', borderRight: '1px solid var(--color-border)' }}>
                  <span className="text-body-sm" style={{ color: 'var(--foreground)', fontWeight: 500, lineHeight: 1.5 }}>{row.trigger}</span>
                </div>
                <div style={{ flex: 1, padding: '14px 16px' }}>
                  <span className="text-body-sm" style={{ color: 'var(--foreground-contrast)', lineHeight: 1.5 }}>{row.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Block>
    </div>
  )
}
