import styles from './CoinRow.module.css'

interface CoinRowProps {
  symbol: string
  name: string
  ticker: string
  price: string
  change: string
  changePositive?: boolean
  iconColor?: string
  className?: string
}

export function CoinRow({
  symbol,
  name,
  ticker,
  price,
  change,
  changePositive = true,
  iconColor = 'var(--color-brand)',
  className,
}: CoinRowProps) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')}>
      <div className={styles.icon} style={{ backgroundColor: iconColor } as React.CSSProperties}>
        {symbol.charAt(0).toUpperCase()}
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.ticker}>{ticker}</span>
      </div>
      <div className={styles.priceBlock}>
        <span className={styles.price}>{price}</span>
        <span className={[styles.change, changePositive ? styles.positive : styles.negative].join(' ')}>
          {changePositive ? '▲' : '▼'} {change}
        </span>
      </div>
    </div>
  )
}
