import { CoinRow } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const COINS = [
  { symbol: 'B', name: 'Bitcoin', ticker: 'BTC', price: '$67,240.00', change: '2.4%', changePositive: true, iconColor: '#F7931A' },
  { symbol: 'E', name: 'Ethereum', ticker: 'ETH', price: '$3,512.80', change: '1.8%', changePositive: true, iconColor: '#627EEA' },
  { symbol: 'S', name: 'Solana', ticker: 'SOL', price: '$182.40', change: '0.6%', changePositive: false, iconColor: '#9945FF' },
  { symbol: 'U', name: 'USDT', ticker: 'USDT', price: '$1.00', change: '0.01%', changePositive: true, iconColor: '#26A17B' },
  { symbol: 'B', name: 'BNB', ticker: 'BNB', price: '$612.30', change: '3.1%', changePositive: false, iconColor: '#F3BA2F' },
]

const CODE = `import { CoinRow } from '@/components/ui'

<CoinRow
  symbol="B"
  name="Bitcoin"
  ticker="BTC"
  price="$67,240.00"
  change="2.4%"
  changePositive={true}
  iconColor="#F7931A"
/>

// Negative change
<CoinRow
  symbol="S"
  name="Solana"
  ticker="SOL"
  price="$182.40"
  change="0.6%"
  changePositive={false}
  iconColor="#9945FF"
/>

// Minimal (no custom icon color — uses --color-brand)
<CoinRow symbol="U" name="USDT" ticker="USDT" price="$1.00" change="0.01%" />`

export default function CoinRowPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="CoinRow"
        lead="Asset list row displaying a coin's identity, current price, and 24-hour price change. Used in markets lists, watchlists, and portfolio summaries."
      />

      <Block title="Demo">
        <div className={pageStyles.demo}>
          {COINS.map(c => <CoinRow key={c.ticker + c.name} {...c} />)}
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'symbol', type: 'string', description: '1–3 character string — the first character is used as the icon letter' },
          { name: 'name', type: 'string', description: 'Full asset name displayed below the ticker' },
          { name: 'ticker', type: 'string', description: 'Trading ticker e.g. BTC, ETH, USDT' },
          { name: 'price', type: 'string', description: 'Formatted price string — include currency symbol' },
          { name: 'change', type: 'string', description: 'Percentage change string — include the % symbol' },
          { name: 'changePositive', type: 'boolean', default: 'true', description: 'true shows a green ▲ (price up), false shows a red ▼ (price down)' },
          { name: 'iconColor', type: 'string', default: 'var(--color-brand)', description: 'Background color of the coin icon circle' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Icon colors">
          Each major coin has an established brand color. Use these consistently: BTC #F7931A, ETH #627EEA, SOL #9945FF, BNB #F3BA2F, USDT #26A17B. For unknown or new coins, fall back to <code style={{ fontFamily: 'monospace', fontSize: 11 }}>var(--color-brand)</code>.
        </Callout>
        <Callout icon="💡" title="Price formatting">
          Format prices with the currency symbol and at least 2 decimal places. For stablecoins near $1, show enough precision to distinguish movement (e.g. $1.0003). Pass pre-formatted strings — CoinRow doesn't format numbers internally.
        </Callout>
      </Block>
    </div>
  )
}
