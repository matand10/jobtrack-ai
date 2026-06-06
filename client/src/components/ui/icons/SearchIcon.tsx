import { getIconProps, type IconProps } from './IconBase'

export function SearchIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}
