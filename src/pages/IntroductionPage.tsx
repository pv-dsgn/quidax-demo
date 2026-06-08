import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip, Divider } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { pageStyles, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const STACK_CHIPS = ['React 18', 'TypeScript', 'CSS Modules', 'CSS Custom Props', 'Uncut Sans Variable']

const TOKEN_USAGE = `/* ── Using color tokens ──────────────────────── */
.primaryButton {
  background: var(--color-brand);   /* #6100A5 */
  color: var(--background);         /* #FFFFFF */
}

.bodyText {
  color: var(--foreground);         /* #201749 */
  font-family: var(--font-family-sans);
  font-size: var(--text-body-size); /* 1rem */
}

.card {
  background: var(--background);
  border: 1px solid var(--color-border); /* --color-neutral-200 */
  border-radius: var(--radius-lg);
  padding: var(--card-padding);     /* --space-6 = 24px */
  gap: var(--card-gap);             /* --gap-md = 16px */
}`

const IMPORT_SNIPPET = `// Import any component from the ui barrel
import {
  Alert, Avatar, Chip, CoinRow, Divider,
  NavBar, StatCard, Tab, TabBar,
  Toggle, TransactionRow,
} from '@/components/ui'

// Global styles must be imported once at the app entry
import '@/styles/fonts.css'
import '@/styles/tokens.css'
import '@/styles/typography.css'
import '@/styles/global.css'`

export default function IntroductionPage() {
  useToc([
    { id: 'overview', label: 'Overview' },
    { id: 'whats-inside', label: "What's inside" },
    { id: 'how-tokens-work', label: 'How tokens work' },
    { id: 'quick-start', label: 'Quick start' },
    { id: 'design-principles', label: 'Design principles' },
  ])

  const [activeChip, setActiveChip] = useState<string | null>(null)
  const navigate = useNavigate()

  const SECTIONS = [
    { label: 'Colors', path: '/foundations/colors', count: '14', unit: 'tokens', desc: 'Brand, semantic, neutral, and status colors as CSS custom properties.' },
    { label: 'Typography', path: '/foundations/typography', count: '11', unit: 'styles', desc: 'Uncut Sans Variable across an 11-step scale from Display XL to Label.' },
    { label: 'Spacing', path: '/foundations/spacing', count: '4px', unit: 'base', desc: '10-step scale built on a 4px grid with gap and layout helper tokens.' },
    { label: 'Components', path: '/components/alert', count: '10', unit: 'components', desc: 'Production-ready, accessible UI components wired to design tokens.' },
  ]

  return (
    <div className={pageStyles.page}>
      {/* Hero */}
      <section id="overview" style={{ paddingTop: 'var(--space-10)', scrollMarginTop: '5rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-10)' }}>
        <span className={`text-label ${pageStyles.eyebrow}`}>v1.0 · 2026</span>
        <h1 className="text-display-xl" style={{ color: 'var(--foreground)', lineHeight: 1.05 }}>
          Quidax-demo<br />
          <span style={{ color: 'var(--color-brand)' }}>Design System</span>
        </h1>
        <p className="text-body-lg text-muted" style={{ maxWidth: '56ch' }}>
          A token-based, component-driven foundation for Africa's leading crypto exchange. Every color, type size, and spacing value is encoded as a CSS custom property — from first pixel to production.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 'var(--space-2)' }}>
          {[
            { n: '14', label: 'Color tokens' },
            { n: '11', label: 'Type styles' },
            { n: '10', label: 'Components' },
            { n: '1', label: 'Typeface' },
          ].map(({ n, label }, i, arr) => (
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

        {/* Tech stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-sm)' }}>
          {STACK_CHIPS.map(b => (
            <Chip
              key={b}
              label={b}
              active={activeChip === b}
              onClick={() => setActiveChip(prev => prev === b ? null : b)}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* What's inside */}
      <Block title="What's inside">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-md)' }}>
          {SECTIONS.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={() => navigate(s.path)}
              style={{
                textAlign: 'left',
                padding: 'var(--card-padding)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--background)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-brand)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(97,0,165,0.08)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="text-h4" style={{ color: 'var(--foreground)' }}>{s.label}</span>
                <span className="text-caption" style={{ color: 'var(--color-brand)', fontVariantNumeric: 'tabular-nums' }}>
                  {s.count} {s.unit}
                </span>
              </div>
              <p className="text-body-sm text-muted">{s.desc}</p>
            </button>
          ))}
        </div>
      </Block>

      <Divider />

      {/* How tokens work */}
      <Block title="How tokens work">
        <p className="text-body text-muted">
          All design decisions live in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>src/styles/tokens.css</code> as CSS custom properties on <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>:root</code>. Components reference tokens by name — never hardcoded hex or pixel values.
        </p>
        <p className="text-body text-muted">
          This means a single update to <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>--color-brand</code> instantly propagates across every button, link, and accent in the entire product.
        </p>
        <CodeBlock code={TOKEN_USAGE} lang="css" />
        <Callout icon="💡" title="Token hierarchy">
          Raw palette values (<code>--color-neutral-200</code>) feed into semantic aliases (<code>--color-border</code>). Always use the semantic alias in components — it communicates intent and stays stable if the palette changes.
        </Callout>
      </Block>

      <Divider />

      {/* Quick start */}
      <Block title="Quick start">
        <p className="text-body text-muted">
          All 10 components are exported from a single barrel file at <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>@/components/ui</code>. Import what you need.
        </p>
        <CodeBlock code={IMPORT_SNIPPET} lang="tsx" />
      </Block>

      <Divider />

      {/* Design principles */}
      <Block title="Design principles">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          {[
            { icon: '🎨', title: 'Tokens first', body: 'No raw hex values or magic numbers in components. Every visual property traces back to a named token.' },
            { icon: '⚡', title: 'One variable font', body: 'Uncut Sans Variable covers the full weight range (300–700) in a single file. This prevents font juggling.' },
            { icon: '📐', title: '4px base grid', body: 'All spacing is a multiple of 4px. The predictable rhythm eliminates arbitrary sizing decisions.' },
            { icon: '♿', title: 'Accessible by default', body: 'Interactive components follow WAI-ARIA patterns. Focus rings, roles, and aria-labels are built in.' },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ display: 'flex', gap: 'var(--gap-md)', padding: 'var(--space-4)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0, paddingTop: 2 }}>{icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span className="text-body" style={{ fontWeight: 600, color: 'var(--foreground)' }}>{title}</span>
                <span className="text-body-sm text-muted">{body}</span>
              </div>
            </div>
          ))}
        </div>
      </Block>
    </div>
  )
}
