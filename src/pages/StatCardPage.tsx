import { StatCard } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const CODE = `import { StatCard } from '@/components/ui'

// With positive trend
<StatCard
  label="Portfolio Value"
  value="$24,840.00"
  trend="12.4% this month"
  trendPositive={true}
/>

// With negative trend
<StatCard
  label="BTC Holdings"
  value="0.368 BTC"
  trend="2.1% dropped"
  trendPositive={false}
/>

// Value only (no trend)
<StatCard
  label="24h Volume"
  value="$1.2B"
/>

// Common dashboard grid
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-md)' }}>
  <StatCard label="Portfolio Value" value="$24,840" trend="↑ 12.4%" trendPositive />
  <StatCard label="Total P&L"       value="+$2,720" trend="4 trades" trendPositive />
  <StatCard label="BTC Holdings"    value="0.368 BTC" />
  <StatCard label="24h Volume"      value="$1.2B" />
</div>`

export default function StatCardPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="StatCard"
        lead="Metric display card for dashboard summaries. Shows a label, primary value, and an optional trend indicator. Typically arranged in a 2× or 4-column grid."
      />

      <Block title="Demo">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-md)', padding: 'var(--card-padding)', background: 'var(--color-neutral-100)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <StatCard label="Portfolio Value" value="$24,840.00" trend="12.4% this month" trendPositive />
          <StatCard label="Total P&L" value="+$2,720.00" trend="4 trades today" trendPositive />
          <StatCard label="BTC Holdings" value="0.368 BTC" trend="2.1% dropped" trendPositive={false} />
          <StatCard label="24h Volume" value="$1.2B" />
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'label', type: 'string', description: 'Short metric name displayed above the value — keep it under 4 words.' },
          { name: 'value', type: 'string', description: 'Primary metric value — pass a pre-formatted string including units.' },
          { name: 'trend', type: 'string', default: '—', description: 'Optional trend text shown below the value with a directional indicator.' },
          { name: 'trendPositive', type: 'boolean', default: 'true', description: 'true = green ↑ arrow, false = red ↓ arrow. Ignored when trend is not set.' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class for layout composition.' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Value formatting">
          Format all numeric values before passing them as strings. StatCard doesn't apply any number formatting internally — it renders the value verbatim. Use <code style={{ fontFamily: 'monospace', fontSize: 11 }}>Intl.NumberFormat</code> or a formatting helper for consistency.
        </Callout>
        <Callout icon="ℹ" title="Grid layout">
          StatCards look best in a 2-column or 4-column grid with <code style={{ fontFamily: 'monospace', fontSize: 11 }}>gap: var(--gap-md)</code>. Ensure cards in the same row have equal height — CSS Grid handles this automatically when cards are direct grid children.
        </Callout>
      </Block>
    </div>
  )
}
