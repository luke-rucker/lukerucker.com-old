import clsx from 'clsx'
import * as React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={clsx('bg-white p-4 shadow-xl', className)} {...props}>
      {children}
    </div>
  )
}
