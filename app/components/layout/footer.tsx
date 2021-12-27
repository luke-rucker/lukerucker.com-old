import clsx from 'clsx'
import * as React from 'react'

type FooterProps = {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx('text-gray-500', className)}>
      <p>&copy; {new Date().getFullYear()} Luke Rucker</p>
    </footer>
  )
}
