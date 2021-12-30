import * as React from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { badRequest, notFound } from 'remix-utils'
import {
  Article,
  Breadcrumb,
  BreadcrumbParams,
  Breadcrumbs,
} from '~/components'
import { getPostBySlug, Post } from '~/db/posts.server'

export const handle = {
  breadcrumb: ({ loaderData: post, path, isLast }: BreadcrumbParams<Post>) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      {post.title}
    </Breadcrumb>
  ),
}

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.title} | Luke Rucker`,
})

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw badRequest({ error: 'Expected a slug.' })
  }

  const post = await getPostBySlug(params.slug, { status: 'published' })

  if (!post) {
    throw notFound({ error: 'Post not found.' })
  }

  return post
}

export default function ViewPost() {
  const post = useLoaderData<Post>()

  return (
    <>
      <Breadcrumbs className="mb-4" />
      <Article
        header={
          <>
            <h2 className="text-4xl text-gray-900 font-bold mb-5">
              {post.title}
            </h2>
            <p className="text-sm text-gray-400 mb-5">
              {new Date(post.publishedAt!).toDateString()}
            </p>
          </>
        }
        html={post.html}
      />
    </>
  )
}
