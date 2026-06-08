import { Divider, StatCard } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const CODE = `import { Divider } from '@/components/ui'

// Between two sections
<section>
  <h2>Portfolio</h2>
  <p>Your holdings overview</p>
</section>

<Divider />

<section>
  <h2>Transaction history</h2>
  <p>Recent activity</p>
</section>

// Inside a card — separating header from body
<div className={styles.card}>
  <h3>Bitcoin</h3>
  <Divider />
  <p>$67,240.00</p>
</div>`

export default function DividerPage() {
  useToc([
    { id: 'demo',       label: 'Demo' },
    { id: 'code',       label: 'Code' },
    { id: 'props',      label: 'Props' },
    { id: 'guidelines', label: 'Guidelines' },
  ])

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="Divider"
        lead="A horizontal separator using var(--color-border). Provides visual separation between content sections without adding semantic weight."
      />

      <Block title="Demo">
        <div className={pageStyles.demo}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
            <p className="text-body-sm text-muted">Portfolio overview</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-md)' }}>
              <StatCard label="Portfolio Value" value="$24,840" trend="12.4% this month" trendPositive />
              <StatCard label="24h P&L" value="+$316" trend="2 trades" trendPositive />
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}>
            <p className="text-body-sm text-muted">Transaction history</p>
            <p className="text-caption text-muted">No recent transactions.</p>
          </div>
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'className', type: 'string', default: '—', description: 'Optional extra class for custom margin or width overrides' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Semantic note">
          Divider renders as an <code style={{ fontFamily: 'monospace', fontSize: 11 }}>{'<hr>'}</code> element, which carries semantic meaning — it signals a thematic break in content. For purely decorative lines, use a styled <code style={{ fontFamily: 'monospace', fontSize: 11 }}>{'<div>'}</code> with a border instead.
        </Callout>
        <Callout icon="ℹ" title="Spacing">
          Divider has no margin of its own — control the gap around it with spacing on its parent or sibling containers. This avoids double-margin issues and keeps the component predictable.
        </Callout>
      </Block>
    </div>
  )
}
