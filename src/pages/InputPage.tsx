import { Input } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const CODE = `import { Input } from '@/components/ui'

// Basic
<Input label="Email" type="email" placeholder="you@example.com" />

// Required with helper text
<Input
  label="Amount"
  type="number"
  placeholder="0.00"
  helperText="Minimum trade: 0.001 BTC"
  required
/>

// Error state
<Input
  label="Wallet address"
  value={address}
  errorMessage="Invalid wallet address format"
/>

// With prefix / suffix
<Input label="Amount" prefix="₦" suffix="NGN" placeholder="0.00" />

// Disabled
<Input label="Account number" value="4012 3456 7890" disabled />`

export default function InputPage() {
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
        title="Input / TextField"
        lead="Single-line text entry with label, helper text, error feedback, and optional prefix/suffix slots. Built on a native input for full browser and assistive-technology compatibility."
      />

      <Block title="Demo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xl)', maxWidth: 480 }}>

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
          />

          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            helperText="Minimum trade: 0.001 BTC"
            required
          />

          <Input
            label="Wallet address"
            defaultValue="0xDEAD"
            errorMessage="Invalid wallet address format"
          />

          <Input
            label="NGN amount"
            type="number"
            placeholder="0.00"
            prefix="₦"
            suffix="NGN"
          />

          <Input
            label="Account number"
            defaultValue="4012 3456 7890"
            disabled
          />

        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'label',        type: 'string',    default: '—',     description: 'Visible label rendered above the input and linked via htmlFor' },
          { name: 'helperText',   type: 'string',    default: '—',     description: 'Supporting text below the input — shown when there is no error' },
          { name: 'errorMessage', type: 'string',    default: '—',     description: 'Error text — replaces helperText and applies error styling when set' },
          { name: 'prefix',       type: 'ReactNode', default: '—',     description: 'Content rendered inside the wrapper before the input — currency symbols, icons' },
          { name: 'suffix',       type: 'ReactNode', default: '—',     description: 'Content rendered inside the wrapper after the input — units, icon buttons' },
          { name: 'required',     type: 'boolean',   default: 'false', description: 'Marks the field required — appends an asterisk to the label' },
          { name: 'disabled',     type: 'boolean',   default: 'false', description: 'Prevents interaction and dims the entire field' },
          { name: 'className',    type: 'string',    default: '—',     description: 'Additional CSS class forwarded to the native input element' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          {[
            { label: 'Labels',       desc: 'Always provide a visible label. Placeholder text is not a substitute — it disappears on focus and is not announced consistently by screen readers.' },
            { label: 'Helper text',  desc: 'Use helperText for constraints, formats, and hints (e.g. "IBAN format: GB29 NWBK …"). Keep it brief — one sentence max.' },
            { label: 'Errors',       desc: 'Set errorMessage only after the user has had a chance to interact with the field. Avoid showing errors on untouched inputs.' },
            { label: 'Prefix/Suffix', desc: 'Use prefix/suffix for units, currency symbols, or icon actions that belong inside the field boundary. For actions outside the field, use a Button instead.' },
          ].map(({ label, desc }) => (
            <div key={label} style={{ display: 'flex', gap: 'var(--gap-md)', padding: 'var(--space-4)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', alignItems: 'flex-start' }}>
              <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(97,0,165,0.06)', color: 'var(--color-brand)', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{label}</code>
              <span className="text-body-sm text-muted">{desc}</span>
            </div>
          ))}
        </div>
        <Callout icon="♿" title="Accessibility">
          The label is linked to the input via <code style={{ fontFamily: 'monospace', fontSize: 11 }}>htmlFor</code>/<code style={{ fontFamily: 'monospace', fontSize: 11 }}>id</code> (auto-generated with <code style={{ fontFamily: 'monospace', fontSize: 11 }}>useId</code> if not provided).
          Helper and error text are wired to the input via <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-describedby</code>.
          Error state sets <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-invalid</code> so screen readers announce the field as invalid.
        </Callout>
      </Block>
    </div>
  )
}
