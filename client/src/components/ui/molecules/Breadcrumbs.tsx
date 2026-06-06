type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-[13px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-app-text-4" aria-hidden="true">/</span>
            )}
            {isLast || !item.href ? (
              <span className={isLast ? 'font-medium text-app-text' : 'text-app-text-3'}>
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-app-text-3 hover:text-app-text transition"
              >
                {item.label}
              </a>
            )}
          </span>
        )
      })}
    </nav>
  )
}
