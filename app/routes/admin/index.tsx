import { compareDesc, formatDistance } from 'date-fns'
import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { Alert } from '~/components/alert'
import { CardSection } from '~/components/card-section'
import { HeaderSection } from '~/components/header-section'
import { Link } from '~/components/link'
import { PageViewsTable } from '~/components/page-views-table'
import type { CachedPageViews } from '~/db/page-views.server'
import { getTopPageViews } from '~/db/page-views.server'
import type { Post } from '~/db/posts.server'
import { getPosts } from '~/db/posts.server'
import { requireLuke } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

type LoaderData = {
  recentlyEditedPosts: Array<Post>
  topPageViews: CachedPageViews
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireLuke(request)

  const [posts, topPageViews] = await Promise.all([
    getPosts(),
    getTopPageViews({ limit: 5 }),
  ])

  posts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.editedAt), new Date(b.editedAt))
  )

  return {
    recentlyEditedPosts: posts.slice(0, 5),
    topPageViews,
  }
}

export default function Admin() {
  const { recentlyEditedPosts, topPageViews } = useLoaderData<LoaderData>()

  return (
    <>
      <HeaderSection text="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardSection header="Recently Edited Posts">
          {recentlyEditedPosts.length > 0 ? (
            <>
              <ol className="space-y-2">
                {recentlyEditedPosts.map(post => (
                  <li key={post.slug}>
                    <div className="md:flex items-center justify-between ">
                      <Link to={`posts/${post.slug}`} className="text-gray-800">
                        <h4>{post.title}</h4>
                      </Link>

                      <p className="text-xs">
                        Edited{' '}
                        {formatDistance(new Date(post.editedAt), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    <p className="truncate text-sm text-gray-500">
                      {post.description}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-4 text-right">
                <Link to="posts" aria-label="View All Posts">
                  View All
                </Link>
              </div>
            </>
          ) : (
            <Alert>No posts yet!</Alert>
          )}
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
