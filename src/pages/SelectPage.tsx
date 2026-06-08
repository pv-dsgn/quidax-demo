import { useState } from 'react'
import { Select } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const FLAT_OPTIONS = [
  { value: 'btc', label: 'Bitcoin (BTC)' },
  { value: 'eth', label: 'Ethereum (ETH)' },
  { value: 'sol', label: 'Solana (SOL)' },
  { value: 'usdt', label: 'Tether (USDT)' },
]

const GROUPED_OPTIONS = [
  {
    group: 'Fiat',
    options: [
      { value: 'ngn', label: 'Nigerian Naira (NGN)' },
      { value: 'usd', label: 'US Dollar (USD)' },
      { value: 'eur', label: 'Euro (EUR)' },
    ],
  },
  {
    group: 'Crypto',
    options: [
      { value: 'btc', label: 'Bitcoin (BTC)' },
      { value: 'eth', label: 'Ethereum (ETH)' },
      { value: 'sol', label: 'Solana (SOL)' },
    ],
  },
]

const CODE = `import { Select } from '@/components/ui'

// Flat options
<Select
  label="Coin"
  placeholder="Select a coin…"
  options={[
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
  ]}
  value={coin}
  onChange={setCoin}
/>

// Grouped options
<Select
  label="Currency"
  options={[
    { group: 'Fiat',   options: [{ value: 'ngn', label: 'Nigerian Naira (NGN)' }] },
    { group: 'Crypto', options: [{ value: 'btc', label: 'Bitcoin (BTC)' }] },
  ]}
/>

// With helper text / error
<Select
  label="Network"
  options={options}
  helperText="Fees vary by network"
  required
/>
<Select
  label="Network"
  options={options}
  errorMessage="Please select a network"
/>`

export default function SelectPage() {
  const [coin, setCoin] = useState('')
  const [currency, setCurrency] = useState('')

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
        title="Select / Dropdown"
        lead="Native-backed select with custom styling, grouped options, label, helper text, and error state. Inherits full browser and assistive-technology support from the underlying select element."
      />

      <Block title="Demo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xl)', maxWidth: 480 }}>

          <Select
            label="Coin"
            placeholder="Select a coin…"
            options={FLAT_OPTIONS}
            value={coin}
            onChange={setCoin}
            helperText="Choose the coin you want to trade"
          />

          <Select
            label="Currency"
            placeholder="Select currency…"
            options={GROUPED_OPTIONS}
            value={currency}
            onChange={setCurrency}
            required
          />

          <Select
            label="Network"
            options={FLAT_OPTIONS}
            errorMessage="Please select a network to continue"
          />

          <Select
            label="Payment method"
            options={FLAT_OPTIONS}
            disabled
            value="btc"
          />

        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'options',       type: 'SelectOption[] | SelectGroup[]',  description: 'Flat list or grouped list of options. Groups render as <optgroup> elements.' },
          { name: 'value',         type: 'string',    default: '—',     description: 'Controlled selected value' },
          { name: 'onChange',      type: '(value: string) => void', default: '—', description: 'Called with the new value when the user selects an option' },
          { name: 'label',         type: 'string',    default: '—',     description: 'Visible label linked to the select via htmlFor' },
          { name: 'placeholder',   type: 'string',    default: '—',     description: 'Disabled first option shown when no value is selected' },
          { name: 'helperText',    type: 'string',    default: '—',     description: 'Supporting text — shown when there is no error' },
          { name: 'errorMessage',  type: 'string',    default: '—',     description: 'Error text — replaces helperText and applies error styling when set' },
          { name: 'required',      type: 'boolean',   default: 'false', description: 'Marks the field required — appends an asterisk to the label' },
          { name: 'disabled',      type: 'boolean',   default: 'false', description: 'Prevents interaction and dims the entire field' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          {[
            { label: 'Flat vs grouped', desc: 'Use flat options for short homogeneous lists (≤8 items). Use groups when options span distinct categories — e.g. separating Fiat from Crypto currencies.' },
            { label: 'Placeholder',     desc: 'Provide a placeholder when no default selection makes sense. For required fields the placeholder option is non-selectable, acting as a prompt.' },
            { label: 'Long lists',      desc: 'For lists over ~20 items consider a searchable combobox pattern instead. The native select becomes hard to navigate at that scale.' },
            { label: 'Disabled options', desc: 'Mark individual options disabled (via option.disabled) for temporarily unavailable choices — e.g. maintenance, insufficient balance.' },
          ].map(({ label, desc }) => (
            <div key={label} style={{ display: 'flex', gap: 'var(--gap-md)', padding: 'var(--space-4)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', alignItems: 'flex-start' }}>
              <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(97,0,165,0.06)', color: 'var(--color-brand)', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{label}</code>
              <span className="text-body-sm text-muted">{desc}</span>
            </div>
          ))}
        </div>
        <Callout icon="♿" title="Accessibility">
          Built on the native <code style={{ fontFamily: 'monospace', fontSize: 11 }}>{`<select>`}</code> element — keyboard navigation, screen reader announcements, and mobile OS pickers all work without extra code.
          Label is linked via <code style={{ fontFamily: 'monospace', fontSize: 11 }}>htmlFor</code>. Helper/error text is wired via <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-describedby</code> and errors set <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-invalid</code>.
        </Callout>
      </Block>
    </div>
  )
}
