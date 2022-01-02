import { formatDistance } from 'date-fns'
import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { CardSection } from '~/components/card-section'
import { HeaderSection } from '~/components/header-section'
import { Link } from '~/components/link'
import { PageViewsTable } from '~/components/page-views-table'
import type { CachedPageViews } from '~/db/page-views.server'
import { getTopPageViews } from '~/db/page-views.server'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

export const loader: LoaderFunction = () => getTopPageViews({ limit: 5 })

export default function Admin() {
  const topPageViews = useLoaderData<CachedPageViews>()

  return (
    <>
      <HeaderSection text="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardSection header="Recently Edited Posts">
          <p>Recently edited posts</p>
        </CardSection>

        <CardSection header="Top Page Views">
          <PageViewsTable pageViews={topPageViews.pageViews} />

          <div className="mt-4 flex justify-between text-sm">
            <p className="">
              Updated{' '}
              {formatDistance(new Date(topPageViews.updatedAt), new Date(), {
                addSuffix: true,
              })}
            </p>

            <Link to="page-views" aria-label="View All Page Views">
              View All
            </Link>
          </div>
        </CardSection>
      </div>
    </>
  )
}
