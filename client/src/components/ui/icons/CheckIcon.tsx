import { getIconProps, type IconProps } from './IconBase'

export function CheckIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)} strokeWidth={2.2}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}
