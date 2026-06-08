import { createContext, useContext, useState, useEffect } from 'react'

export interface TocItem {
  id: string
  label: string
}

interface TocCtx {
  items: TocItem[]
  register: (items: TocItem[]) => void
}

const TocContext = createContext<TocCtx>({ items: [], register: () => {} })

export function TocProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([])
  return (
    <TocContext.Provider value={{ items, register: setItems }}>
      {children}
    </TocContext.Provider>
  )
}

export function useTocContext() {
  return useContext(TocContext)
}

export function useToc(items: TocItem[]) {
  const { register } = useTocContext()
  // items are static per page — capture once on mount, clear on unmount
  useEffect(() => {
    register(items)
    return () => register([])
  }, [register]) // eslint-disable-line react-hooks/exhaustive-deps
}

export function toId(s: string) {
  return s
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
