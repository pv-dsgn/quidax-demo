import { useState } from 'react'
import { NavBar, Chip } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const CODE = `import { NavBar } from '@/components/ui'

// Loogged-in NavBar with user avatar
<NavBar
  logo="quidax"
  links={[
    { label: 'Markets', active: true },
    { label: 'Trade' },
    { label: 'Wallets' },
    { label: 'Earn' },
  ]}
  userInitials="QX"
  onSignUp={() => router.push('/signup')}
/>

// Marketing / logged-out variant (no avatar)
<NavBar
  links={[
    { label: 'Products' },
    { label: 'Pricing' },
    { label: 'About' },
  ]}
  onSignUp={() => setShowModal(true)}
/>`

const LINK_TYPE = `interface NavLink {
  label: string      // Display text
  href?: string      // Optional href (defaults to '#')
  active?: boolean   // Highlights the link with brand color
}`

export default function NavBarPage() {
  const VARIANTS = ['Loogged-in', 'Logged-out']
  const [activeVariant, setActiveVariant] = useState('Loogged-in')

  const linkSets: Record<string, { label: string; active?: boolean }[]> = {
    'Loogged-in': [
      { label: 'Markets', active: true },
      { label: 'Trade' },
      { label: 'Wallets' },
      { label: 'Earn' },
    ],
    'Logged-out': [
      { label: 'Products' },
      { label: 'Pricing' },
      { label: 'About' },
    ],
    
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="NavBar"
        lead="Top navigation bar with logo text, nav links, optional user avatar, and a Sign Up CTA. Sits at the top of every authenticated and unauthenticated page."
      />

      <Block title="Demo">
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          {VARIANTS.map(v => (
            <Chip key={v} label={v} active={activeVariant === v} onClick={() => setActiveVariant(v)} />
          ))}
        </div>
        <div className={pageStyles.demoClean} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <NavBar
            links={linkSets[activeVariant]}
            userInitials={activeVariant === 'Loogged-in' ? 'QX' : undefined}
            onSignUp={activeVariant === 'Logged-out' ? () => {} : undefined}
          />
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
        <CodeBlock code={LINK_TYPE} lang="ts" />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'logo', type: 'string', default: '"quidax"', description: 'Brand name shown in the left slot. Use the product name — not a URL.' },
          { name: 'links', type: 'NavLink[]', default: '[Markets, Trade, Wallets, Earn]', description: 'Navigation links. Each item has label, optional href, and optional active flag.' },
          { name: 'userInitials', type: 'string', default: '—', description: 'When provided, renders an Avatar in the right action slot alongside the CTA.' },
          { name: 'onSignUp', type: '() => void', default: '—', description: 'Click handler for the Sign Up button.' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class for wrapper overrides.' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Active link">
          Set <code style={{ fontFamily: 'monospace', fontSize: 11 }}>active: true</code> on the link that matches the current route. Derive this from the router's current pathname rather than hardcoding it.
        </Callout>
        <Callout icon="ℹ" title="Height">
          NavBar has a fixed height of <code style={{ fontFamily: 'monospace', fontSize: 11 }}>4rem (64px)</code>. When making it sticky (as in this docs layout), offset anchored elements by this amount using <code style={{ fontFamily: 'monospace', fontSize: 11 }}>top: 4rem</code> or <code style={{ fontFamily: 'monospace', fontSize: 11 }}>scroll-margin-top</code>.
        </Callout>
      </Block>
    </div>
  )
}
