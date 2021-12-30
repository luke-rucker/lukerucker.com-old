import * as React from 'react'
import {
  ActionFunction,
  Form,
  MetaFunction,
  redirect,
  useActionData,
  useOutletContext,
} from 'remix'
import kebabCase from 'just-kebab-case'
import { badRequest, bodyParser } from 'remix-utils'
import {
  deletePostBySlug,
  getPostBySlug,
  Post,
  postSchema,
  PostSchema,
  savePost,
} from '~/db/posts.server'
import { ActionData, mapSchemaErrorsToFields } from '~/utils/forms.server'
import { Breadcrumb } from '~/components/breadcrumbs'
import { HeaderSection } from '~/components/header-section'
import { Alert } from '~/components/alert'
import { Input } from '~/components/forms/input'
import { Checkbox } from '~/components/forms/checkbox'
import { Textarea } from '~/components/forms/textarea'
import { Button } from '~/components/forms/button'
import { Handle } from '~/utils/handle.server'

export const handle: Handle = {
  hydrate: true,
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      Edit
    </Breadcrumb>
  ),
}

export const meta: MetaFunction = ({ parentsData }) => {
  const parentData = Object.values(parentsData).at(-1)

  return {
    title: `Edit ${parentData.title} | Luke Rucker`,
  }
}

export const action: ActionFunction = async ({ request }) => {
  const body = await bodyParser.toJSON(request)
  const validatedBody = await postSchema.safeParseAsync(body)

  if (!validatedBody.success) {
    return badRequest({
      values: body,
      errors: mapSchemaErrorsToFields<PostSchema>(validatedBody.error),
    })
  }

  const newPost = validatedBody.data
  const oldSlug = new URL(request.url).pathname.split('/').at(-2)!

  const changedSlug = newPost.slug !== oldSlug

  if (changedSlug) {
    const postWithNewSlug = await getPostBySlug(newPost.slug)

    if (postWithNewSlug) {
      return badRequest({
        values: body,
        error: `A post with the same slug already exists.`,
      })
    }

    await deletePostBySlug(oldSlug)
  }

  const oldPost = await getPostBySlug(oldSlug)

  const previouslyPublishedAt = oldPost?.publishedAt
  const goingToBePublished = !newPost.draft

  if (previouslyPublishedAt && goingToBePublished) {
    await savePost(newPost, {
      publishedAt: previouslyPublishedAt,
    })
  } else {
    await savePost(newPost)
  }

  return redirect(`/admin/posts/${newPost.slug}`)
}

export default function EditPost() {
  const post = useOutletContext<Post>()
  const actionData = useActionData<ActionData<PostSchema>>()

  const [title, setTitle] = React.useState(post.title)
  const [slug, setSlug] = React.useState(kebabCase(title) || '')

  React.useEffect(() => {
    setSlug(kebabCase(title))
  }, [title])

  return (
    <>
      <HeaderSection text={`Edit ${post.title}`} />

      <Form method="put" className="mt-4 space-y-4">
        {actionData?.error ? (
          <Alert variant="error" className="mb-4">
            {actionData?.error}
          </Alert>
        ) : null}

        <Input
          name="title"
          type="text"
          placeholder="Title"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={actionData?.errors?.title}
        />

        <Input
          name="slug"
          type="text"
          placeholder="Slug"
          label="Slug"
          onChange={e => setSlug(e.target.value)}
          value={slug}
          error={actionData?.errors?.slug}
        />

        <Input
          name="description"
          type="text"
          placeholder="Description"
          label="Description"
          defaultValue={post.description}
          error={actionData?.errors?.description}
        />

        <Checkbox
          name="draft"
          label="Draft"
          defaultChecked={post.draft}
          error={actionData?.errors?.draft}
        />

        <Textarea
          name="markdown"
          label="Content"
          placeholder="Some profound thoughts..."
          rows={20}
          defaultValue={post.markdown}
          error={actionData?.errors?.markdown}
        />

        <Button type="submit" className="mt-2 w-full">
          Save
        </Button>
      </Form>
    </>
  )
}
