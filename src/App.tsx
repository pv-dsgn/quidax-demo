import styles from './App.module.css'

export default function App() {
  return (
    <main className={styles.main}>
      <p className="text-label" style={{ color: 'var(--color-brand)' }}>
        Quidax Design System
      </p>
      <h1 className="text-display-xl">
        Built for Africa's<br />crypto future.
      </h1>
      <p className="text-body-lg text-muted">
        React · Vite · Motion · Uncut Sans Variable
      </p>
    </main>
  )
}
