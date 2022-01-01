import type { LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'
import { Breadcrumb } from '~/components/breadcrumbs'
import { Card } from '~/components/card'
import { HeaderSection } from '~/components/header-section'
import { PageViewsTable } from '~/components/page-views-table'
import type { PageViews } from '~/db/page-views.server'
import { getAllPageViews } from '~/db/page-views.server'
import type { Handle } from '~/types'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      Page Views
    </Breadcrumb>
  ),
}

export const loader: LoaderFunction = () => getAllPageViews()

export default function ViewPageViews() {
  const pageViews = useLoaderData<Array<PageViews>>()

  return (
    <>
      <HeaderSection text="Page Views" />

      <Card>
        <PageViewsTable
          pageViews={pageViews}
          footer={
            <tr>
              <td className="pt-1">Total</td>
              <td className="pt-1">
                {pageViews.reduce(
                  (total, pageView) => total + pageView.views,
                  0
                )}
              </td>
            </tr>
          }
        />
      </Card>
    </>
  )
}
