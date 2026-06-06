import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function Input({ className, hasError = false, ...props }: InputProps) {
  return (
    <input
      className={cx(
        'h-10 w-full rounded-[10px] border bg-app-card px-3 text-sm text-app-text transition placeholder:text-app-text-4 focus:border-app-primary focus:outline-none focus:ring-4 focus:ring-app-primary/12',
        hasError ? 'border-app-rose ring-4 ring-app-rose/10' : 'border-app-border',
        className,
      )}
      aria-invalid={hasError || undefined}
      {...props}
    />
  )
}
