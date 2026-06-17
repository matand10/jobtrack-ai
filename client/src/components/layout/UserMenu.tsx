import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/auth.hooks'
import { AlertCircleIcon, ArrowRightIcon, BriefcaseIcon, ChevronDownIcon, FileTextIcon, SearchIcon, SparklesIcon, UserIcon, XIcon } from '../ui/icons'

type UserMenuProps = {
  user?: {
    email: string
    name: string
  }
}

function getFirstName(name: string) {
  return name.trim().split(' ')[0] || name
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function MenuIconItem({ children, danger = false, href, icon: Icon, kbd, onSelect, sub }: {
  children: string
  danger?: boolean
  href?: string
  icon: typeof UserIcon
  kbd?: string
  onSelect?: () => void
  sub?: string
}) {
  const content = (
    <>
      <Icon size={15} />
      <span className="min-w-0 flex-1">
        <span>{children}</span>
        {sub ? <span className="mt-px block text-[11.5px] font-normal text-app-text-3">{sub}</span> : null}
      </span>
      {kbd ? <kbd className="rounded border border-app-border bg-app-subtle px-1.5 py-px font-mono text-[10px] font-medium text-app-text-4">{kbd}</kbd> : null}
    </>
  )

  const className = danger
    ? 'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium text-app-rose outline-none transition hover:bg-app-rose-soft focus:bg-app-rose-soft'
    : 'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium text-app-text-2 outline-none transition hover:bg-app-subtle focus:bg-app-subtle'

  if (href) {
    return (
      <DropdownMenu.Item asChild onSelect={onSelect}>
        <a className={className} href={href} role="menuitem">
          {content}
        </a>
      </DropdownMenu.Item>
    )
  }

  return (
    <DropdownMenu.Item className={className} onSelect={onSelect}>
      {content}
    </DropdownMenu.Item>
  )
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const logoutMutation = useLogout()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const displayUser = user ?? { email: 'user@jobtrack.ai', name: 'JobTrack User' }
  const initials = getInitials(displayUser.name) || 'JT'

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        queryClient.removeQueries({ queryKey: ['auth'] })
        setOpen(false)
        navigate('/')
      },
    })
  }

  return (
    <DropdownMenu.Root onOpenChange={setOpen} open={open}>
      <DropdownMenu.Trigger asChild>
        <button
          className={`inline-flex items-center gap-2 rounded-full border py-1 pr-2.5 pl-1 transition focus:outline-none focus:ring-4 focus:ring-app-primary/15 ${
            open ? 'border-app-primary bg-app-primary-soft text-app-primary-700' : 'border-app-border bg-app-card text-app-text-2 hover:bg-app-subtle'
          }`}
          type="button"
        >
          <span className="inline-flex size-[26px] items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-app-primary),var(--color-app-violet))] text-[11px] font-semibold text-white" aria-hidden="true">
            {initials}
          </span>
          <span className="max-w-28 truncate text-[13px] font-medium">{getFirstName(displayUser.name)}</span>
          <ChevronDownIcon className={`transition-transform ${open ? 'rotate-180' : ''}`} size={12} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="z-[100] w-[252px] max-w-[calc(100vw-16px)] origin-top-right overflow-hidden rounded-xl border border-app-border bg-app-card shadow-card-lg data-[state=open]:animate-in data-[state=closed]:animate-out"
          sideOffset={8}
        >
          <div className="flex items-center gap-2.5 border-b border-app-border p-3.5" role="presentation">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-app-primary),var(--color-app-violet))] text-[13px] font-semibold text-white" aria-hidden="true">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-semibold text-app-text">{displayUser.name}</p>
              <p className="truncate text-xs text-app-text-3">{displayUser.email}</p>
            </div>
          </div>
          <div className="p-1.5">
            <MenuIconItem href="/settings/profile" icon={UserIcon}>Profile settings</MenuIconItem>
            <MenuIconItem href="/settings/notifications" icon={BriefcaseIcon}>Notifications</MenuIconItem>
          </div>
          <DropdownMenu.Separator className="h-px bg-app-border" />
          <div className="p-1.5">
            <MenuIconItem href="/settings/billing" icon={SparklesIcon} sub="Free plan · 0/25 AI runs used">Plan & usage</MenuIconItem>
            <DropdownMenu.Item asChild>
              <a className="mt-1 flex items-center justify-between rounded-lg border border-app-primary-soft bg-app-primary-soft px-3 py-2.5 text-[12.5px] font-semibold text-app-primary-700 outline-none transition hover:border-app-primary focus:border-app-primary" href="/upgrade">
                <span className="inline-flex items-center gap-2"><ArrowRightIcon size={13} /> Upgrade to Pro</span>
                <span className="font-mono text-[11px] font-medium text-app-primary">$9/mo</span>
              </a>
            </DropdownMenu.Item>
          </div>
          <DropdownMenu.Separator className="h-px bg-app-border" />
          <div className="p-1.5">
            <MenuIconItem href="https://docs.jobtrack.ai" icon={FileTextIcon} kbd="↗">Help & docs</MenuIconItem>
            <MenuIconItem href="mailto:support@jobtrack.ai" icon={AlertCircleIcon}>Contact support</MenuIconItem>
            <MenuIconItem icon={SearchIcon} kbd="?">Keyboard shortcuts</MenuIconItem>
          </div>
          <DropdownMenu.Separator className="h-px bg-app-border" />
          <div className="p-1.5">
            <MenuIconItem danger icon={XIcon} onSelect={handleLogout}>Sign out</MenuIconItem>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
