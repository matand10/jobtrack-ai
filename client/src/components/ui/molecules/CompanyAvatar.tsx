import type { HTMLAttributes } from 'react'

const AVATAR_COLORS: Array<{ bg: string; text: string }> = [
  { bg: '#EEF2FF', text: '#4F46E5' },
  { bg: '#F0FDF4', text: '#16A34A' },
  { bg: '#E0F2FE', text: '#0284C7' },
  { bg: '#FEF3C7', text: '#D97706' },
  { bg: '#FEE2E2', text: '#DC2626' },
  { bg: '#F5F3FF', text: '#7C3AED' },
  { bg: '#FCE7F3', text: '#DB2777' },
  { bg: '#ECFEFF', text: '#0891B2' },
]

function getColor(name: string): { bg: string; text: string } {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

type CompanyAvatarProps = HTMLAttributes<HTMLSpanElement> & {
  company: string
  size?: number
}

export function CompanyAvatar({ company, size = 36, className = '', ...props }: CompanyAvatarProps) {
  const color = getColor(company)
  const letter = company.charAt(0).toUpperCase()
  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-lg font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color.bg,
        color: color.text,
        fontSize: Math.round(size * 0.44),
      }}
      aria-hidden="true"
      {...props}
    >
      {letter}
    </span>
  )
}
