import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant = 'neutral' | 'primary' | 'success' | 'sky' | 'amber' | 'rose' | 'violet'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  dot?: boolean
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-app-subtle text-slate-600',
  primary: 'bg-app-primary-soft text-app-primary',
  success: 'bg-app-ai-soft text-app-ai-600',
  sky: 'bg-app-sky-soft text-app-sky',
  amber: 'bg-app-amber-soft text-amber-700',
  rose: 'bg-app-rose-soft text-app-rose',
  violet: 'bg-app-violet-soft text-app-violet',
}

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Badge({ children, className, dot = false, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex h-[22px] items-center gap-1.5 rounded-full px-2 text-xs font-medium tracking-[0.005em]',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}
