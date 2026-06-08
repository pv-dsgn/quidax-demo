import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { NavBar } from '@/components/ui'
import styles from './DocsLayout.module.css'

const NAV = [
  { path: '/introduction', label: 'Introduction', group: '' },
  { path: '/foundations/colors', label: 'Colors', group: 'Foundations' },
  { path: '/foundations/typography', label: 'Typography', group: 'Foundations' },
  { path: '/foundations/spacing', label: 'Spacing', group: 'Foundations' },
  { path: '/components/alert', label: 'Alert', group: 'Components' },
  { path: '/components/avatar', label: 'Avatar', group: 'Components' },
  { path: '/components/chip', label: 'Chip', group: 'Components' },
  { path: '/components/coinrow', label: 'CoinRow', group: 'Components' },
  { path: '/components/divider', label: 'Divider', group: 'Components' },
  { path: '/components/navbar', label: 'NavBar', group: 'Components' },
  { path: '/components/statcard', label: 'StatCard', group: 'Components' },
  { path: '/components/tabs', label: 'Tab / TabBar', group: 'Components' },
  { path: '/components/toggle', label: 'Toggle', group: 'Components' },
  { path: '/components/transactionrow', label: 'TransactionRow', group: 'Components' },
]

export default function DocsLayout() {
  const [search, setSearch] = useState('')

  const query = search.toLowerCase().trim()
  const filtered = query
    ? NAV.filter(n => n.label.toLowerCase().includes(query) || n.group.toLowerCase().includes(query))
    : NAV

  const groups: string[] = []
  const grouped: Record<string, typeof NAV> = {}
  for (const item of filtered) {
    if (!groups.includes(item.group)) groups.push(item.group)
    grouped[item.group] ??= []
    grouped[item.group].push(item)
  }

  return (
    <div className={styles.root}>
      <div className={styles.navWrap}>
        <NavBar
          links={[
            { label: 'Design System', active: true },
          ]}
        />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <label className={styles.searchLabel} aria-label="Search">
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                spellCheck={false}
              />
            </label>

            <nav aria-label="Design system">
              {groups.length === 0 && (
                <p className={styles.noResults}>No results for "{search}"</p>
              )}
              {groups.map(group => (
                <div key={group} className={styles.navGroup}>
                  {group && <span className={styles.navGroupLabel}>{group}</span>}
                  {grouped[group].map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        [styles.navItem, isActive ? styles.navItemActive : ''].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
