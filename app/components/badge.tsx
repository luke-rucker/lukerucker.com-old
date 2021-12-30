import clsx from 'clsx'
import * as React from 'react'

type BadgeProps = {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={clsx('p-1 text-xs bg-gray-300 text-gray-600', className)}>
      {children}
    </span>
  )
}
