import type { ReactNode } from 'react'
import { MarketingNav } from './MarketingNav'

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <MarketingNav />
      {children}
    </div>
  )
}
