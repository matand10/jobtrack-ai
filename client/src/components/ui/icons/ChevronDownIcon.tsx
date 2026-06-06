import { getIconProps, type IconProps } from './IconBase'

export function ChevronDownIcon({ className, size = 14 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)} strokeWidth={1.8}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
