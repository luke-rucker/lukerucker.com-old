import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Alert, Link } from '~/components'
import { getPosts, Post } from '~/db/posts.server'

export const meta: MetaFunction = () => ({
  title: 'Blog | Luke Rucker',
})

export const loader: LoaderFunction = () => getPosts({ status: 'published' })

export default function Posts() {
  const posts = useLoaderData<Array<Post>>()

  return (
    <>
      <h2 className="text-3xl font-bold mb-2">Posts</h2>
      <p className="text-gray-500 font-semibold mb-8">Just some thoughts...</p>

      {posts.length > 0 ? (
        <ol className="space-y-4">
          {posts.map(post => (
            <li key={post.slug}>
              <p className="mb-1 text-sm text-gray-500">
                {new Date(post.publishedAt!).toDateString()}
              </p>

              <Link
                to={post.slug}
                className="mb-2 text-2xl font-semibold text-gray-800 hover:text-gray-600"
              >
                <h3>{post.title}</h3>
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
