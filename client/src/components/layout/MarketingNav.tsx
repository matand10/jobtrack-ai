import { useState } from 'react'
import { Button } from '../ui/atoms/Button'
import { Container } from '../ui/atoms/Container'
import { ArrowRightIcon, MenuIcon, XIcon } from '../ui/icons'
import { Logo } from '../ui/molecules/Logo'

export function MarketingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b border-app-border bg-white/80 backdrop-blur-[10px]">
      <Container className="flex h-16 items-center gap-3 sm:gap-5 lg:px-12">
        <a href="/" aria-label="JobTrack AI home">
          <Logo size={24} />
        </a>
        <nav className="ml-6 hidden items-center gap-6 min-[900px]:flex" aria-label="Primary navigation">
          <a className="text-sm font-medium text-app-text-2 transition hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15" href="/#features">
            Features
          </a>
          <a className="text-sm font-medium text-app-text-2 transition hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15" href="/#how-it-works">
            How It Works
          </a>
          <a className="text-sm font-medium text-app-text-2 transition hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15" href="/#pricing">
            Pricing
          </a>
        </nav>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <a className="hidden text-sm font-medium text-app-text-2 transition hover:text-app-text sm:inline-flex" href="/login">
            Sign in
          </a>
          <Button className="px-2.5 sm:px-3" href="/register" size="sm">
            <span className="hidden min-[380px]:inline">Get Started</span>
            <span className="min-[380px]:hidden">Start</span>
            <ArrowRightIcon size={14} />
          </Button>
          <button
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-app-border bg-transparent text-app-text-2 transition hover:bg-app-subtle focus:outline-none focus:ring-4 focus:ring-app-primary/15 min-[900px]:hidden"
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {open ? (
        <div aria-label="Mobile navigation" className="border-t border-app-border bg-white/95 backdrop-blur-[10px] min-[900px]:hidden">
          <Container className="flex flex-col py-2 lg:px-12">
            <a
              className="flex h-11 items-center text-sm font-medium text-app-text-2 transition hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15"
              href="/#features"
              onClick={() => setOpen(false)}
            >
              Features
            </a>
            <a
              className="flex h-11 items-center text-sm font-medium text-app-text-2 transition hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15"
              href="/#how-it-works"
              onClick={() => setOpen(false)}
            >
              How It Works
            </a>
            <a
              className="flex h-11 items-center text-sm font-medium text-app-text-2 transition hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15"
              href="/#pricing"
              onClick={() => setOpen(false)}
            >
              Pricing
            </a>
            <a
              className="flex h-11 items-center text-sm font-medium text-app-text-2 transition hover:text-app-text focus:outline-none focus:ring-4 focus:ring-app-primary/15"
              href="/login"
              onClick={() => setOpen(false)}
            >
              Sign in
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
