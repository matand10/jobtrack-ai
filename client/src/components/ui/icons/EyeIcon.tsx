import { getIconProps, type IconProps } from './IconBase'

export function EyeIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
