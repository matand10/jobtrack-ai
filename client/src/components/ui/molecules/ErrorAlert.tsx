import { AlertCircleIcon } from '../icons'

export function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="mb-[18px] flex items-center gap-2.5 rounded-[10px] border border-rose-200 bg-app-rose-soft px-3 py-2.5 text-[13px] font-medium text-rose-800" role="alert">
      <AlertCircleIcon className="shrink-0" size={16} />
      <span>{message}</span>
    </div>
  )
}
