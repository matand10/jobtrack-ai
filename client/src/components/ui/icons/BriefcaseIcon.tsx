import { getIconProps, type IconProps } from './IconBase'

export function BriefcaseIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  )
}
