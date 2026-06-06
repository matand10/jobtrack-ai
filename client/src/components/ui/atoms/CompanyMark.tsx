type CompanyMarkProps = {
  color?: string
  name: string
  size?: number
}

export function CompanyMark({ color = '#4F46E5', name, size = 32 }: CompanyMarkProps) {
  const initial = name[0]?.toUpperCase() ?? '?'

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg font-semibold"
      style={{
        backgroundColor: `${color}14`,
        border: `1px solid ${color}22`,
        color,
        fontSize: size * 0.42,
        height: size,
        width: size,
      }}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}
