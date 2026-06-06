export type IconProps = {
  className?: string
  size?: number
}

export function getIconProps(size: number, className?: string) {
  return {
    'aria-hidden': true,
    className,
    fill: 'none',
    height: size,
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.7,
    viewBox: '0 0 24 24',
    width: size,
  }
}
