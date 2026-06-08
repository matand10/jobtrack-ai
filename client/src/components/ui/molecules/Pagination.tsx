import { ChevronDownIcon } from '../icons'

// Build numbered page items with ellipsis. Shows current page plus 1 sibling
// on each side, with first and last page anchors. Examples:
//   total=3  page=2 → [1, 2, 3]
//   total=10 page=5 → [1, '…', 4, 5, 6, '…', 10]
//   total=7  page=1 → [1, 2, 3, '…', 7]
function buildPages(page: number, totalPages: number): Array<number | 'gap'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const pages: Array<number | 'gap'> = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)
  if (start > 2) pages.push('gap')
  for (let p = start; p <= end; p += 1) pages.push(p)
  if (end < totalPages - 1) pages.push('gap')
  pages.push(totalPages)
  return pages
}

const btnBase =
  'inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] border px-2.5 text-[12.5px] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50'

const inactiveBtn = `${btnBase} border-app-border bg-app-card text-app-text hover:bg-app-subtle`
const activeBtn = `${btnBase} border-app-primary bg-app-primary text-white`

type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
  disabled?: boolean
}

export function Pagination({ page, totalPages, onChange, disabled = false }: PaginationProps) {
  if (totalPages <= 1) return null
  const pages = buildPages(page, totalPages)

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={disabled || page <= 1}
        aria-label="Previous page"
        className={inactiveBtn}
      >
        <ChevronDownIcon size={14} className="rotate-90" />
      </button>
      {pages.map((p, i) =>
        p === 'gap' ? (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`gap-${i}`}
            className="px-1 text-[12.5px] text-app-text-3"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            disabled={disabled}
            aria-current={p === page ? 'page' : undefined}
            className={p === page ? activeBtn : inactiveBtn}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={disabled || page >= totalPages}
        aria-label="Next page"
        className={inactiveBtn}
      >
        <ChevronDownIcon size={14} className="-rotate-90" />
      </button>
    </div>
  )
}
