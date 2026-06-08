import { Divider } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const SPACE_SCALE = [
  { token: '--space-0', rem: '0', px: 0, use: 'Reset' },
  { token: '--space-1', rem: '0.25rem', px: 4, use: 'Tight icon padding, hairline stacks' },
  { token: '--space-2', rem: '0.5rem', px: 8, use: 'Inline gaps, dense lists' },
  { token: '--space-3', rem: '0.75rem', px: 12, use: 'Input vertical padding, compact gaps' },
  { token: '--space-4', rem: '1rem', px: 16, use: 'Default stack gap, inner card (tight)' },
  { token: '--space-5', rem: '1.25rem', px: 20, use: '—' },
  { token: '--space-6', rem: '1.5rem', px: 24, use: 'Card padding (→ --card-padding)' },
  { token: '--space-8', rem: '2rem', px: 32, use: 'Large component gaps' },
  { token: '--space-10', rem: '2.5rem', px: 40, use: '—' },
  { token: '--space-12', rem: '3rem', px: 48, use: 'Between content groups' },
  { token: '--space-16', rem: '4rem', px: 64, use: 'Section vertical padding' },
  { token: '--space-20', rem: '5rem', px: 80, use: 'Large section breaks' },
  { token: '--space-24', rem: '6rem', px: 96, use: 'Hero / footer vertical rhythm' },
]

const GAP_SCALE = [
  { token: '--gap-xs', maps: '--space-2', px: 8, use: 'Icon + label, tight toolbars' },
  { token: '--gap-sm', maps: '--space-3', px: 12, use: 'Form fields, inline controls' },
  { token: '--gap-md', maps: '--space-4', px: 16, use: 'Default stack / grid gap' },
  { token: '--gap-lg', maps: '--space-6', px: 24, use: 'Card content, feature columns' },
  { token: '--gap-xl', maps: '--space-8', px: 32, use: 'Section sub-grids' },
  { token: '--gap-2xl', maps: '--space-12', px: 48, use: 'Major blocks within a section' },
  { token: '--gap-3xl', maps: '--space-16', px: 64, use: 'Large marketing layouts' },
]

const LAYOUT_TOKENS = [
  { token: '--section-padding-y', value: 'calc(4rem × --rem-scaler)', use: 'Top/bottom of page sections' },
  { token: '--section-padding-x', value: 'clamp(1rem, 4vw, 2rem)', use: 'Horizontal page inset' },
  { token: '--container-max', value: '75rem (1200px)', use: 'Centered content max-width' },
  { token: '--card-padding', value: '--space-6 (24px)', use: 'Card inner padding' },
  { token: '--card-gap', value: '--gap-md (16px)', use: 'Space between card children' },
  { token: '--button-padding-y', value: '--space-3 (12px)', use: 'Button vertical hit area' },
  { token: '--button-padding-x', value: '--space-6 (24px)', use: 'Button horizontal hit area' },
  { token: '--input-padding-y', value: '--space-3 (12px)', use: 'Input vertical padding' },
  { token: '--input-padding-x', value: '--space-4 (16px)', use: 'Input horizontal padding' },
]

const USAGE_SNIPPET = `/* Stack layout — gap between children */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md); /* 16px */
}

/* Grid layout */
.featureGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-xl); /* 32px */
}

/* Section */
.section {
  padding: var(--section-padding-y) var(--section-padding-x);
}

/* Card */
.card {
  padding: var(--card-padding); /* 24px */
  display: flex;
  flex-direction: column;
  gap: var(--card-gap);         /* 16px */
}`

export default function SpacingPage() {
  useToc([
    { id: 'space-scale',    label: 'Space scale' },
    { id: 'gap-tokens-flex-grid', label: 'Gap tokens' },
    { id: 'layout-tokens',  label: 'Layout tokens' },
    { id: 'usage',          label: 'Usage' },
  ])

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        lead="All layout spacing uses a 4px base scale. Use --space-* for padding and margin, --gap-* for flex and grid gaps. Section padding uses --section-padding-y."
      />

      <Block title="Space scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}>
          {SPACE_SCALE.filter(s => s.px > 0).map(s => (
            <div key={s.token} style={{ display: 'grid', gridTemplateColumns: '152px 1fr 80px 1fr', alignItems: 'center', gap: 'var(--gap-md)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-neutral-100)' }}>
              <code style={{ fontSize: 11, fontFamily: 'SF Mono, ui-monospace, monospace', color: 'var(--color-brand)' }}>{s.token}</code>
              <div style={{ height: 6, background: 'var(--color-neutral-150)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--color-brand)', borderRadius: 'var(--radius-full)', width: `${Math.max((s.px / 96) * 100, 2)}%` }} />
              </div>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--foreground-contrast)', textAlign: 'right' }}>{s.rem} · {s.px}px</span>
              <span className="text-caption text-muted">{s.use}</span>
            </div>
          ))}
        </div>
      </Block>

      <Divider />

      <Block title="Gap tokens (flex & grid)">
        <p className="text-body text-muted">Named aliases for common gap values. Use these on <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>gap</code>, <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>row-gap</code>, and <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>column-gap</code>.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', fontSize: 'var(--text-body-sm-size)' }}>
          <thead>
            <tr>
              {['Token', 'Maps to', 'px', 'Typical use'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground-contrast)', background: 'var(--color-neutral-100)', borderBottom: '1px solid var(--color-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GAP_SCALE.map((g, i) => (
              <tr key={g.token} style={{ borderBottom: i < GAP_SCALE.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <td style={{ padding: 'var(--space-3) var(--space-4)' }}><code style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(97,0,165,0.06)', color: 'var(--color-brand)', padding: '2px 6px', borderRadius: 4 }}>{g.token}</code></td>
                <td style={{ padding: 'var(--space-3) var(--space-4)' }}><code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', color: 'var(--foreground-contrast)', padding: '2px 6px', borderRadius: 4 }}>{g.maps}</code></td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--foreground-contrast)' }}>{g.px}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--foreground-contrast)' }}>{g.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>

      <Divider />

      <Block title="Layout tokens">
        <p className="text-body text-muted">Composite tokens for common layout patterns — sections, cards, and interactive elements.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', fontSize: 'var(--text-body-sm-size)' }}>
          <thead>
            <tr>
              {['Token', 'Resolves to', 'Use'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground-contrast)', background: 'var(--color-neutral-100)', borderBottom: '1px solid var(--color-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LAYOUT_TOKENS.map((t, i) => (
              <tr key={t.token} style={{ borderBottom: i < LAYOUT_TOKENS.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <td style={{ padding: 'var(--space-3) var(--space-4)' }}><code style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(97,0,165,0.06)', color: 'var(--color-brand)', padding: '2px 6px', borderRadius: 4 }}>{t.token}</code></td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--foreground-contrast)', fontSize: 12 }}>{t.value}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--foreground-contrast)' }}>{t.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>

      <Divider />

      <Block title="Usage">
        <CodeBlock code={USAGE_SNIPPET} lang="css" />
        <Callout icon="⚠️" title="No off-scale values">
          Do not use spacing values outside the scale (e.g. 13px, 22px). If you need an unlisted size, add it as a named token in <code style={{ fontFamily: 'monospace', fontSize: 11 }}>tokens.css</code> — don't scatter arbitrary values in components.
        </Callout>
        <Callout icon="💡" title="Prefer gap over margin">
          Use <code style={{ fontFamily: 'monospace', fontSize: 11 }}>gap</code> between flex/grid children instead of adding <code style={{ fontFamily: 'monospace', fontSize: 11 }}>margin</code> to individual items. It's cleaner, avoids double-margin issues, and works with <code style={{ fontFamily: 'monospace', fontSize: 11 }}>flex-wrap</code>.
        </Callout>
      </Block>
    </div>
  )
}
