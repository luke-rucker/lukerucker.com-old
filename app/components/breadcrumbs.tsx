import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'
import clsx from 'clsx'
import * as React from 'react'
import { useMatches } from 'remix'
import { Link } from './link'

type BreadcrumbsProps = {
  className?: string
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const matches = useMatches()
  const matchesWithBreadcrumbs = matches.filter(
    match => match.handle?.breadcrumb
  )

  return (
    <nav className={clsx(className)}>
      <ol className="h-10 flex flex-wrap items-center space-x-1">
        {matchesWithBreadcrumbs.map((match, index) => {
          const isLast = index === matchesWithBreadcrumbs.length - 1

          return (
            <React.Fragment key={match.pathname}>
              {match.handle.breadcrumb({
                path: match.pathname,
                loaderData: match.data,
                isLast,
              })}

              {!isLast ? (
                <li role="separator">
                  <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                </li>
              ) : null}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

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
    <Link to={to} aria-label={label} className="truncate">
      {children}
    </Link>
  ) : (
    <span className="truncate text-gray-500" aria-label={label}>
      {children}
    </span>
  )
}
