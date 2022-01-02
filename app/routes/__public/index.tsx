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
    <div className="space-y-8 md:space-y-16">
      <div className="text-2xl font-bold">
        <h2>Hello world, I&apos;m Luke Rucker.</h2>

        <p className="text-gray-500">
          I&apos;m a 19 year old software developer.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>

        <PostList posts={recentPosts} />

        <p className="mt-4">
          <Link to="posts" aria-label="View All Posts">
            View All
          </Link>
        </p>
      </div>
    </div>
  )
}
