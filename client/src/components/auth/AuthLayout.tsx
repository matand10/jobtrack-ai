import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-app-subtle px-4 py-8 text-app-text sm:px-8 sm:py-12">
      {children}
    </div>
  )
}
