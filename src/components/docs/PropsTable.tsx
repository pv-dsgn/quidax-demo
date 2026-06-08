import styles from './PropsTable.module.css'

export interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map(p => (
          <tr key={p.name} className={styles.row}>
            <td><code className={styles.code}>{p.name}</code></td>
            <td><code className={[styles.code, styles.codeType].join(' ')}>{p.type}</code></td>
            <td><code className={[styles.code, styles.codeMuted].join(' ')}>{p.default ?? '—'}</code></td>
            <td className={styles.desc}>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
