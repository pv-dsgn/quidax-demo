import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import styles from './NavBar.module.css'

interface NavLink {
  label: string
  href?: string
  active?: boolean
}

interface NavBarProps {
  logo?: string
  links?: NavLink[]
  userInitials?: string
  onSignUp?: () => void
  className?: string
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Markets', active: true },
  { label: 'Trade' },
  { label: 'Wallets' },
  { label: 'Earn' },
]

export function NavBar({
  logo = 'Quidax-demo Design System',
  links = DEFAULT_LINKS,
  userInitials,
  onSignUp,
  className,
}: NavBarProps) {
  return (
    <header className={[styles.nav, className].filter(Boolean).join(' ')}>
      <div className={styles.left}>
        <span className={styles.logo}>{logo}</span>
        <nav className={styles.links}>
          {links.map(link => (
            <a
              key={link.label}
              href={link.href ?? '#'}
              className={[styles.link, link.active ? styles.linkActive : ''].filter(Boolean).join(' ')}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className={styles.right}>
        {userInitials && <Avatar initials={userInitials} />}
        {onSignUp && (
          <Button variant="primary" size="sm" onClick={onSignUp}>
            Sign Up
          </Button>
        )}
      </div>
    </header>
  )
}
