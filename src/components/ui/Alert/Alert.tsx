import styles from './Alert.module.css'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  variant: AlertVariant
  title: string
  description?: string
  className?: string
}

const ICONS: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
}

export function Alert({ variant, title, description, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={[styles.alert, styles[variant], className].filter(Boolean).join(' ')}
    >
      <span className={styles.icon} aria-hidden="true">{ICONS[variant]}</span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </div>
  )
}
