import { Button } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'
import { useToc } from '@/components/docs/TocContext'

const CODE = `import { Button } from '@/components/ui'

// Variants
<Button variant="primary">Buy BTC</Button>
<Button variant="secondary">View details</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="destructive">Delete account</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Processing…</Button>

// With icons
<Button variant="primary" leadingIcon={<ArrowRightIcon />}>Continue</Button>
<Button variant="secondary" trailingIcon={<ExternalLinkIcon />}>View on chain</Button>

// Disabled
<Button disabled>Unavailable</Button>`

export default function ButtonPage() {
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
        title="Button"
        lead="The primary action trigger. Use the variant that matches the intent — primary for the main CTA, secondary for alternatives, ghost for low-emphasis actions, and destructive for irreversible operations."
      />

      <Block title="Demo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>

          {/* Variants */}
          <div>
            <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Variants</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-md)', alignItems: 'center' }}>
              <Button variant="primary">Buy BTC</Button>
              <Button variant="secondary">View details</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="destructive">Delete account</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sizes</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-md)', alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div>
            <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>States</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-md)', alignItems: 'center' }}>
              <Button variant="primary" loading>Processing…</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
          </div>

        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'variant',      type: '"primary" | "secondary" | "ghost" | "destructive"', default: '"primary"',  description: 'Visual style — maps to the semantic intent of the action' },
          { name: 'size',         type: '"sm" | "md" | "lg"',                                default: '"md"',       description: 'Height and padding scale' },
          { name: 'loading',      type: 'boolean',                                           default: 'false',      description: 'Shows a spinner and disables interaction while true' },
          { name: 'leadingIcon',  type: 'ReactNode',                                         default: '—',          description: 'Icon rendered before the label' },
          { name: 'trailingIcon', type: 'ReactNode',                                         default: '—',          description: 'Icon rendered after the label' },
          { name: 'disabled',     type: 'boolean',                                           default: 'false',      description: 'Prevents interaction and applies reduced-opacity style' },
          { name: 'className',    type: 'string',                                            default: '—',          description: 'Additional CSS class for layout or override' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          {[
            { v: 'primary',     label: 'Primary',     when: 'The single most important action on a screen — Buy, Confirm, Continue. Use once per view.' },
            { v: 'secondary',   label: 'Secondary',   when: 'Alternatives to the primary action — Edit, Share, View details. Can appear multiple times.' },
            { v: 'ghost',       label: 'Ghost',       when: 'Low-emphasis actions that should not compete — Cancel, Dismiss, Skip.' },
            { v: 'destructive', label: 'Destructive', when: 'Irreversible or dangerous actions — Delete account, Revoke access, Wipe wallet. Always confirm before triggering.' },
          ].map(({ v, label, when }) => (
            <div key={v} style={{ display: 'flex', gap: 'var(--gap-md)', padding: 'var(--space-4)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', alignItems: 'flex-start' }}>
              <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(97,0,165,0.06)', color: 'var(--color-brand)', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{label}</code>
              <span className="text-body-sm text-muted">{when}</span>
            </div>
          ))}
        </div>
        <Callout icon="♿" title="Accessibility">
          Button uses a native <code style={{ fontFamily: 'monospace', fontSize: 11 }}>{`<button>`}</code> element so keyboard and screen reader behaviour is free.
          Always provide a meaningful text label or <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-label</code> on icon-only buttons.
          The <code style={{ fontFamily: 'monospace', fontSize: 11 }}>loading</code> prop sets <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-busy</code> so assistive technology can communicate the pending state.
        </Callout>
      </Block>
    </div>
  )
}
