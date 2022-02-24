import { formatDistance } from 'date-fns'
import type { LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'
import { Breadcrumb } from '~/components/breadcrumbs'
import { Card } from '~/components/card'
import { HeaderSection } from '~/components/header-section'
import { PageViewsTable } from '~/components/page-views-table'
import type { CachedPageViews } from '~/db/page-views.server'
import { getAllPageViews } from '~/db/page-views.server'
import type { Handle } from '~/types'
import { requireLuke } from '~/utils/session.server'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      Page Views
    </Breadcrumb>
  ),
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireLuke(request)
  return getAllPageViews()
}

export default function ViewPageViews() {
  const { updatedAt, pageViews } = useLoaderData<CachedPageViews>()

  return (
    <>
      <HeaderSection text="Page Views" />

      <p className="mb-4">
        Updated{' '}
        {formatDistance(new Date(updatedAt), new Date(), {
          addSuffix: true,
        })}
      </p>

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
