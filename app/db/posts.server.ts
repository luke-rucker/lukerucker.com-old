import { z } from 'zod'
import { convertToHtml } from '~/utils/markdown'

export const postSchema = z.object({
  title: z.string().nonempty({ message: 'A title is required.' }),
  slug: z.string().nonempty({ message: 'A slug is required.' }),
  description: z.string().nonempty({ message: 'A description is required.' }),
  draft: z.preprocess(val => val === 'on', z.boolean()),
  markdown: z.string().nonempty({ message: 'Really? No thoughts to share?' }),
})

export type PostSchema = z.infer<typeof postSchema>

type AdditionalPostAttributes = {
  html: string
  publishedAt?: Date
  editedAt: Date
}

export type Post = PostSchema & AdditionalPostAttributes

type PostMetadata = {
  publishedAt?: Date
}

const postPrefix = 'post:'
const postKey = (slug: string) => `${postPrefix}${slug}`

async function getPostByKey(key: string): Promise<Post | null> {
  return SITE.get<Post>(key, 'json')
}

type PostFilters = {
  status?: 'published' | 'draft'
}

export async function getPostBySlug(
  slug: string,
  filters?: PostFilters
): Promise<Post | null> {
  const post = await getPostByKey(postKey(slug))

  if (post === null) return null
  if (filters?.status === 'published' && !post?.publishedAt) return null
  if (filters?.status === 'draft' && !post.draft) return null

  return post
}

export async function getPosts(filters?: PostFilters): Promise<Array<Post>> {
  const { keys } = await SITE.list({ prefix: postPrefix })

  const keysToFetch = filters?.status
    ? keys.filter(key => {
        const { publishedAt } = key.metadata as PostMetadata

        return filters.status === 'published'
          ? publishedAt !== undefined
          : publishedAt === undefined
      })
    : keys

  const posts = await Promise.all(
    keysToFetch.map(key => getPostByKey(key.name))
  )

  return posts as Array<Post>
}

export async function savePost(
  post: PostSchema,
  overrides?: Partial<AdditionalPostAttributes>
) {
  const postToSave: Post = {
    ...post,
    html: convertToHtml(post.markdown),
    editedAt: new Date(),
    publishedAt: !post.draft ? new Date() : undefined,
    ...overrides,
  }

  await SITE.put(postKey(post.slug), JSON.stringify(postToSave), {
    metadata: { publishedAt: postToSave.publishedAt },
  })
}

export const deletePostBySlug = (slug: string) => SITE.delete(postKey(slug))
