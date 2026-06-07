import styles from './Chip.module.css'

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function Chip({ label, active, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      className={[styles.chip, active ? styles.active : styles.inactive, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
