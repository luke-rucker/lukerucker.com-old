import * as React from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { formatRelative } from 'date-fns'
import { Alert, Badge, HeaderSection, Link } from '~/components'
import { getPosts, Post } from '~/db/posts.server'

export const meta: MetaFunction = () => ({
  title: 'Posts | Luke Rucker',
})

export const loader: LoaderFunction = () => getPosts()

export default function Posts() {
  const posts = useLoaderData<Array<Post>>()

  return (
    <>
      <HeaderSection
        text="Posts"
        right={
          <Link to="new" className="text-xl">
            New
          </Link>
        }
      />

      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.slug} className="bg-white shadow-xl p-4">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <Badge className="ml-3">
                  {post.draft ? 'Draft' : 'Published'}
                </Badge>
              </div>

              <p className="text-gray-500 mb-1">{post.description}</p>

              <div className="flex justify-between">
                <p className="text-sm">
                  Edited {formatRelative(new Date(post.editedAt), new Date())}
                </p>
                <Link to={post.slug} aria-label={`View ${post.title}`}>
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Alert>
          You have no posts yet!
          <Link to="new" className="ml-1">
            Create one
          </Link>
        </Alert>
      )}
    </>
  )
}
