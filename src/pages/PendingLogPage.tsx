import { useEffect, useState } from 'react'
import { Divider } from '@/components/ui'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const REPO = 'pv-dsgn/quidax-demo'

// ── GitHub types ──────────────────────────────────────────────────────────────

interface GitHubPR {
  number: number
  title: string
  html_url: string
  created_at: string
  updated_at: string
  draft: boolean
  user: { login: string; avatar_url: string }
  labels: Array<{ id: number; name: string; color: string }>
  body: string | null
}

type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; prs: GitHubPR[] }
  | { status: 'error'; message: string }

// ── Planned work ──────────────────────────────────────────────────────────────

type Priority = 'high' | 'medium' | 'low'
type Category = 'Component' | 'Foundation' | 'Tooling' | 'Documentation'

interface PlannedItem {
  id: string
  title: string
  category: Category
  priority: Priority
  description: string
}

const PLANNED: PlannedItem[] = [
  {
    id: 'button',
    title: 'Button',
    category: 'Component',
    priority: 'high',
    description: 'Primary, secondary, ghost, and destructive variants with loading state and icon slot.',
  },
  {
    id: 'input',
    title: 'Input / TextField',
    category: 'Component',
    priority: 'high',
    description: 'Text input with label, helper text, error state, and prefix/suffix slot.',
  },
  {
    id: 'modal',
    title: 'Modal / Dialog',
    category: 'Component',
    priority: 'medium',
    description: 'Accessible dialog with focus trap, scroll lock, backdrop click-to-dismiss, and size variants.',
  },
  {
    id: 'badge',
    title: 'Badge / Pill',
    category: 'Component',
    priority: 'medium',
    description: 'Small inline status pill for notification counts and categorical labels.',
  },
  {
    id: 'select',
    title: 'Select / Dropdown',
    category: 'Component',
    priority: 'medium',
    description: 'Native-backed select with custom styling, grouped options, and searchable variant.',
  },
  {
    id: 'dark-mode',
    title: 'Dark mode token layer',
    category: 'Foundation',
    priority: 'medium',
    description: 'prefers-color-scheme remapping of all semantic tokens to dark-surface values.',
  },
  {
    id: 'storybook',
    title: 'Storybook integration',
    category: 'Tooling',
    priority: 'medium',
    description: 'Stories for all 10 components with controls, a11y addon, and responsive viewport presets.',
  },
  {
    id: 'token-pipeline',
    title: 'Design token export pipeline',
    category: 'Tooling',
    priority: 'low',
    description: 'Style Dictionary build that generates tokens.css from a JSON source — enables Figma Variables sync.',
  },
  {
    id: 'code-connect',
    title: 'Figma Code Connect mappings',
    category: 'Tooling',
    priority: 'low',
    description: '.figma.ts files mapping each Figma component to its src/components/ui counterpart.',
  },
  {
    id: 'a11y-guide',
    title: 'Accessibility guidelines',
    category: 'Documentation',
    priority: 'low',
    description: 'Per-component ARIA pattern notes, keyboard navigation, and contrast ratio documentation.',
  },
]

// ── Config maps ───────────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  high:   { label: 'High',   color: 'var(--color-negative)',    bg: 'rgba(220,38,38,0.08)' },
  medium: { label: 'Medium', color: 'var(--color-warning-fg)',  bg: 'rgba(217,119,6,0.08)' },
  low:    { label: 'Low',    color: 'var(--foreground-contrast)', bg: 'var(--color-neutral-100)' },
}

const CATEGORY_CONFIG: Record<Category, { color: string; bg: string }> = {
  Component:     { color: 'var(--color-brand)',    bg: 'rgba(97,0,165,0.08)' },
  Foundation:    { color: 'var(--color-info-fg)',  bg: 'rgba(59,130,246,0.08)' },
  Tooling:       { color: 'var(--color-positive)', bg: 'rgba(22,163,74,0.08)' },
  Documentation: { color: 'var(--color-warning-fg)', bg: 'rgba(217,119,6,0.08)' },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r},${g},${b}`
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Tag({
  label,
  color,
  bg,
}: {
  label: string
  color: string
  bg: string
}) {
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 11,
      fontWeight: 600,
      fontFamily: 'var(--font-family-sans)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color,
      background: bg,
      padding: '2px 8px',
      borderRadius: 4,
      lineHeight: 1.8,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {label}
    </span>
  )
}

function PRCard({ pr }: { pr: GitHubPR }) {
  return (
    <a
      href={pr.html_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-5)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--background)',
        border: '1px solid var(--color-neutral-200)',
        textDecoration: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = 'var(--color-brand)'
        el.style.boxShadow = '0 2px 12px rgba(97,0,165,0.08)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = 'var(--color-neutral-200)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Top row: number + badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)', flexWrap: 'wrap' }}>
        <code style={{
          fontSize: 11,
          fontFamily: 'SF Mono, ui-monospace, monospace',
          color: 'var(--color-brand)',
          background: 'rgba(97,0,165,0.08)',
          padding: '2px 8px',
          borderRadius: 4,
          fontWeight: 600,
        }}>
          #{pr.number}
        </code>

        {pr.draft && (
          <Tag label="Draft" color="var(--foreground-contrast)" bg="var(--color-neutral-100)" />
        )}

        {pr.labels.map(label => (
          <span
            key={label.id}
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 500,
              fontFamily: 'var(--font-family-sans)',
              color: `rgb(${hexToRgb(label.color)})`,
              background: `rgba(${hexToRgb(label.color)},0.1)`,
              padding: '2px 8px',
              borderRadius: 4,
              lineHeight: 1.8,
              whiteSpace: 'nowrap',
            }}
          >
            {label.name}
          </span>
        ))}
      </div>

      {/* Title */}
      <span
        className="text-body"
        style={{ color: 'var(--foreground)', fontWeight: 500, lineHeight: 1.4 }}
      >
        {pr.title}
      </span>

      {/* Footer: author + timestamps */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--gap-md)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)' }}>
          <img
            src={pr.user.avatar_url}
            alt={pr.user.login}
            width={18}
            height={18}
            style={{ borderRadius: '50%', flexShrink: 0 }}
          />
          <span className="text-caption text-muted">{pr.user.login}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)' }}>
          <span className="text-caption text-muted">Opened {timeAgo(pr.created_at)}</span>
          {pr.updated_at !== pr.created_at && (
            <>
              <span style={{ color: 'var(--color-neutral-250)' }}>·</span>
              <span className="text-caption text-muted">Updated {timeAgo(pr.updated_at)}</span>
            </>
          )}
        </div>
      </div>
    </a>
  )
}

function PRSkeleton() {
  const bar = (w: string, h = '12px') => (
    <div style={{
      width: w, height: h,
      borderRadius: 4,
      background: 'var(--color-neutral-150)',
      animation: 'pulse 1.4s ease-in-out infinite',
    }} />
  )
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-neutral-200)',
    }}>
      <div style={{ display: 'flex', gap: 'var(--gap-sm)' }}>{bar('48px')} {bar('56px')}</div>
      {bar('72%', '16px')}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>{bar('80px')} {bar('96px')}</div>
    </div>
  )
}

function PREmptyState() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-12) var(--space-6)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-neutral-100)',
      border: '1px dashed var(--color-neutral-250)',
      textAlign: 'center',
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-positive)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
      <div>
        <p className="text-body" style={{ color: 'var(--foreground)', fontWeight: 500, margin: 0 }}>
          All clear
        </p>
        <p className="text-body-sm text-muted" style={{ margin: 0 }}>
          No open pull requests on{' '}
          <a
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-brand)', textDecoration: 'none' }}
          >
            {REPO}
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function PlannedCard({ item }: { item: PlannedItem }) {
  const p = PRIORITY_CONFIG[item.priority]
  const c = CATEGORY_CONFIG[item.category]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--background)',
      border: '1px solid var(--color-neutral-200)',
    }}>
      {/* Tags */}
      <div style={{ display: 'flex', gap: 'var(--gap-xs)', flexWrap: 'wrap' }}>
        <Tag label={item.category} color={c.color} bg={c.bg} />
        <Tag label={p.label} color={p.color} bg={p.bg} />
      </div>

      {/* Title */}
      <span className="text-body" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
        {item.title}
      </span>

      {/* Description */}
      <p className="text-body-sm text-muted" style={{ margin: 0, lineHeight: 1.6 }}>
        {item.description}
      </p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PendingLogPage() {
  useToc([
    { id: 'open-prs', label: 'Open PRs' },
    { id: 'planned',  label: 'Planned' },
  ])

  const [state, setState] = useState<FetchState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://api.github.com/repos/${REPO}/pulls?state=open&per_page=30`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`)
        return res.json() as Promise<GitHubPR[]>
      })
      .then(prs => setState({ status: 'success', prs }))
      .catch(err => {
        if (err.name === 'AbortError') return
        setState({ status: 'error', message: err.message ?? 'Could not reach GitHub API.' })
      })

    return () => controller.abort()
  }, [])

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Project"
        title="Pendinglog"
        lead="Live open pull requests from GitHub alongside planned work items. PRs update on each page load. Planned items are maintained manually in this file."
      />

      {/* ── Open PRs ── */}
      <Block title="Open PRs">
        <p className="text-body-sm text-muted">
          Fetched live from{' '}
          <a
            href={`https://github.com/${REPO}/pulls`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-brand)', textDecoration: 'none' }}
          >
            github.com/{REPO}
          </a>
          . Click any card to open the PR.
        </p>

        {/* Loading */}
        {state.status === 'loading' && (
          <>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
              <PRSkeleton />
              <PRSkeleton />
            </div>
          </>
        )}

        {/* Error */}
        {state.status === 'error' && (
          <Callout icon="⚠️" title="Could not load PRs">
            {state.message}
          </Callout>
        )}

        {/* Empty */}
        {state.status === 'success' && state.prs.length === 0 && (
          <PREmptyState />
        )}

        {/* PR list */}
        {state.status === 'success' && state.prs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
            {state.prs.map(pr => <PRCard key={pr.number} pr={pr} />)}
          </div>
        )}
      </Block>

      <Divider />

      {/* ── Planned ── */}
      <Block title="Planned">
        <p className="text-body-sm text-muted">
          Upcoming components, foundation work, and tooling improvements. Priority reflects design system impact, not timeline.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--gap-md)',
        }}>
          {PLANNED.map(item => <PlannedCard key={item.id} item={item} />)}
        </div>

        <Callout icon="📝" title="Adding to this list">
          To log a new planned item, add an entry to the <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>PLANNED</code> array in <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'var(--color-neutral-150)', padding: '2px 6px', borderRadius: 4 }}>src/pages/PendingLogPage.tsx</code>. When the work ships, move it to the Changelog instead.
        </Callout>
      </Block>
    </div>
  )
}
