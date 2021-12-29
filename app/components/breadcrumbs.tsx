import { ChevronRightIcon } from '@heroicons/react/solid'
import * as React from 'react'
import { useMatches } from 'remix'
import { capitalize, fromKebabCase } from '~/utils/format'
import { Link } from './link'

type BreadcrumbsProps = {
  className?: string
  replacements?: Record<string, React.ReactNode>
}

export function Breadcrumbs({ className, replacements }: BreadcrumbsProps) {
  const matches = useMatches()
  const lastMatch = matches.at(-1)

  if (!lastMatch) {
    throw new Error('No matches found for use with breadcrumbs.')
  }

  const paths = lastMatch.pathname.slice(1).split('/').filter(Boolean)

  const formatPath = (path: string) =>
    path.includes('-') ? capitalize(fromKebabCase(path)) : capitalize(path)

  return (
    <nav className={className}>
      <ol className="h-10 flex items-center space-x-1">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1

          const replacedCrumb = (replacements && replacements[path]) || path
          const crumbIsString = typeof replacedCrumb === 'string'
          const crumbToRender = crumbIsString
            ? formatPath(replacedCrumb)
            : replacedCrumb

          const label = crumbIsString ? replacedCrumb : formatPath(path)

          return (
            <React.Fragment key={path}>
              <li>
                {isLast ? (
                  <span
                    className="font-medium text-gray-500"
                    aria-label={label}
                  >
                    {crumbToRender}
                  </span>
                ) : (
                  <Link
                    to={`/${paths.slice(0, index + 1).join('/')}`}
                    aria-label={label}
                  >
                    {crumbToRender}
                  </Link>
                )}
              </li>

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
