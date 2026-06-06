import type { MouseEventHandler, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'white' | 'glass'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
}

const baseClasses =
  'inline-flex min-w-0 items-center justify-center gap-2 rounded-[10px] border border-transparent font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-app-primary/15 disabled:pointer-events-none disabled:opacity-60'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-app-primary text-white shadow-[0_1px_2px_rgba(79,70,229,.25),inset_0_1px_0_rgba(255,255,255,.12)] hover:bg-app-primary-600 focus-visible:border-app-primary',
  ghost:
    'border-app-border bg-app-card text-app-text hover:bg-app-subtle focus-visible:border-app-primary',
  white:
    'bg-white text-app-primary shadow-[0_1px_2px_rgba(15,23,42,.12)] hover:bg-app-primary-soft focus-visible:border-white focus-visible:ring-white/30',
  glass:
    'border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:border-white focus-visible:ring-white/30',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-4 text-[15px] sm:px-6',
}

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Button({
  children,
  className,
  disabled = false,
  href,
  onClick,
  size = 'md',
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const classes = cx(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if (href) {
    return (
      <a className={classes} href={disabled ? undefined : href} onClick={onClick} aria-disabled={disabled || undefined}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
