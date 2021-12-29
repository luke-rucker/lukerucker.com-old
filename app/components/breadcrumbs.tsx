import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'
import * as React from 'react'
import { useMatches } from 'remix'

export type BreadcrumbParams<LoaderData = never> = {
  loaderData: LoaderData
  path: string
  isLast: boolean
}

type BreadcrumbsProps = {
  className?: string
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const matches = useMatches()
  const matchesWithBreadcrumbs = matches.filter(
    match => match.handle && match.handle.breadcrumb
  )

  console.log(matches)

  return (
    <nav className={className}>
      <ol className="h-10 flex items-center space-x-1">
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
        {/* {paths.map((path, index) => {
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
        })} */}
      </ol>
    </nav>
  )
}
