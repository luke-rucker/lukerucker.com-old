import type { Post } from '~/db/posts.server'
import { Alert } from './alert'
import { DateDisplay } from './date-display'
import { Link } from './link'

type PostListProps = {
  posts: Array<Post>
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <Alert>No posts yet!</Alert>
  }

  return (
    <ol className="space-y-8">
      {posts.map(post => (
        <li key={post.slug}>
          <DateDisplay
            date={new Date(post.publishedAt!)}
            className="text-gray-500"
          />

          <Link
            to={`/posts/${post.slug}`}
            className="text-2xl md:text-3xl font-semibold text-gray-800 hover:text-gray-600"
          >
            <h3 className="mt-2 mb-4">{post.title}</h3>
          </Link>
          <p className="text-gray-600">{post.description}</p>
        </li>
      ))}
    </ol>
  )
}
