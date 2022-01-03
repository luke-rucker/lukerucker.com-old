import { z } from 'zod'
import { cache, getCachedValue } from '~/utils/cache.server'
import { parseDateString } from '~/utils/dates'
import { convertToHtml } from '~/utils/markdown.server'
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

const postsPrefix = 'posts:'
const postsKeyFor = (slug: string) => `${postsPrefix}${slug}`

const getPostByKey = (key: string) => SITE.get<Post>(key, 'json')

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await getPostByKey(postsKeyFor(slug))
  return post
}

// TODO: if the need for filtering grows, come up with a better solution
type PostFilters = {
  status?: 'published' | 'draft'
}

export const getPosts = (filters?: PostFilters) =>
  getCachedValue<Array<Post>>(
    postsKeyFor(filters?.status || 'all'),
    async () => {
      const { keys } = await SITE.list({ prefix: postsPrefix })

      const keysToFetch = filters?.status
        ? keys.filter(key => {
            const { publishedAt } = key.metadata as PostMetadata

            return filters.status === 'published'
              ? publishedAt !== null
              : publishedAt === null
          })
        : keys

      const potentiallyNullPosts = await Promise.all(
        keysToFetch.map(key => getPostByKey(key.name))
      )

      const posts = potentiallyNullPosts.filter(Boolean) as Array<Post>

      return posts
    }
  )

async function refreshPostCache() {
  console.log('refreshing posts cache')
  await cache.removeAll({ matchingPrefix: postsPrefix })
  await getPosts()
}

export async function savePost(post: PostSchema) {
  const postToSave: Post = {
    ...post,
    html: convertToHtml(post.markdown),
    editedAt: new Date(),
  }

  await SITE.put(postsKeyFor(postToSave.slug), JSON.stringify(postToSave), {
    metadata: { publishedAt: postToSave.publishedAt },
  })

  await refreshPostCache()
}

export async function deletePostBySlug(slug: string) {
  await Promise.all([
    SITE.delete(postsKeyFor(slug)),
    deletePageViewsFor(publicPostPathFor(slug)),
  ])
  await refreshPostCache()
}
