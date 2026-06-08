import { Routes, Route, Navigate } from 'react-router-dom'
import DocsLayout from './components/docs/DocsLayout'

import IntroductionPage from './pages/IntroductionPage'
import ColorsPage from './pages/ColorsPage'
import TypographyPage from './pages/TypographyPage'
import SpacingPage from './pages/SpacingPage'

import AlertPage from './pages/AlertPage'
import AvatarPage from './pages/AvatarPage'
import ChipPage from './pages/ChipPage'
import CoinRowPage from './pages/CoinRowPage'
import DividerPage from './pages/DividerPage'
import NavBarPage from './pages/NavBarPage'
import StatCardPage from './pages/StatCardPage'
import TabsPage from './pages/TabsPage'
import TogglePage from './pages/TogglePage'
import TransactionRowPage from './pages/TransactionRowPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DocsLayout />}>
        <Route index element={<Navigate to="/introduction" replace />} />
        <Route path="introduction" element={<IntroductionPage />} />
        <Route path="foundations/colors" element={<ColorsPage />} />
        <Route path="foundations/typography" element={<TypographyPage />} />
        <Route path="foundations/spacing" element={<SpacingPage />} />
        <Route path="components/alert" element={<AlertPage />} />
        <Route path="components/avatar" element={<AvatarPage />} />
        <Route path="components/chip" element={<ChipPage />} />
        <Route path="components/coinrow" element={<CoinRowPage />} />
        <Route path="components/divider" element={<DividerPage />} />
        <Route path="components/navbar" element={<NavBarPage />} />
        <Route path="components/statcard" element={<StatCardPage />} />
        <Route path="components/tabs" element={<TabsPage />} />
        <Route path="components/toggle" element={<TogglePage />} />
        <Route path="components/transactionrow" element={<TransactionRowPage />} />
        <Route path="*" element={<Navigate to="/introduction" replace />} />
      </Route>
    </Routes>
  )
}
