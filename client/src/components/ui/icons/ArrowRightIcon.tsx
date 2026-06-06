import { getIconProps, type IconProps } from './IconBase'

export function ArrowRightIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)} strokeWidth={1.8}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
