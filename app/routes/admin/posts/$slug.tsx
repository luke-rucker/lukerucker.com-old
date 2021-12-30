import { LoaderFunction, Outlet, useLoaderData } from 'remix'
import { badRequest, notFound } from 'remix-utils'
import { Breadcrumb } from '~/components/breadcrumbs'
import { getPostBySlug, Post } from '~/db/posts.server'
import { BreadcrumbParams, Handle } from '~/utils/handle.server'

export const handle: Handle = {
  breadcrumb: ({ loaderData: post, path, isLast }: BreadcrumbParams<Post>) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      {post.title}
    </Breadcrumb>
  ),
}

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

export default function PostRoute() {
  const post = useLoaderData<Post>()

  return <Outlet context={post} />
}
