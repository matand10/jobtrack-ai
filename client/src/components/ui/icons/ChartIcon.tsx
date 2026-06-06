import { getIconProps, type IconProps } from './IconBase'

export function ChartIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)}>
      <path d="M3 3v18h18" />
      <rect x="7" y="13" width="3" height="5" />
      <rect x="12" y="9" width="3" height="9" />
      <rect x="17" y="5" width="3" height="13" />
    </svg>
  )
}
