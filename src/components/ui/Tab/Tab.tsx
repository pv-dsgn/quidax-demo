import styles from './Tab.module.css'

interface TabProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function Tab({ label, active, onClick, className }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={[styles.tab, active ? styles.active : styles.inactive, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
