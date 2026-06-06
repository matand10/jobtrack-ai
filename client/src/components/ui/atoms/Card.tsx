import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  interactive?: boolean
  shadow?: 'sm' | 'lg'
}

const shadowClasses = {
  sm: 'shadow-card-sm',
  lg: 'shadow-card-lg',
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function Card({ children, className, interactive = false, shadow = 'sm', ...props }: CardProps) {
  return (
    <div
      className={cx(
        'rounded-[14px] border border-app-border bg-app-card',
        shadowClasses[shadow],
        interactive && 'transition duration-150 hover:-translate-y-0.5 hover:border-app-border-strong hover:shadow-card-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
