import { ChevronRightIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import * as React from 'react'
import { useMatches } from 'remix'
import { capitalize, fromKebabCase } from '~/utils/format'
import { Link } from './link'

type BreadcrumbsProps = {
  replacements?: Record<string, React.ReactNode>
}

export function Breadcrumbs({ replacements }: BreadcrumbsProps) {
  const matches = useMatches()
  const lastMatch = matches.at(-1)

  if (!lastMatch) {
    return <></>
  }

  const paths = lastMatch.pathname.slice(1).split('/').filter(Boolean)

  const formatPath = (path: string) =>
    path.includes('-') ? capitalize(fromKebabCase(path)) : capitalize(path)

  return (
    <nav>
      <ol className="h-10 flex items-center space-x-1">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1

          const replacedCrumb = (replacements && replacements[path]) || path
          const crumbIsString = typeof replacedCrumb === 'string'
          const crumbToRender = crumbIsString
            ? formatPath(replacedCrumb)
            : replacedCrumb

          const label = crumbIsString ? replacedCrumb : formatPath(path)
          console.log(path)

          return (
            <>
              <li key={path}>
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

              {!isLast && (
                <li role="separator" key={`${path}-separator`}>
                  <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                </li>
              )}
            </>
          )
        })}
      </ol>
    </nav>
  )
}
