import * as React from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { badRequest, notFound } from 'remix-utils'
import {
  Article,
  Badge,
  Breadcrumb,
  BreadcrumbParams,
  HeaderSection,
  Link,
} from '~/components'
import { getPostBySlug, Post } from '~/db/posts.server'

export const handle = {
  breadcrumb: ({ loaderData: post, path, isLast }: BreadcrumbParams<Post>) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      {post.title}
    </Breadcrumb>
  ),
}

export const meta: MetaFunction = () => ({
  title: 'Posts | Luke Rucker',
})

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw badRequest({ error: 'Expected a slug.' })
  }

  const post = await getPostBySlug(params.slug)

  if (!post) {
    throw notFound({ error: 'Post not found.' })
  }

  return post
}

export default function ViewPost() {
  const post = useLoaderData<Post>()

  return (
    <>
      <HeaderSection
        text={post.title}
        left={
          <Badge className="ml-3">{post.draft ? 'Draft' : 'Published'}</Badge>
        }
        right={
          <div className="space-x-4">
            {!post.draft ? (
              <Link to={`/posts/${post.slug}`} className="text-xl">
                View on public site
              </Link>
            ) : null}

            <Link to="edit" className="text-xl">
              Edit
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <h3 className="text-xl font-semibold mb-2">Info</h3>
          <div className="bg-white p-4 shadow-xl">
            <p>{post.editedAt}</p>
            <p>{post.slug}</p>
            <p>{post.description}</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Preview</h3>
          <div className="bg-white p-4 shadow-xl max-h-96 overflow-auto">
            <Article html={post.html} />
          </div>
        </section>
      </div>
    </>
  )
}
