import type { ReactNode } from 'react'
import { MenuIcon } from '../ui/icons'

type MobileTopBarProps = {
  onMenu?: () => void
  right?: ReactNode
  title: string
}

export function MobileTopBar({ onMenu, right, title }: MobileTopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[54px] items-center gap-2.5 border-b border-app-border bg-app-card px-3.5 md:hidden">
      <button className="inline-flex size-8 items-center justify-center rounded-lg border border-app-border bg-app-card text-app-text-2 transition hover:bg-app-subtle focus:outline-none focus:ring-4 focus:ring-app-primary/15" onClick={onMenu} type="button" aria-label="Open menu">
        <MenuIcon size={18} />
      </button>
      <div className="flex-1 text-[15px] font-semibold text-app-text">{title}</div>
      {right}
    </header>
  )
}
