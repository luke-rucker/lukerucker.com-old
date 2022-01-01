import { z } from 'zod'
import { parseDateString } from '~/utils/dates'
import { convertToHtml } from '~/utils/markdown'
import { publicPostPathFor } from '~/utils/paths'
import { deletePageViewsFor } from './page-views.server'

export const postSchema = z.object({
  title: z.string().nonempty({ message: 'A title is required.' }),
  slug: z.string().nonempty({ message: 'A slug is required.' }),
  description: z.string().nonempty({ message: 'A description is required.' }),
  publishedAt: z.preprocess(parseDateString, z.date().nullable()),
  markdown: z.string().nonempty({ message: 'Really? No thoughts to share?' }),
})

export type PostSchema = z.infer<typeof postSchema>

// Attributes which are not filled automatically by the server (and not editable by the user)
type AdditionalPostAttributes = {
  html: string
  editedAt: Date
}

export type Post = PostSchema & AdditionalPostAttributes

type PostMetadata = Pick<Post, 'publishedAt'>

const postPrefix = 'post:'
const postKeyFor = (slug: string) => `${postPrefix}${slug}`

const getPostByKey = (key: string) => SITE.get<Post>(key, 'json')

// TODO: if the need for filtering grows, come up with a better solution
type PostFilters = {
  status?: 'published' | 'draft'
}

export async function getPostBySlug(
  slug: string,
  filters?: PostFilters
): Promise<Post | null> {
  const post = await getPostByKey(postKeyFor(slug))

  if (!filters || Object.keys(filters).length === 0) return post

  if (filters?.status === 'published' && !post?.publishedAt) return null
  if (filters?.status === 'draft' && post?.publishedAt) return null

  return post
}

export async function getPosts(filters?: PostFilters): Promise<Array<Post>> {
  const { keys } = await SITE.list({ prefix: postPrefix })

  const keysToFetch = filters?.status
    ? keys.filter(key => {
        const { publishedAt } = key.metadata as PostMetadata

        return filters.status === 'published'
          ? publishedAt !== null
          : publishedAt === null
      })
    : keys

  const posts = await Promise.all(
    keysToFetch.map(key => getPostByKey(key.name))
  )

  return posts as Array<Post>
}

export async function savePost(post: PostSchema) {
  const postToSave: Post = {
    ...post,
    html: convertToHtml(post.markdown),
    editedAt: new Date(),
  }

  await SITE.put(postKeyFor(postToSave.slug), JSON.stringify(postToSave), {
    metadata: { publishedAt: postToSave.publishedAt },
  })
}

export async function deletePostBySlug(slug: string) {
  await Promise.all([
    SITE.delete(postKeyFor(slug)),
    deletePageViewsFor(publicPostPathFor(slug)),
  ])
}
