import { compareDesc } from 'date-fns'
import type { LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'
import { Link } from '~/components/link'
import { PostList } from '~/components/post-list'
import type { Post } from '~/db/posts.server'
import { getPosts } from '~/db/posts.server'
import { recordPageViewFor } from '~/utils/page-views.server'

export const loader: LoaderFunction = async ({ request }) => {
  const [posts] = await Promise.all([
    getPosts({ status: 'published' }),
    recordPageViewFor(request),
  ])

  posts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.publishedAt!), new Date(b.publishedAt!))
  )

  return posts.slice(0, 3)
}

export default function LandingPage() {
  const recentPosts = useLoaderData<Array<Post>>()

  return (
    <>
      <div className="text-2xl md:text-3xl font-bold pb-12 md:pb-24">
        <h2>
          Hi, I&apos;m Luke Rucker.{' '}
          <span className="text-gray-500">
            I name variables for a living. Oh, and sometimes I build software.
          </span>
        </h2>
      </div>

      <section>
        <h3 className="text-xl md:text-2xl font-bold pb-4">Recent Posts</h3>

        <PostList posts={recentPosts} />

        {recentPosts.length > 0 ? (
          <p className="pt-8 md:pt-8">
            <Link to="posts" aria-label="View All Posts">
              View All
            </Link>
          </p>
        ) : null}
      </section>
    </>
  )
}
