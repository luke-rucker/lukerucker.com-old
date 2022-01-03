import { compareDesc } from 'date-fns'
import type { LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'
import { Link } from '~/components/link'
import { PostList } from '~/components/post-list'
import type { Post } from '~/db/posts.server'
import { getPosts } from '~/db/posts.server'
import { recordPageViewFor } from '~/utils/page-views.server'

export const loader: LoaderFunction = async ({ request }) => {
  recordPageViewFor(request)

  const posts = await getPosts({ status: 'published' })

  posts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.publishedAt!), new Date(b.publishedAt!))
  )

  return posts.slice(0, 3)
}

export default function LandingPage() {
  const recentPosts = useLoaderData<Array<Post>>()

  return (
    <div className="space-y-8 md:space-y-16">
      <div className="text-2xl font-bold pb-4 md:pb-8">
        <h2>Hi, I&apos;m Luke Rucker.</h2>

        <p className="text-gray-500">
          I name variables for a living. Oh, and sometimes I build software.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>

        <PostList posts={recentPosts} />

        {recentPosts.length > 0 ? (
          <p className="mt-4 md:mt-8">
            <Link to="posts" aria-label="View All Posts">
              View All
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  )
}
