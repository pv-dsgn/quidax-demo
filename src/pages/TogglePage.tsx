import { useState } from 'react'
import { Toggle } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const SETTINGS = [
  { key: 'notifications' as const, label: 'Price alerts', desc: 'Notify when an asset moves more than 5% in 24 hours.' },
  { key: 'twoFactor' as const, label: 'Two-factor auth', desc: 'Secure logins with an authenticator app.' },
  { key: 'darkMode' as const, label: 'Dark mode', desc: 'Reduce eye strain in low-light environments.' },
  { key: 'autoTrade' as const, label: 'Auto-rebalance', desc: 'Rebalance your portfolio to target allocations monthly.' },
  { key: 'emailDigest' as const, label: 'Weekly email digest', desc: 'Summary of portfolio performance every Monday.' },
]

const CODE = `import { Toggle } from '@/components/ui'
import { useState } from 'react'

// Controlled toggle
function NotificationSetting() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p>Price alerts</p>
        <p>Notify when an asset moves more than 5%</p>
      </div>
      <Toggle
        checked={enabled}
        onChange={setEnabled}
        label="Price alerts"
      />
    </div>
  )
}

// Disabled state
<Toggle checked={false} onChange={() => {}} disabled label="Feature locked" />`

export default function TogglePage() {
  const [state, setState] = useState({
    notifications: true,
    twoFactor: false,
    darkMode: false,
    autoTrade: true,
    emailDigest: true,
  })

  function flip(key: keyof typeof state) {
    setState(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="Toggle"
        lead="A boolean on/off switch for settings and preferences. Follows the WAI-ARIA switch pattern. Click any toggle below to interact."
      />

      <Block title="Demo">
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {SETTINGS.map(({ key, label, desc }, i) => (
            <div
              key={key}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 'var(--gap-lg)', padding: 'var(--space-4) var(--card-padding)',
                background: 'var(--background)',
                borderBottom: i < SETTINGS.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span className="text-body">{label}</span>
                <span className="text-body-sm text-muted">{desc}</span>
              </div>
              <Toggle checked={state[key]} onChange={() => flip(key)} label={label} />
            </div>
          ))}
          {/* Disabled example */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 'var(--gap-lg)', padding: 'var(--space-4) var(--card-padding)',
            background: 'var(--color-neutral-100)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <span className="text-body text-muted">API trading</span>
              <span className="text-body-sm text-muted">Available on Pro plan only.</span>
            </div>
            <Toggle checked={false} onChange={() => {}} disabled label="API trading" />
          </div>
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'checked', type: 'boolean', description: 'Current toggle state — true = on, false = off.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called with the new (inverted) value when clicked. Update your state here.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and reduces opacity. Use for locked or permission-gated settings.' },
          { name: 'label', type: 'string', default: '—', description: 'Accessible aria-label for screen readers. Always set this — the toggle has no visible text label.' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class.' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Immediate effect">
          Toggles should apply changes immediately — no Save button required. If a change has significant consequences (e.g. disabling 2FA), show a confirmation dialog before committing.
        </Callout>
        <Callout icon="♿" title="Accessibility">
          Toggle uses <code style={{ fontFamily: 'monospace', fontSize: 11 }}>role="switch"</code> and <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-checked</code>. Always provide a meaningful <code style={{ fontFamily: 'monospace', fontSize: 11 }}>label</code> prop so screen readers announce both the setting name and its state.
        </Callout>
      </Block>
    </div>
  )
}
