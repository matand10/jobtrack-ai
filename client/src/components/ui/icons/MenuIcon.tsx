import { getIconProps, type IconProps } from './IconBase'

export function MenuIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)} strokeWidth={1.8}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
