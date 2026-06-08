import { Avatar } from '@/components/ui'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { pageStyles, PageHeader, Block, Callout } from '@/components/docs/Section'

const CODE = `import { Avatar } from '@/components/ui'

// Basic usage — 1 or 2 characters
<Avatar initials="QX" />
<Avatar initials="JD" />

// Longer strings are sliced to 2 and uppercased automatically
<Avatar initials="Victory" />  {/* renders "VI" */}
<Avatar initials="john doe" /> {/* renders "JO" */}

// Used inside NavBar (internally)
<NavBar userInitials="AB" />`

export default function AvatarPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader
        eyebrow="Components"
        title="Avatar"
        lead="A circular badge displaying a user's initials. Used in NavBar, profile menus, and anywhere a visual user identity is needed."
      />

      <Block title="Demo">
        <div className={[pageStyles.demo, pageStyles.demoRow].join(' ')}>
          {['QX', 'AB', 'VC', 'JD', 'MO', 'NT', 'OA', 'SA'].map(i => (
            <Avatar key={i} initials={i} />
          ))}
        </div>
      </Block>

      <Block title="Code">
        <CodeBlock code={CODE} />
      </Block>

      <Block title="Props">
        <PropsTable props={[
          { name: 'initials', type: 'string', description: 'Text to display — automatically sliced to 2 characters and uppercased. Pass first + last name initials.' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS class for sizing or color overrides' },
        ]} />
      </Block>

      <Block title="Guidelines">
        <Callout icon="💡" title="Generating initials">
          Derive initials from the user's name: first letter of first name + first letter of last name. For single-name users, use the first two letters of the name. Avoid using email addresses.
        </Callout>
        <Callout icon="♿" title="Accessibility">
          Avatar renders text directly, which is readable by screen readers. When used in a context where the user's name is not otherwise visible, wrap it in a container with <code style={{ fontFamily: 'monospace', fontSize: 11 }}>aria-label</code> matching the full name.
        </Callout>
      </Block>
    </div>
  )
}
