import clsx from 'clsx'
import * as React from 'react'
import { PageViews } from '~/db/page-views.server'
import { Link } from './link'

type PageViewsTableProps = {
  pageViews: Array<PageViews>
  footer?: React.ReactNode
} & React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>

export function PageViewsTable({
  pageViews,
  footer,
  className,
  ...props
}: PageViewsTableProps) {
  return (
    <table
      className={clsx('w-full table-auto border-collapse text-left', className)}
      {...props}
    >
      <thead>
        <tr>
          <th>Path</th>
          <th>Views</th>
        </tr>
      </thead>
      <tbody>
        {pageViews.map(pageView => (
          <tr key={pageView.path}>
            <td className="py-1">
              <Link to={pageView.path}>{pageView.path}</Link>
            </td>
            <td className="py-1">{pageView.views}</td>
          </tr>
        ))}
      </tbody>
      {footer ? <tfoot>{footer}</tfoot> : null}
    </table>
  )
}
