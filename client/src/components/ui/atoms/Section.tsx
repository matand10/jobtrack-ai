import type { HTMLAttributes, ReactNode } from 'react'

type SectionTone = 'default' | 'card' | 'gradient'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  tone?: SectionTone
}

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-app-bg',
  card: 'bg-app-card',
  gradient: 'bg-[linear-gradient(135deg,var(--color-app-primary)_0%,var(--color-app-violet)_100%)]',
}

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Section({ children, className, tone = 'default', ...props }: SectionProps) {
  return (
    <section className={cx('border-b border-app-border py-14 sm:py-20', toneClasses[tone], className)} {...props}>
      {children}
    </section>
  )
}
