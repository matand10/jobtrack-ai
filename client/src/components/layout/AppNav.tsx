import { NavLink, useLocation } from 'react-router-dom'
import { BriefcaseIcon, ChartIcon, PlusIcon, SearchIcon, SparklesIcon } from '../ui/icons'
import { Logo } from '../ui/molecules/Logo'
import { UserMenu } from './UserMenu'

type AppNavProps = {
  user?: {
    email: string
    name: string
  }
}

export const navItems = [
  { icon: ChartIcon, label: 'Dashboard', route: '/dashboard' },
  { icon: BriefcaseIcon, label: 'Applications', route: '/applications' },
  { icon: PlusIcon, label: 'Add Application', route: '/applications/new' },
  { icon: SparklesIcon, label: 'AI Tailor', route: '/tailor' },
]

function isRouteActive(pathname: string, route: string) {
  if (route === '/dashboard') {
    return pathname === '/dashboard'
  }

  return pathname === route || pathname.startsWith(`${route}/`)
}

export function AppNav({ user }: AppNavProps) {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-20 border-b border-app-border bg-app-card">
      <div className="flex h-[60px] items-center gap-7 px-6">
        <a href="/dashboard" aria-label="JobTrack AI dashboard">
          <Logo size={22} />
        </a>
        <nav className="flex flex-1 items-center gap-1" aria-label="Application navigation">
          {navItems.map((item) => {
            const active = isRouteActive(pathname, item.route)
            return (
              <NavLink
                className={`inline-flex h-[34px] items-center gap-[7px] rounded-lg px-3 text-[13.5px] font-medium transition focus:outline-none focus:ring-4 focus:ring-app-primary/15 ${
                  active ? 'bg-app-primary-soft text-app-primary-700' : 'text-app-text-2 hover:bg-app-subtle hover:text-app-text'
                }`}
                key={item.route}
                to={item.route}
              >
                <item.icon size={15} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex size-8 items-center justify-center rounded-lg border border-app-border bg-app-card text-app-text-2 transition hover:bg-app-subtle hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15" type="button" aria-label="Search">
            <SearchIcon size={15} />
          </button>
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}
