import { getIconProps, type IconProps } from './IconBase'

export function SparklesIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...getIconProps(size, className)}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <path d="M12 8.5l1.2 2.3 2.3 1.2-2.3 1.2L12 15.5l-1.2-2.3L8.5 12l2.3-1.2L12 8.5z" fill="currentColor" stroke="none" />
    </svg>
  )
}
