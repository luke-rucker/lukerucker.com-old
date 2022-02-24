import type { LoaderFunction } from 'remix'
import { Outlet, useLoaderData } from 'remix'
import { badRequest, notFound } from 'remix-utils'
import { Breadcrumb } from '~/components/breadcrumbs'
import type { Post } from '~/db/posts.server'
import { getPostBySlug } from '~/db/posts.server'
import type { BreadcrumbParams, Handle } from '~/types'
import { requireLuke } from '~/utils/session.server'

export const handle: Handle = {
  breadcrumb: ({ loaderData: post, path, isLast }: BreadcrumbParams<Post>) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      {post.title}
    </Breadcrumb>
  ),
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.slug) {
    throw badRequest({ error: 'Expected a slug.' })
  }

  await requireLuke(request)
  const post = await getPostBySlug(params.slug)

  if (!post) {
    throw notFound({ error: 'Post not found.' })
  }

  return post
}

export default function PostRoute() {
  const post = useLoaderData<Post>()

  return <Outlet context={post} />
}
