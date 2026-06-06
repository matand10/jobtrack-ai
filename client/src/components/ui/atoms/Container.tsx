import type { HTMLAttributes, ReactNode } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cx('mx-auto w-full max-w-[1180px] px-4 sm:px-8 lg:px-12', className)} {...props}>
      {children}
    </div>
  )
}
