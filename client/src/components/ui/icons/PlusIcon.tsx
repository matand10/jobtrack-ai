import { getIconProps, type IconProps } from './IconBase'

export function PlusIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)} strokeWidth={2}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}
