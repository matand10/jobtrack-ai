import { Navigate, Route, Routes } from 'react-router-dom'
import { MarketingShell } from './components/layout/MarketingShell'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketingShell><LandingPage /></MarketingShell>} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/applications" element={<PlaceholderPage title="Applications" />} />
      <Route path="/applications/new" element={<PlaceholderPage title="Add Application" />} />
      <Route path="/tailor" element={<PlaceholderPage title="AI Tailor" />} />
      <Route path="/settings/profile" element={<PlaceholderPage title="Profile settings" />} />
      <Route path="/settings/notifications" element={<PlaceholderPage title="Notifications" />} />
      <Route path="/settings/billing" element={<PlaceholderPage title="Plan & usage" />} />
      <Route path="/upgrade" element={<PlaceholderPage title="Upgrade to Pro" />} />
      <Route path="/login" element={<MarketingShell><LoginPage /></MarketingShell>} />
      <Route path="/register" element={<MarketingShell><RegisterPage /></MarketingShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
