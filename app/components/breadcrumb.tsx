import * as React from 'react'
import { Link } from './link'

type BreadcrumbProps = {
  to: string
  label?: string
  displayAsLink: boolean
  children?: React.ReactNode
}

export function Breadcrumb({
  to,
  displayAsLink,
  children,
  label,
}: BreadcrumbProps) {
  return displayAsLink ? (
    <Link to={to} aria-label={label}>
      {children}
    </Link>
  ) : (
    <span className="font-medium text-gray-500" aria-label={label}>
      {children}
    </span>
  )
}
