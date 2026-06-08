import type { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
  leftIcon?: ReactNode
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function Input({ className, hasError = false, leftIcon, ...props }: InputProps) {
  const inputClasses = cx(
    'h-10 w-full rounded-[10px] border bg-app-card text-sm text-app-text transition placeholder:text-app-text-4 focus:border-app-primary focus:outline-none focus:ring-4 focus:ring-app-primary/12',
    leftIcon ? 'pl-9 pr-3' : 'px-3',
    hasError ? 'border-app-rose ring-4 ring-app-rose/10' : 'border-app-border',
    className,
  )

  if (leftIcon) {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-app-text-3">
          {leftIcon}
        </span>
        <input className={inputClasses} aria-invalid={hasError || undefined} {...props} />
      </div>
    )
  }

  return <input className={inputClasses} aria-invalid={hasError || undefined} {...props} />
}
