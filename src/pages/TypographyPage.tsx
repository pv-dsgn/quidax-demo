import { Divider } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const TYPE_SCALE = [
  { cls: 'text-display-xl', label: 'Display XL', spec: '40–64px · wght 600 · tracking −0.03em', sample: "Africa's crypto future." },
  { cls: 'text-display', label: 'Display', spec: '36–48px · wght 600 · tracking −0.02em', sample: 'Trade with confidence.' },
  { cls: 'text-h1', label: 'Heading 1', spec: '32–40px · wght 600 · tracking −0.02em', sample: 'Portfolio overview' },
  { cls: 'text-h2', label: 'Heading 2', spec: '28–32px · wght 600 · tracking −0.015em', sample: 'Recent transactions' },
  { cls: 'text-h3', label: 'Heading 3', spec: '24px · wght 600 · tracking −0.01em', sample: 'Bitcoin (BTC)' },
  { cls: 'text-h4', label: 'Heading 4', spec: '20px · wght 500', sample: 'Market cap: $1.2T' },
  { cls: 'text-body-lg', label: 'Body Large', spec: '18px · wght 400 · lh 1.55', sample: 'Buy, sell, and hold crypto with zero fees on your first trade.' },
  { cls: 'text-body', label: 'Body', spec: '16px · wght 400 · lh 1.5', sample: 'Your account balance is updated in real-time across all devices.' },
  { cls: 'text-body-sm', label: 'Body Small', spec: '14px · wght 400 · tracking 0.005em', sample: 'Last updated 2 minutes ago · All prices in USD' },
  { cls: 'text-caption', label: 'Caption', spec: '12px · wght 400 · tracking 0.01em', sample: 'Prices may vary. Subject to market conditions.' },
  { cls: 'text-label', label: 'Label / Overline', spec: '12px · wght 500 · tracking 0.08em · UPPERCASE', sample: 'Market overview' },
]

const FONT_FACE = `@font-face {
  font-family: "Uncut Sans Variable";
  src:
    url("/fonts/Uncut%20Sans%20Variable.ttf") format("truetype-variations"),
    url("/fonts/Uncut%20Sans%20Variable.ttf") format("truetype");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}`

const USAGE_SNIPPET = `/* Apply via utility class (preferred) */
<h1 className="text-display-xl">Portfolio value</h1>
<p  className="text-body text-muted">Updated 2 min ago</p>

/* Or reference tokens in module CSS */
.heading {
  font-family: var(--font-family-sans);
  font-size: var(--text-h2-size);
  line-height: var(--text-h2-line);
  letter-spacing: var(--text-h2-tracking);
  font-weight: var(--font-weight-semibold);
}

/* Variable weight axis for custom emphasis */
.heroNumber {
  font-variation-settings: "wght" 650;
  font-size: var(--text-display-xl-size);
}`

const GUIDELINES = [
  { role: 'Hero / page titles', use: 'Display XL or Display' },
  { role: 'Section titles', use: 'H1 or H2' },
  { role: 'Card and panel titles', use: 'H3 or H4' },
  { role: 'Paragraphs and UI copy', use: 'Body or Body Large' },
  { role: 'Metadata, hints, timestamps', use: 'Body Small or Caption' },
  { role: 'Eyebrows, chips, overlines', use: 'Label' },
]

export default function TypographyPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        lead="Uncut Sans Variable — a single variable font covering weights 300–700 on the wght axis. Fluid clamp() at display scale; fixed rem for body and UI."
      />

      <Block title="Type scale">
        <p className="text-body text-muted">
          Eleven semantic styles map directly to design intent. Use the utility class or compose from tokens in module CSS.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--color-border)' }}>
          {TYPE_SCALE.map(row => (
            <div
              key={row.cls}
              style={{
                display: 'grid', gridTemplateColumns: '176px 1fr',
                gap: 'var(--gap-lg)', padding: 'var(--space-5) 0',
                borderBottom: '1px solid var(--color-border)', alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <code style={{ fontSize: 11, fontFamily: 'SF Mono, ui-monospace, monospace', color: 'var(--color-brand)', lineHeight: 1.5 }}>
                  .{row.cls}
                </code>
                <span className="text-caption text-muted">{row.spec}</span>
              </div>
              <div style={{ overflow: 'hidden', minWidth: 0 }}>
                <span className={row.cls}>{row.sample}</span>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Divider />

      <Block title="Font face">
        <p className="text-body text-muted">
          The font file lives at <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>public/fonts/Uncut Sans Variable.ttf</code> and is loaded once in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>src/styles/fonts.css</code>.
        </p>
        <CodeBlock code={FONT_FACE} lang="css" />
        <Callout icon="⚡" title="Variable font benefits">
          Because it's a variable font, a single HTTP request covers all weights — no separate 400/600/700 files. <code style={{ fontFamily: 'monospace', fontSize: 11 }}>font-display: swap</code> prevents invisible text during load.
        </Callout>
      </Block>

      <Divider />

      <Block title="Usage">
        <CodeBlock code={USAGE_SNIPPET} lang="tsx" />
      </Block>

      <Divider />

      <Block title="Style guide">
        <p className="text-body text-muted">Which style to reach for in each context:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', fontSize: 'var(--text-body-sm-size)' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground-contrast)', background: 'var(--color-neutral-100)', borderBottom: '1px solid var(--color-border)' }}>Context</th>
              <th style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground-contrast)', background: 'var(--color-neutral-100)', borderBottom: '1px solid var(--color-border)' }}>Use</th>
            </tr>
          </thead>
          <tbody>
            {GUIDELINES.map((g, i) => (
              <tr key={g.role} style={{ borderBottom: i < GUIDELINES.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--foreground-contrast)' }}>{g.role}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                  <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>{g.use}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Callout icon="ℹ" title="Negative tracking at display scale only">
          Tight letter-spacing (−0.02em to −0.03em) is applied at Display and H1 sizes. Do not apply display tracking to body copy — it reduces legibility at small sizes.
        </Callout>
      </Block>
    </div>
  )
}
