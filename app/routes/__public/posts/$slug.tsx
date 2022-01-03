import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { badRequest, notFound } from 'remix-utils'
import { Article } from '~/components/article'
import { Breadcrumb, Breadcrumbs } from '~/components/breadcrumbs'
import { DateDisplay } from '~/components/date-display'
import { Link } from '~/components/link'
import type { Post } from '~/db/posts.server'
import { getPostBySlug } from '~/db/posts.server'
import type { AdminToolbarParams, BreadcrumbParams, Handle } from '~/types'
import { recordPageViewFor } from '~/utils/page-views.server'

export const handle: Handle = {
  breadcrumb: ({ loaderData: post, path, isLast }: BreadcrumbParams<Post>) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      {post.title}
    </Breadcrumb>
  ),
  adminToolbar: ({ loaderData: post }: AdminToolbarParams<Post>) => (
    <Link to={`/admin/posts/${post.slug}/edit`}>edit post</Link>
  ),
}

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.title} | Luke Rucker`,
  description: data.description,
})

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.slug) {
    throw badRequest({ error: 'Expected a slug.' })
  }

  const post = await getPostBySlug(params.slug)

  if (!post || !post.publishedAt) {
    throw notFound({ error: 'Post not found.' })
  }

  recordPageViewFor(request)

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
            <h2>{post.title}</h2>
            <DateDisplay date={new Date(post.publishedAt!)} />
          </>
        }
        html={post.html}
      />
    </>
  )
}
