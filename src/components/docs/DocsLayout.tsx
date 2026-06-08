import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { NavBar } from '@/components/ui'
import { TocProvider, useTocContext, type TocItem } from './TocContext'
import styles from './DocsLayout.module.css'

const NAV = [
  { path: '/introduction', label: 'Introduction', group: '' },
  { path: '/changelog', label: 'Changelog', group: '' },
  { path: '/Pendinglog', label: 'PendingLog', group: '' },
  { path: '/design', label: 'Design', group: '' },
  { path: '/foundations/colors', label: 'Colors', group: 'Foundations' },
  { path: '/foundations/typography', label: 'Typography', group: 'Foundations' },
  { path: '/foundations/spacing', label: 'Spacing', group: 'Foundations' },
  { path: '/components/button', label: 'Button', group: 'Components' },
  { path: '/components/input', label: 'Input', group: 'Components' },
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

function MobileNavSelect() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <select
      className={styles.mobileNavSelect}
      value={location.pathname}
      onChange={e => navigate(e.target.value)}
      aria-label="Navigate to page"
    >
      {NAV.map(item => (
        <option key={item.path} value={item.path}>
          {item.group ? `${item.group} / ` : ''}{item.label}
        </option>
      ))}
    </select>
  )
}

function PageNav() {
  const location = useLocation()
  const currentIndex = NAV.findIndex(n => n.path === location.pathname)
  const prev = currentIndex > 0 ? NAV[currentIndex - 1] : null
  const next = currentIndex < NAV.length - 1 ? NAV[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <div className={styles.pageNav}>
      {prev ? (
        <Link to={prev.path} className={`${styles.pageNavLink} ${styles.pageNavPrev}`}>
          <span className={styles.pageNavDirection}>← Previous</span>
          <span className={styles.pageNavTitle}>{prev.label}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link to={next.path} className={`${styles.pageNavLink} ${styles.pageNavNext}`}>
          <span className={styles.pageNavDirection}>Next →</span>
          <span className={styles.pageNavTitle}>{next.label}</span>
        </Link>
      ) : <span />}
    </div>
  )
}

function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        const hit = entries.find(e => e.isIntersecting)
        if (hit) setActiveId(hit.target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  // reset active when page changes
  useEffect(() => { setActiveId('') }, [items])

  if (items.length === 0) return null

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={styles.toc} aria-label="On this page">
      <span className={styles.tocHeading}>On this page</span>
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={[styles.tocLink, activeId === item.id ? styles.tocLinkActive : ''].join(' ')}
          onClick={e => { e.preventDefault(); scrollTo(item.id) }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

function DocsLayoutInner() {
  const [search, setSearch] = useState('')
  const { items } = useTocContext()

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
        <NavBar links={[{ label: '', active: true }]} />
      </div>

      <div className={styles.layout}>
        {/* Left sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <MobileNavSelect />

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

        {/* Page content */}
        <main className={styles.main}>
          <Outlet />
          <PageNav />
        </main>

        {/* Right ToC */}
        <TableOfContents items={items} />
      </div>
    </div>
  )
}

export default function DocsLayout() {
  return (
    <TocProvider>
      <DocsLayoutInner />
    </TocProvider>
  )
}
