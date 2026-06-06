import { NavLink, useLocation } from 'react-router-dom'
import { BriefcaseIcon, ChartIcon, PlusIcon, SparklesIcon } from '../ui/icons'

const tabs = [
  { icon: ChartIcon, label: 'Home', route: '/dashboard' },
  { icon: BriefcaseIcon, label: 'Apps', route: '/applications' },
  { icon: PlusIcon, label: 'Add', primary: true, route: '/applications/new' },
  { icon: SparklesIcon, label: 'AI', route: '/tailor' },
]

function isRouteActive(pathname: string, route: string) {
  if (route === '/dashboard') {
    return pathname === '/dashboard'
  }

  return pathname === route || pathname.startsWith(`${route}/`)
}

export function MobileBottomTabs() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 grid h-16 grid-cols-4 border-t border-app-border bg-app-card pb-2 md:hidden" aria-label="Mobile navigation">
      {tabs.map((tab) => {
        const active = isRouteActive(pathname, tab.route)
        return (
          <NavLink className={`flex flex-col items-center justify-center gap-0.5 text-[10.5px] ${active ? 'font-semibold text-app-primary' : 'font-medium text-app-text-3'}`} key={tab.route} to={tab.route}>
            {tab.primary ? (
              <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-app-primary text-white">
                <tab.icon size={18} />
              </span>
            ) : (
              <tab.icon size={20} />
            )}
            <span className={tab.primary ? 'mt-0.5' : ''}>{tab.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
