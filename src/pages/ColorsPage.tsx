import { useState } from 'react'
import { Divider } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const COLOR_GROUPS = [
  {
    label: 'Brand',
    desc: 'The primary brand purple and key accent colors.',
    swatches: [
      { token: '--color-brand', hex: '#6100A5', name: 'Brand Purple', usage: 'CTAs, active states, links' },
      { token: '--color-black', hex: '#000000', name: 'Black', usage: 'High-contrast icons, emphasis' },
      { token: '--app-icon-color', hex: '#EC5DA0', name: 'Accent Pink', usage: 'App icons, decorative accents' },
    ],
  },
  {
    label: 'Semantic',
    desc: 'Intent-based aliases for text and surfaces.',
    swatches: [
      { token: '--foreground', hex: '#201749', name: 'Foreground', usage: 'Primary body text' },
      { token: '--foreground-contrast', hex: '#4C4A55', name: 'Foreground Contrast', usage: 'Secondary / muted text' },
      { token: '--background', hex: '#FFFFFF', name: 'Background', usage: 'Page and card backgrounds' },
    ],
  },
  {
    label: 'Neutrals',
    desc: 'Surface and border tones from light to mid-grey.',
    swatches: [
      { token: '--color-neutral-100', hex: '#F7F7F7', name: 'Neutral 100', usage: 'Subtle backgrounds, demo canvases' },
      { token: '--color-neutral-150', hex: '#F2F2EC', name: 'Neutral 150', usage: 'Warm-tinted section fills' },
      { token: '--color-neutral-200', hex: '#DEDEDE', name: 'Neutral 200', usage: 'Borders, dividers (→ --color-border)' },
      { token: '--color-neutral-250', hex: '#E3E2E2', name: 'Neutral 250', usage: 'Subtle borders, disabled UI' },
    ],
  },
  {
    label: 'Status',
    desc: 'Semantic status colors for feedback and data.',
    swatches: [
      { token: '--color-positive', hex: '#16A34A', name: 'Positive', usage: 'Price up, success states' },
      { token: '--color-negative', hex: '#DC2626', name: 'Negative', usage: 'Price down, error states' },
      { token: '--color-info-fg', hex: '#3B82F6', name: 'Info', usage: 'Informational messages' },
      { token: '--color-warning-fg', hex: '#D97706', name: 'Warning', usage: 'Caution messages, pending states' },
    ],
  },
]

const USAGE_SNIPPET = `/* Reference tokens — never hardcode hex values */

.primaryButton {
  background: var(--color-brand);   /* ✓ */
  /* background: #6100A5; */        /* ✗ */
}

.muted {
  color: var(--foreground-contrast);
}

.surface {
  background: var(--color-neutral-100);
  border: 1px solid var(--color-border); /* alias of --color-neutral-200 */
}

.priceUp   { color: var(--color-positive); }
.priceDown { color: var(--color-negative); }`

function Swatch({ token, hex, name, usage }: { token: string; hex: string; name: string; usage: string }) {
  const [copied, setCopied] = useState(false)
  const isLight = ['#FFFFFF', '#F7F7F7', '#F2F2EC', '#DEDEDE', '#E3E2E2'].includes(hex.toUpperCase())

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
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        padding: 'var(--space-2)', borderRadius: 'var(--radius-md)',
        border: '1px solid transparent', cursor: 'pointer', textAlign: 'left',
        background: 'none', transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.12s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.borderColor = 'var(--color-border)'
        el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.borderColor = 'transparent'
        el.style.boxShadow = 'none'
        el.style.transform = 'none'
      }}
    >
      <div style={{
        height: 64, borderRadius: 'var(--radius-sm)',
        background: hex,
        border: isLight ? '1px solid var(--color-border)' : '1px solid transparent',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 var(--space-1)' }}>
        <span className="text-body-sm" style={{ fontWeight: 600, color: 'var(--foreground)' }}>{name}</span>
        <code style={{ fontSize: 11, fontFamily: 'SF Mono, ui-monospace, monospace', color: copied ? 'var(--color-positive)' : 'var(--color-brand)', lineHeight: 1.5 }}>
          {copied ? '✓ Copied' : token}
        </code>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--foreground-contrast)' }}>{hex}</span>
        <span className="text-caption text-muted" style={{ marginTop: 2 }}>{usage}</span>
      </div>
    </button>
  )
}

export default function ColorsPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Foundations"
        title="Colors"
        lead="All colors are CSS custom properties on :root. Click any swatch to copy its token name. Never hardcode hex values in components — always reference a token."
      />

      {COLOR_GROUPS.map((group, i) => (
        <div key={group.label}>
          <Block title={group.label}>
            <p className="text-body-sm text-muted">{group.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 'var(--gap-md)' }}>
              {group.swatches.map(s => <Swatch key={s.token} {...s} />)}
            </div>
          </Block>
          {i < COLOR_GROUPS.length - 1 && <Divider />}
        </div>
      ))}

      <Divider />

      <Block title="Usage">
        <CodeBlock code={USAGE_SNIPPET} lang="css" />
        <Callout icon="⚠️" title="Brand purple">
          <code style={{ fontFamily: 'monospace', fontSize: 11 }}>--color-brand</code> is strictly <strong>#6100A5</strong>. Do not substitute similar violets or Figma default purples. This token is the single source of truth for all brand moments.
        </Callout>
        <Callout icon="💡" title="Semantic aliases">
          Always prefer semantic names (<code style={{ fontFamily: 'monospace', fontSize: 11 }}>--color-border</code>, <code style={{ fontFamily: 'monospace', fontSize: 11 }}>--color-text-primary</code>) over raw palette names in component CSS. Semantic tokens express intent and stay stable when the palette evolves.
        </Callout>
      </Block>
    </div>
  )
}
