import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../layout/AppNav'
import { XIcon } from '../icons'
import { Logo } from '../molecules/Logo'

type MobileDrawerProps = {
  onClose: () => void
  open: boolean
  user?: {
    email: string
    name: string
  }
}

function isRouteActive(pathname: string, route: string) {
  if (route === '/dashboard') {
    return pathname === '/dashboard'
  }
  return pathname === route || pathname.startsWith(`${route}/`)
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function MobileDrawer({ onClose, open, user }: MobileDrawerProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-app-border bg-app-card shadow-xl transition-transform duration-200 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
      >
        {/* Header */}
        <div className="flex h-[54px] shrink-0 items-center justify-between border-b border-app-border px-4">
          <a aria-label="JobTrack AI" href="/dashboard" onClick={onClose}>
            <Logo size={22} />
          </a>
          <button
            aria-label="Close menu"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-app-border bg-app-card text-app-text-2 transition hover:bg-app-subtle focus:outline-none focus:ring-4 focus:ring-app-primary/15"
            onClick={onClose}
            type="button"
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Application navigation" className="flex-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const active = isRouteActive(pathname, item.route)
            return (
              <NavLink
                className={`flex h-10 items-center gap-3 rounded-lg px-3 text-[14px] font-medium transition focus:outline-none focus:ring-4 focus:ring-app-primary/15 ${
                  active
                    ? 'bg-app-primary-soft text-app-primary-700'
                    : 'text-app-text-2 hover:bg-app-subtle hover:text-app-text'
                }`}
                key={item.route}
                onClick={onClose}
                to={item.route}
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* User footer */}
        {user ? (
          <div className="shrink-0 border-t border-app-border p-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-app-primary),var(--color-app-violet))] text-[13px] font-semibold text-white"
              >
                {getInitials(user.name) || 'JT'}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-app-text">{user.name}</p>
                <p className="truncate text-xs text-app-text-3">{user.email}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
