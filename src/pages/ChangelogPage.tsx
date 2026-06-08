import { Divider } from '@/components/ui'
import { pageStyles, PageHeader } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

type ChangeType = 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed'

interface ChangeGroup {
  type: ChangeType
  items: string[]
}

interface ChangelogEntry {
  id: string
  date: string
  sha: string
  title: string
  description?: string
  changes: ChangeGroup[]
}

const TAG_CONFIG: Record<ChangeType, { label: string; color: string; bg: string }> = {
  added:      { label: 'Added',      color: 'var(--color-positive)',    bg: 'rgba(22,163,74,0.08)' },
  changed:    { label: 'Changed',    color: 'var(--color-info-fg)',     bg: 'rgba(59,130,246,0.08)' },
  deprecated: { label: 'Deprecated', color: 'var(--color-warning-fg)', bg: 'rgba(217,119,6,0.08)' },
  removed:    { label: 'Removed',    color: 'var(--color-negative)',    bg: 'rgba(220,38,38,0.08)' },
  fixed:      { label: 'Fixed',      color: 'var(--color-brand)',       bg: 'rgba(97,0,165,0.08)' },
}

const CHANGELOG: ChangelogEntry[] = [
  {
    id: 'color-token-alignment',
    date: '2026-06-08',
    sha: 'd13b2c2',
    title: 'Color token alignment — ColorsPage & DesignPage',
    description: 'ColorsPage and DesignPage updated to fully reflect all design tokens, including the three newly added semantic tokens and the corrected success colour values.',
    changes: [
      {
        type: 'changed',
        items: [
          'ColorsPage Semantic group: adds --muted-foreground, --card, --border swatches; description updated to mention borders',
          'ColorsPage Status group: adds --color-success-fg (#065F46) and --color-success-bg (#D1FAE5) with corrected design values at the top of the group',
          'ColorsPage usage snippet now demonstrates --muted-foreground, --card, --border, and the success pair',
          'ColorsPage page lead updated to "16 CSS custom properties"; semantic aliases callout updated to reference new token names',
          'DesignPage semantic swatch grid: adds --color-positive (#16A34A) for market data indicators',
        ],
      },
    ],
  },
  {
    id: 'missing-tokens-sync',
    date: '2026-06-08',
    sha: '7d1885b',
    title: 'Add 2 missing design tokens & sync success colours',
    description: 'Closes the gap between the design file\'s 16 colour tokens and the codebase. Two tokens were absent from tokens.css; success colour values also differed from the Pencil variables.',
    changes: [
      {
        type: 'added',
        items: [
          '--muted-foreground: #4C4A55 — used by design components for placeholder and de-emphasised text',
          '--card: #FFFFFF — card surface fill token, distinct from --background',
          '--border: var(--color-neutral-200) — direct alias matching the design\'s variable name ($--border)',
        ],
      },
      {
        type: 'fixed',
        items: [
          '--color-success-fg corrected: #16A34A → #065F46 (darker forest green, matching Pencil variable)',
          '--color-success-bg corrected: #F0FDF4 → #D1FAE5 (medium green tint, matching Pencil variable)',
        ],
      },
    ],
  },
  {
    id: 'design-canvas-section',
    date: '2026-06-08',
    sha: 'dcfb01f',
    title: 'Design page: canvas frame previews',
    description: 'Exports all three top-level .pen frames as WebP images via the Pencil MCP and embeds them on the Design page as a single scrollable canvas strip.',
    changes: [
      {
        type: 'added',
        items: [
          'Canvas section in DesignPage — three WebP exports of Documentation, Elements, and Components frames from dsm-design.lib.pen',
          'Frame images stored at public/assets/design-canvas/; each links to full-size image on click',
        ],
      },
      {
        type: 'changed',
        items: [
          'Canvas layout revised from three separate labelled sections to a single horizontally-scrollable strip, matching how the frames appear side-by-side on the Pencil canvas',
        ],
      },
    ],
  },
  {
    id: 'gitignore-cleanup',
    date: '2026-06-08',
    sha: 'cefca4f',
    title: 'Repository cleanup — .gitignore',
    description: 'node_modules, the .claude config directory, and the licensed font TTF were accidentally committed with the Design page. This commit removes them and adds a .gitignore to prevent recurrence.',
    changes: [
      {
        type: 'fixed',
        items: [
          '.gitignore added: excludes node_modules/, dist/, .claude/, *.ttf/otf/woff/woff2, and Vite cache',
        ],
      },
      {
        type: 'removed',
        items: [
          'node_modules/ (3 400+ files) untracked from git index',
          '.claude/ settings and skills untracked',
          '"Uncut Sans Variable.ttf" licensed font file untracked',
        ],
      },
    ],
  },
  {
    id: 'design-page',
    date: '2026-06-08',
    sha: '7ae46da',
    title: 'Design page & docs layout improvements',
    description: 'Adds a comprehensive Design page sourced directly from dsm-design.lib.pen via the Pencil MCP, and improves the docs layout centering and width.',
    changes: [
      {
        type: 'added',
        items: [
          'DesignPage (/design) — 7-section reference: Overview (stats), Elements (15 atoms with live previews), Components (11 composed patterns), Color Tokens (swatch grid with click-to-copy), Typography (11-step live scale), Spacing (visual 4px-grid bars), Governance (4 rule cards, critical rules, maintenance table)',
          'DocsLayout nav: "Design" entry added to sidebar and mobile dropdown',
        ],
      },
      {
        type: 'changed',
        items: [
          'DocsLayout main content area centered with margin-inline: auto within its grid column',
          'Main content max-width increased from 860px to 920px',
        ],
      },
    ],
  },
  {
    id: 'pendinglog-page',
    date: '2026-06-08',
    sha: 'd9c2e92',
    title: 'PendingLog page — live PRs & planned work',
    description: 'Adds the PendingLog page (/pendinglog) which fetches open pull requests live from the GitHub API on each page load and pairs them with a static planned-work grid.',
    changes: [
      {
        type: 'added',
        items: [
          'PendingLogPage (/Pendinglog) — live open PR feed from pv-dsgn/quidax-demo via GitHub API; includes loading skeleton, empty state ("all clear"), and error fallback',
          'PR cards: number badge, draft/label tags, author avatar + login, "opened X ago / updated X ago" timestamps; click to open PR on GitHub',
          'Planned items grid: 10 entries across Component, Foundation, Tooling, and Documentation categories with High / Medium / Low priority tags',
          'Callout explaining where to add new planned items and when to move them to the Changelog',
        ],
      },
    ],
  },
  {
    id: 'prev-next-nav',
    date: '2026-06-08',
    sha: '93e2706',
    title: 'Prev/Next page navigation & mobile dropdown',
    description: 'Adds end-of-page navigation links across all doc pages and replaces the mobile horizontal-scroll carousel with a native select dropdown.',
    changes: [
      {
        type: 'added',
        items: [
          'PageNav component — renders ← Previous / Next → links at the bottom of every docs page, derived from the ordered NAV array in DocsLayout',
          'MobileNavSelect — native <select> dropdown that navigates on change, replacing the horizontal-scroll carousel at ≤768 px',
        ],
      },
      {
        type: 'changed',
        items: [
          'Mobile sidebar <nav> hidden at the 768 px breakpoint; MobileNavSelect shown in its place',
          'PageNav links render without a border — hover applies a subtle brand-tinted background with no box-shadow',
        ],
      },
    ],
  },
  {
    id: 'navbar-statcard-polish',
    date: '2026-06-08',
    sha: 'c9882fc',
    title: 'NavBar, StatCard & docs layout polish',
    description: 'Visual refinements pass across the NavBar component, StatCard, and the documentation site shell.',
    changes: [
      {
        type: 'changed',
        items: [
          'NavBar: link active state, spacing, and logo alignment refined',
          'StatCard: internal hierarchy tightened — value/label sizing and trend indicator improved',
          'DocsLayout: sidebar gap, main area padding, and breakpoint behaviour adjusted across all viewport sizes',
        ],
      },
    ],
  },
  {
    id: 'docs-site',
    date: '2026-06-08',
    sha: '4bdcffa',
    title: 'Routed design system documentation site',
    description: 'Scaffolds the full React Router-based docs site with sidebar navigation, table of contents, and all 14 documentation pages.',
    changes: [
      {
        type: 'added',
        items: [
          'DocsLayout — three-column shell (sidebar / main / ToC) with sticky top bar, keyword search, and grouped NavLink navigation',
          'TocContext — IntersectionObserver-driven scroll tracking that powers the right-panel "On this page" list',
          'CodeBlock — syntax-highlighted code snippets with copy-to-clipboard',
          'Section primitives: PageHeader, Block, Callout — shared across all doc pages',
          'Introduction page — overview, token primer, quick-start guide, and design principles',
          'Foundation pages: Colors (swatch grid with click-to-copy tokens), Typography (full type scale preview), Spacing (scale table and gap reference)',
          '10 component doc pages: Alert, Avatar, Chip, CoinRow, Divider, NavBar, StatCard, Tab/TabBar, Toggle, TransactionRow',
          'React Router nested routes under the DocsLayout shell',
        ],
      },
    ],
  },
  {
    id: 'component-library',
    date: '2026-06-07',
    sha: 'aaf188b',
    title: 'UI component library & design token sync',
    description: 'First release of all 10 production UI components, each wired to the token system and exported from a single barrel.',
    changes: [
      {
        type: 'added',
        items: [
          'Alert — four severity variants (info, success, warning, error) with optional dismiss action',
          'Avatar — image/initials fallback, three sizes (sm / md / lg), optional status dot',
          'Chip — toggleable filter chip with active state driven by --color-brand',
          'CoinRow — crypto asset list row with icon, coin name, price, and price delta',
          'Divider — horizontal rule aliased to --color-border',
          'NavBar — responsive top bar with logo and configurable link items',
          'StatCard — KPI card with label, value, and optional up/down trend indicator',
          'Tab / TabBar — controlled tab strip with animated active-bar underline',
          'Toggle — accessible switch component backed by a hidden checkbox',
          'TransactionRow — transaction list item with type icon, description, amount, and status badge',
          'Barrel export at src/components/ui/index.ts',
        ],
      },
      {
        type: 'changed',
        items: [
          'Design tokens synced from the Pencil design file — semantic alias tokens added for --color-border and --color-surface-muted',
        ],
      },
    ],
  },
  {
    id: 'uncut-sans',
    date: '2026-06-03',
    sha: '514d29f',
    title: 'Uncut Sans Variable typeface',
    description: 'Adds the licensed variable font and wires it into the token system as the sole typeface.',
    changes: [
      {
        type: 'added',
        items: [
          'Uncut Sans Variable woff2 file in public/fonts/',
          'src/styles/fonts.css — @font-face declaration covering the wght axis (300–700)',
          '--font-family-sans token set to "Uncut Sans Variable" with system-ui fallback chain',
        ],
      },
    ],
  },
  {
    id: 'design-tokens',
    date: '2026-06-03',
    sha: '941720a',
    title: 'Design tokens, type scale & Figma MCP rules',
    description: 'Foundation layer: all CSS custom properties, the full type scale, global resets, and the agent conventions that govern Figma-driven work.',
    changes: [
      {
        type: 'added',
        items: [
          'src/styles/tokens.css — full color palette, semantic aliases, 4 px spacing scale, gap tokens, border radius, shadow, and layout helper tokens (--container-max, --section-padding-y/x, --card-padding)',
          'src/styles/typography.css — 11-step semantic type scale from Display XL to Label, with fluid clamp() sizes for headings',
          'src/styles/global.css — CSS reset and base body styles',
          'CLAUDE.md — design system conventions, token reference, Figma MCP integration workflow, and component architecture rules',
        ],
      },
    ],
  },
]

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateShort(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

function ChangeTag({ type }: { type: ChangeType }) {
  const t = TAG_CONFIG[type]
  return (
    <span style={{
      display: 'inline-block',
      flexShrink: 0,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: 'var(--font-family-sans)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: t.color,
      background: t.bg,
      padding: '2px 8px',
      borderRadius: 4,
      lineHeight: 1.8,
      whiteSpace: 'nowrap',
    }}>
      {t.label}
    </span>
  )
}

function EntryCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <article
      id={entry.id}
      style={{ scrollMarginTop: '5rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
    >
      {/* Meta row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--gap-md)',
        flexWrap: 'wrap',
      }}>
        <time
          dateTime={entry.date}
          className="text-caption"
          style={{ color: 'var(--foreground-contrast)', fontVariantNumeric: 'tabular-nums' }}
        >
          {formatDate(entry.date)}
        </time>
        <code style={{
          fontSize: 11,
          fontFamily: 'SF Mono, ui-monospace, monospace',
          color: 'var(--foreground-contrast)',
          background: 'var(--color-neutral-100)',
          padding: '2px 8px',
          borderRadius: 4,
          border: '1px solid var(--color-neutral-200)',
          flexShrink: 0,
        }}>
          {entry.sha}
        </code>
      </div>

      {/* Title */}
      <h3
        className="text-h4"
        style={{ color: 'var(--foreground)', margin: 0, lineHeight: 1.3 }}
      >
        {entry.title}
      </h3>

      {/* Description */}
      {entry.description && (
        <p className="text-body-sm text-muted" style={{ maxWidth: '64ch', margin: 0 }}>
          {entry.description}
        </p>
      )}

      {/* Change groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}>
        {entry.changes.map(group => (
          <div
            key={group.type}
            style={{ display: 'flex', gap: 'var(--gap-md)', alignItems: 'flex-start' }}
          >
            <ChangeTag type={group.type} />
            <ul style={{
              margin: 0,
              paddingLeft: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
            }}>
              {group.items.map(item => (
                <li
                  key={item}
                  className="text-body-sm"
                  style={{ color: 'var(--foreground-contrast)', lineHeight: 1.65 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}

export default function ChangelogPage() {
  useToc(
    CHANGELOG.map(e => ({
      id: e.id,
      label: `${formatDateShort(e.date)} — ${e.sha}`,
    }))
  )

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Project"
        title="Changelog"
        lead="Every merged PR logged in reverse-chronological order — new components, token updates, documentation changes, and deprecations, each tagged and timestamped."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {CHANGELOG.map((entry, i) => (
          <div key={entry.id}>
            <EntryCard entry={entry} />
            {i < CHANGELOG.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  )
}
