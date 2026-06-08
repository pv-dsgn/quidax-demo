import { useState } from 'react'
import styles from './CodeBlock.module.css'

interface CodeBlockProps {
  code: string
  lang?: string
}

export function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(code).catch(() => null)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.lang}>{lang}</span>
        <button
          type="button"
          className={[styles.copyBtn, copied ? styles.copied : ''].join(' ')}
          onClick={copy}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.pre}><code>{code}</code></pre>
    </div>
  )
}
