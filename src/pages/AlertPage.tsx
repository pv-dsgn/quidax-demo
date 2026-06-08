import { Alert } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const CODE = `import { Alert } from '@/components/ui'

// All four variants
<Alert variant="info"    title="Upgrade available"   description="New staking rewards launched." />
<Alert variant="success" title="Trade executed"       description="Bought 0.05 BTC at $67,240." />
<Alert variant="warning" title="KYC required"         description="Verify identity to raise limits." />
<Alert variant="error"   title="Insufficient balance" description="Top up your NGN wallet." />

// Title-only (no description)
<Alert variant="success" title="Copied to clipboard" />`

export default function AlertPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="Alert"
        lead="Status messages that communicate feedback, warnings, and errors to users. Always choose the variant that matches the semantic intent — not the visual preference."
      />

      <Block title="Demo">
        <div className={pageStyles.demo}>
          <Alert variant="info" title="New feature available" description="Enable real-time price alerts in your notification settings." />
          <Alert variant="success" title="Trade executed successfully" description="You bought 0.05 BTC at $67,240." />
          <Alert variant="warning" title="Verification required" description="Complete KYC to unlock higher withdrawal limits." />
          <Alert variant="error" title="Insufficient balance" description="Your NGN balance is too low to complete this trade." />
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'variant', type: '"info" | "success" | "warning" | "error"', description: 'Semantic variant — controls icon, background, and text colors' },
          { name: 'title', type: 'string', description: 'Alert headline — always required' },
          { name: 'description', type: 'string', default: '—', description: 'Optional supporting body text below the title' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class for layout or override' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          {[
            { v: 'info', label: 'Info', when: 'Neutral messages: feature announcements, onboarding hints, informational notices.' },
            { v: 'success', label: 'Success', when: 'Confirm a completed action: trade executed, deposit received, settings saved.' },
            { v: 'warning', label: 'Warning', when: 'Non-blocking issues requiring attention: rate limit approaching, verification pending.' },
            { v: 'error', label: 'Error', when: 'Blocking failures: payment declined, API error, form validation failure.' },
          ].map(({ v, label, when }) => (
            <div key={v} style={{ display: 'flex', gap: 'var(--gap-md)', padding: 'var(--space-4)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', alignItems: 'flex-start' }}>
              <code style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(97,0,165,0.06)', color: 'var(--color-brand)', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{label}</code>
              <span className="text-body-sm text-muted">{when}</span>
            </div>
          ))}
        </div>
        <Callout icon="♿" title="Accessibility">
          The Alert root element renders with <code style={{ fontFamily: 'monospace', fontSize: 11 }}>role="alert"</code>, causing screen readers to announce it immediately when it appears in the DOM. Pair with meaningful titles so announcements make sense out of context.
        </Callout>
      </Block>
    </div>
  )
}
