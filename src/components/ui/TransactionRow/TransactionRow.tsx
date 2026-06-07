import styles from './TransactionRow.module.css'

interface TransactionRowProps {
  action: string
  date: string
  amount: string
  coinAmount?: string
  credit?: boolean
  className?: string
}

function ArrowIcon({ up }: { up: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {up
        ? <path d="M7 17L17 7M11 7H17V13" />
        : <path d="M17 7L7 17M13 17H7V11" />
      }
    </svg>
  )
}

export function TransactionRow({ action, date, amount, coinAmount, credit = true, className }: TransactionRowProps) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')}>
      <div className={styles.icon}>
        <ArrowIcon up={credit} />
      </div>
      <div className={styles.info}>
        <span className={styles.action}>{action}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.amountBlock}>
        <span className={[styles.amount, credit ? styles.credit : styles.debit].join(' ')}>{amount}</span>
        {coinAmount && <span className={styles.coinAmount}>{coinAmount}</span>}
      </div>
    </div>
  )
}
