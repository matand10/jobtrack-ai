import { getIconProps, type IconProps } from './IconBase'

export function XIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)} strokeWidth={2}>
      <path d="M6 6l12 12" />
      <path d="M6 18 18 6" />
    </svg>
  )
}
