import styles from './StatCard.module.css'

interface StatCardProps {
  label: string
  value: string
  trend?: string
  trendPositive?: boolean
  className?: string
}

export function StatCard({ label, value, trend, trendPositive = true, className }: StatCardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {trend && (
        <span className={[styles.trend, trendPositive ? styles.positive : styles.negative].join(' ')}>
          {trendPositive ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
  )
}
