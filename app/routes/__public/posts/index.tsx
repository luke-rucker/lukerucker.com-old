import { compareDesc } from 'date-fns'
import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { PageHeading } from '~/components/page-heading'
import { PostList } from '~/components/post-list'
import type { Post } from '~/db/posts.server'
import { getPosts } from '~/db/posts.server'
import { recordPageViewFor } from '~/utils/page-views.server'

export const meta: MetaFunction = () => ({
  title: 'Posts | Luke Rucker',
})

export const loader: LoaderFunction = async ({ request }) => {
  const [posts] = await Promise.all([
    getPosts({ status: 'published' }),
    recordPageViewFor(request),
  ])

  posts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.publishedAt!), new Date(b.publishedAt!))
  )

  return posts
}

export default function Posts() {
  const posts = useLoaderData<Array<Post>>()

  return (
    <section>
      <PageHeading header="Posts">
        Just some thoughts... Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nullam ut magna nec quam dictum dapibus vel consequat metus.
        Praesent laoreet dui eu elit semper tincidunt.
      </PageHeading>

      <PostList posts={posts} />
    </section>
  )
}
