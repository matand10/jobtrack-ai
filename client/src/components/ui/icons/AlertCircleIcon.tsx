import { getIconProps, type IconProps } from './IconBase'

export function AlertCircleIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}
