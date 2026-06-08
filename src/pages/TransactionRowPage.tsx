import { TransactionRow } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const TRANSACTIONS = [
  { action: 'Bought Bitcoin', date: 'Jun 5, 2026 · 14:32', amount: '+$2,450.00', coinAmount: '0.036 BTC', credit: true },
  { action: 'Sold Ethereum', date: 'Jun 4, 2026 · 09:15', amount: '-$890.00', coinAmount: '0.25 ETH', credit: false },
  { action: 'Received USDT', date: 'Jun 3, 2026 · 18:00', amount: '+$500.00', coinAmount: '500 USDT', credit: true },
  { action: 'Sent Solana', date: 'Jun 2, 2026 · 11:44', amount: '-$182.40', coinAmount: '1 SOL', credit: false },
  { action: 'Deposit via bank', date: 'Jun 1, 2026 · 08:00', amount: '+$5,000.00', credit: true },
  { action: 'Withdrawal to bank', date: 'May 30, 2026 · 16:20', amount: '-$1,200.00', credit: false },
]

const CODE = `import { TransactionRow } from '@/components/ui'

// Credit (inbound — green arrow)
<TransactionRow
  action="Bought Bitcoin"
  date="Jun 5, 2026 · 14:32"
  amount="+$2,450.00"
  coinAmount="0.036 BTC"
  credit={true}
/>

// Debit (outbound — red arrow)
<TransactionRow
  action="Sent Solana"
  date="Jun 2, 2026 · 11:44"
  amount="-$182.40"
  coinAmount="1 SOL"
  credit={false}
/>

// Fiat only (no coinAmount)
<TransactionRow
  action="Deposit via bank"
  date="Jun 1, 2026 · 08:00"
  amount="+$5,000.00"
  credit={true}
/>`

export default function TransactionRowPage() {
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
        title="TransactionRow"
        lead="Activity feed row for transaction history. The credit/debit direction controls the arrow icon and the amount color — green for inbound, red for outbound."
      />

      <Block title="Demo">
        <div className={pageStyles.demo}>
          {TRANSACTIONS.map((t, i) => <TransactionRow key={i} {...t} />)}
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'action', type: 'string', description: 'Transaction description — e.g. "Bought Bitcoin", "Sent USDT".' },
          { name: 'date', type: 'string', description: 'Formatted date and time string. Pass a pre-formatted string.' },
          { name: 'amount', type: 'string', description: 'Fiat amount with sign prefix — e.g. "+$2,450.00" or "-$890.00".' },
          { name: 'coinAmount', type: 'string', default: '—', description: 'Optional crypto denomination shown below the fiat amount — e.g. "0.036 BTC".' },
          { name: 'credit', type: 'boolean', default: 'true', description: 'true = green inbound arrow (receive/buy), false = red outbound arrow (send/sell).' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class.' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Amount formatting">
          Always include the sign prefix in the <code style={{ fontFamily: 'monospace', fontSize: 11 }}>amount</code> string: <code style={{ fontFamily: 'monospace', fontSize: 11 }}>+$2,450.00</code> for credits and <code style={{ fontFamily: 'monospace', fontSize: 11 }}>-$890.00</code> for debits. TransactionRow renders it verbatim. The color is controlled by the <code style={{ fontFamily: 'monospace', fontSize: 11 }}>credit</code> prop separately.
        </Callout>
        <Callout icon="💡" title="Date formatting">
          Format dates with both date and time: <code style={{ fontFamily: 'monospace', fontSize: 11 }}>Jun 5, 2026 · 14:32</code>. Use a <code style={{ fontFamily: 'monospace', fontSize: 11 }}>·</code> separator between date and time for visual consistency across the list.
        </Callout>
      </Block>
    </div>
  )
}
