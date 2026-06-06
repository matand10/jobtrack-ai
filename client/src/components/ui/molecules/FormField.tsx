import type { ReactNode } from 'react'
import { AlertCircleIcon } from '../icons'

type FormFieldProps = {
  children: ReactNode
  error?: string
  hint?: string
  id: string
  label: string
}

export function FormField({ children, error, hint, id, label }: FormFieldProps) {
  const descriptionId = error || hint ? `${id}-description` : undefined

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-app-text-2" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-app-rose" id={descriptionId}>
          <AlertCircleIcon size={12} />
          {error}
        </p>
      ) : null}
      {!error && hint ? (
        <p className="mt-1.5 text-xs text-app-text-3" id={descriptionId}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
