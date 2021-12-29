import { marked } from 'marked'
import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().nonempty({ message: 'A title is required.' }),
  slug: z.string().nonempty({ message: 'A slug is required.' }),
  description: z.string().nonempty({ message: 'A description is required.' }),
  draft: z.preprocess(val => val === 'on', z.boolean()),
  markdown: z.string().nonempty({ message: 'You have to write something!' }),
})

export type PostSchema = z.infer<typeof postSchema>

export type Post = PostSchema & {
  html: string
  publishedAt?: Date
  editedAt: Date
}

const postPrefix = 'post:'
const postKey = (slug: string) => `${postPrefix}${slug}`

async function getPostByKey(key: string): Promise<Post | null> {
  return SITE.get<Post>(key, 'json')
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return getPostByKey(postKey(slug))
}

export async function getPosts(): Promise<Array<Post>> {
  const { keys } = await SITE.list({ prefix: postPrefix })
  const posts = await Promise.all(keys.map(key => getPostByKey(key.name)))
  return posts as Array<Post>
}

export async function savePost(post: PostSchema) {
  const postToSave: Post = {
    ...post,
    html: marked(post.markdown),
    editedAt: new Date(),
    publishedAt: !post.draft ? new Date() : undefined,
  }

  await SITE.put(postKey(post.slug), JSON.stringify(postToSave))
}
