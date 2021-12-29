import * as React from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { formatRelative } from 'date-fns'
import { Badge, HeaderSection, Link } from '~/components'
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

      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug} className="bg-gray-100 shadow-xl p-4">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
              <Badge className="ml-3">
                {post.draft ? 'Draft' : 'Published'}
              </Badge>
            </div>

            <p className="text-gray-500">{post.description}</p>

            <div className="flex justify-between">
              <p>
                Edited {formatRelative(new Date(post.editedAt), new Date())}
              </p>
              <Link to={post.slug} aria-label={`View ${post.title}`}>
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
