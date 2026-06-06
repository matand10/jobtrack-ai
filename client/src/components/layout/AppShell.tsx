import type { ReactNode } from 'react'
import { UserMenu } from './UserMenu'
import { AppNav } from './AppNav'
import { MobileBottomTabs } from './MobileBottomTabs'
import { MobileTopBar } from './MobileTopBar'

type AppShellProps = {
  children: ReactNode
  title: string
  user?: {
    email: string
    name: string
  }
}

export function AppShell({ children, title, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <div className="hidden md:block">
        <AppNav user={user} />
      </div>
      <MobileTopBar right={<UserMenu user={user} />} title={title} />
      <main className="px-4 py-6 pb-24 sm:px-6 md:pb-6 lg:px-12 lg:py-7">{children}</main>
      <MobileBottomTabs />
    </div>
  )
}
