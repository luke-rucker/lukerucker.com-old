import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { Alert } from '~/components/alert'
import { DateDisplay } from '~/components/date-display'
import { Link } from '~/components/link'
import type { Post } from '~/db/posts.server'
import { getPosts } from '~/db/posts.server'
import { recordPageViewFor } from '~/utils/page-views.server'

export const meta: MetaFunction = () => ({
  title: 'Blog | Luke Rucker',
})

export const loader: LoaderFunction = async ({ request }) => {
  const [posts] = await Promise.all([
    getPosts({ status: 'published' }),
    recordPageViewFor(request),
  ])
  return posts
}

export default function Posts() {
  const posts = useLoaderData<Array<Post>>()

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Posts</h2>
      <p className="text-gray-500 font-semibold mb-8 md:mb-12">
        Just some thoughts... Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nullam ut magna nec quam dictum dapibus vel consequat metus.
        Praesent laoreet dui eu elit semper tincidunt.
      </p>

      {posts.length > 0 ? (
        <ol className="space-y-8">
          {posts.map(post => (
            <li key={post.slug}>
              <DateDisplay
                date={new Date(post.publishedAt!)}
                className="text-gray-500"
              />

              <Link
                to={post.slug}
                className="text-2xl font-semibold text-gray-800 hover:text-gray-600"
              >
                <h3 className="mt-2 mb-4">{post.title}</h3>
              </Link>
              <p className="text-gray-600">{post.description}</p>
            </li>
          ))}
        </ol>
      ) : (
        <Alert>No posts yet!</Alert>
      )}
    </>
  )
}
