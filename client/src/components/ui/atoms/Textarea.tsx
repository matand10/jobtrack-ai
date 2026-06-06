import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function Textarea({ className, hasError = false, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cx(
        'w-full rounded-[10px] border bg-app-card px-3 py-2.5 text-sm text-app-text transition placeholder:text-app-text-4 focus:border-app-primary focus:outline-none focus:ring-4 focus:ring-app-primary/12 resize-none',
        hasError ? 'border-app-rose ring-4 ring-app-rose/10' : 'border-app-border',
        className,
      )}
      aria-invalid={hasError || undefined}
      {...props}
    />
  )
}
