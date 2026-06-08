import { useState } from 'react'
import { Chip } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const FILTER_CHIPS = ['All', 'BTC', 'ETH', 'SOL', 'USDT', 'Stablecoins', 'DeFi', 'Layer 2']
const CATEGORY_CHIPS = ['Spot', 'Futures', 'Options', 'P2P']

const CODE = `import { Chip } from '@/components/ui'
import { useState } from 'react'

// Single-select filter group
function AssetFilter() {
  const [active, setActive] = useState('All')

  return (
    <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap' }}>
      {['All', 'BTC', 'ETH', 'SOL', 'USDT'].map(label => (
        <Chip
          key={label}
          label={label}
          active={active === label}
          onClick={() => setActive(label)}
        />
      ))}
    </div>
  )
}

// Static (non-interactive) chip — no onClick
<Chip label="Stablecoins" />`

export default function ChipPage() {
  useToc([
    { id: 'filter-chips',   label: 'Filter chips' },
    { id: 'category-chips', label: 'Category chips' },
    { id: 'code',           label: 'Code' },
    { id: 'props',          label: 'Props' },
    { id: 'guidelines',     label: 'Guidelines' },
  ])

  const [activeFilter, setActiveFilter] = useState('All')
  const [activeCategory, setActiveCategory] = useState('Spot')

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="Chip"
        lead="Filter tags and category pills. Toggles between active (brand-filled) and inactive states. Typically used in filter bars and segmented category selectors."
      />

      <Block title="Filter chips">
        <p className="text-body-sm text-muted">Click any chip to toggle the active selection.</p>
        <div className={[pageStyles.demo, pageStyles.demoRow].join(' ')}>
          {FILTER_CHIPS.map(label => (
            <Chip key={label} label={label} active={activeFilter === label} onClick={() => setActiveFilter(label)} />
          ))}
        </div>
      </Block>

      <Block title="Category chips">
        <div className={[pageStyles.demo, pageStyles.demoRow].join(' ')}>
          {CATEGORY_CHIPS.map(label => (
            <Chip key={label} label={label} active={activeCategory === label} onClick={() => setActiveCategory(label)} />
          ))}
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'label', type: 'string', description: 'Chip display text' },
          { name: 'active', type: 'boolean', default: 'false', description: 'Active/selected state — applies brand purple fill and white text' },
          { name: 'onClick', type: '() => void', default: '—', description: 'Click handler. Omit for static (non-interactive) chips.' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Single-select pattern">
          Chip groups typically enforce single-select: clicking one chip deactivates the others. Manage this with a single <code style={{ fontFamily: 'monospace', fontSize: 11 }}>activeFilter</code> state string rather than a boolean per chip.
        </Callout>
        <Callout icon="♿" title="Accessibility">
          Chip renders as a <code style={{ fontFamily: 'monospace', fontSize: 11 }}>button</code>, so it's keyboard-focusable and activatable with Enter/Space by default. For a true multi-select scenario, add <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-pressed</code> to communicate the toggled state.
        </Callout>
      </Block>
    </div>
  )
}
