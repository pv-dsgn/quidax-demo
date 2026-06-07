import styles from './Tab.module.css'
import { Tab } from './Tab'

interface TabBarProps {
  tabs: string[]
  activeTab: string
  onChange: (tab: string) => void
  className?: string
}

export function TabBar({ tabs, activeTab, onChange, className }: TabBarProps) {
  return (
    <div role="tablist" className={[styles.tabBar, className].filter(Boolean).join(' ')}>
      {tabs.map(tab => (
        <Tab
          key={tab}
          label={tab}
          active={tab === activeTab}
          onClick={() => onChange(tab)}
        />
      ))}
    </div>
  )
}
