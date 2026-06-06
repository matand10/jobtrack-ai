import { getIconProps, type IconProps } from './IconBase'

export function UserIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}
