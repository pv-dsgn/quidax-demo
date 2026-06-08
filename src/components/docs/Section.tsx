import styles from './Section.module.css'

export { styles as pageStyles }

interface PageHeaderProps {
  eyebrow: string
  title: string
  lead: string
}

export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <span className={`text-label ${styles.eyebrow}`}>{eyebrow}</span>
      <h1 className={`text-h1 ${styles.title}`}>{title}</h1>
      <p className={`text-body-lg ${styles.lead}`}>{lead}</p>
    </div>
  )
}

interface BlockProps {
  title: string
  children: React.ReactNode
}

export function Block({ title, children }: BlockProps) {
  return (
    <div className={styles.block}>
      <h2 className={`text-h3 ${styles.blockTitle}`}>{title}</h2>
      {children}
    </div>
  )
}

interface CalloutProps {
  icon?: string
  title?: string
  children: React.ReactNode
}

export function Callout({ icon = 'ℹ', title, children }: CalloutProps) {
  return (
    <div className={styles.callout}>
      <span className={styles.calloutIcon} aria-hidden="true">{icon}</span>
      <div className={styles.calloutText}>
        {title && <span className="text-body" style={{ fontWeight: 600, color: 'var(--foreground)' }}>{title}</span>}
        <span className="text-body-sm text-muted">{children}</span>
      </div>
    </div>
  )
}
