import { useState } from 'react'
import { TabBar } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const MARKET_TABS = ['All', 'Favourites', 'Gainers', 'Losers', 'New']
const ACCOUNT_TABS = ['Overview', 'Markets', 'Portfolio', 'History']

const TAB_CONTENTS: Record<string, string> = {
  'All': 'Showing all 200+ supported trading pairs sorted by 24h volume.',
  'Favourites': 'Your starred assets: BTC, ETH, SOL. Add more from the market list.',
  'Gainers': 'Top 20 assets by positive 24h price change.',
  'Losers': 'Top 20 assets by negative 24h price change.',
  'New': '8 newly listed assets in the last 30 days.',
  'Overview': 'Your portfolio summary and recent performance.',
  'Markets': 'Live market data for all supported assets.',
  'Portfolio': 'Detailed breakdown of your holdings by asset.',
  'History': 'Complete transaction and order history.',
}

const CODE = `import { TabBar } from '@/components/ui'
import { useState } from 'react'

// Controlled tab bar
function MarketTabs() {
  const [tab, setTab] = useState('All')

  return (
    <>
      <TabBar
        tabs={['All', 'Favourites', 'Gainers', 'Losers', 'New']}
        activeTab={tab}
        onChange={setTab}
      />

      {/* Render content based on active tab */}
      {tab === 'All'        && <AllMarketsView />}
      {tab === 'Favourites' && <FavouritesView />}
      {tab === 'Gainers'    && <GainersView />}
    </>
  )
}`

const TAB_PROPS = `// TabBar props
tabs: string[]                    // ordered tab labels
activeTab: string                 // controlled active tab (match string exactly)
onChange: (tab: string) => void   // called when a Tab is clicked

// Tab props (individual pill — rarely used directly)
label: string
active?: boolean
onClick?: () => void`

export default function TabsPage() {
  const [marketTab, setMarketTab] = useState('All')
  const [accountTab, setAccountTab] = useState('Overview')

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="Tab / TabBar"
        lead="Accessible tabbed navigation. TabBar orchestrates a group of Tab buttons with a fully controlled active state. Use for switching between views within the same page context."
      />

      <Block title="Market tabs">
        <div className={pageStyles.demoClean} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <TabBar tabs={MARKET_TABS} activeTab={marketTab} onChange={setMarketTab} />
          <div style={{ padding: 'var(--space-4) var(--card-padding)', background: 'var(--background)', borderTop: '1px solid var(--color-border)' }}>
            <p className="text-body-sm text-muted">{TAB_CONTENTS[marketTab]}</p>
          </div>
        </div>
      </Block>

      <Block title="Account tabs">
        <div className={pageStyles.demoClean} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <TabBar tabs={ACCOUNT_TABS} activeTab={accountTab} onChange={setAccountTab} />
          <div style={{ padding: 'var(--space-4) var(--card-padding)', background: 'var(--background)', borderTop: '1px solid var(--color-border)' }}>
            <p className="text-body-sm text-muted">{TAB_CONTENTS[accountTab]}</p>
          </div>
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
        <CodeBlock code={TAB_PROPS} lang="ts" />
      </Block>

      <Block title="Props">
        <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-4)' }}>TabBar (the primary component):</p>
        <PropsTable props={[
          { name: 'tabs', type: 'string[]', description: 'Ordered array of tab label strings — rendered left to right.' },
          { name: 'activeTab', type: 'string', description: 'Currently active tab — matched by exact string equality against items in tabs.' },
          { name: 'onChange', type: '(tab: string) => void', description: 'Called with the clicked tab label. Update your state here.' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class on the tablist wrapper.' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Controlled state">
          TabBar is fully controlled — it owns no internal state. Pass the current tab via <code style={{ fontFamily: 'monospace', fontSize: 11 }}>activeTab</code> and update it via <code style={{ fontFamily: 'monospace', fontSize: 11 }}>onChange</code>. This makes it easy to sync with URL params or external state.
        </Callout>
        <Callout icon="♿" title="Accessibility">
          TabBar renders with <code style={{ fontFamily: 'monospace', fontSize: 11 }}>role="tablist"</code> and each Tab renders with <code style={{ fontFamily: 'monospace', fontSize: 11 }}>role="tab"</code> and <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-selected</code>. Pair with a panel container using <code style={{ fontFamily: 'monospace', fontSize: 11 }}>role="tabpanel"</code> for full ARIA compliance.
        </Callout>
      </Block>
    </div>
  )
}
