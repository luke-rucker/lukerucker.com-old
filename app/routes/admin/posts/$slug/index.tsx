import * as React from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { badRequest, notFound } from 'remix-utils'
import {
  Article,
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
        right={
          <Link to="edit" className="text-xl">
            Edit
          </Link>
        }
      />
      <p>{post.editedAt}</p>

      <p>{post.slug}</p>
      <p>{post.description}</p>

      <Article html={post.html} />
    </>
  )
}
