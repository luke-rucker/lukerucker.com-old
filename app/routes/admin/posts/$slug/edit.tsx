import * as React from 'react'
import type { ActionFunction, MetaFunction } from 'remix'
import { Form, redirect, useActionData, useOutletContext } from 'remix'
import kebabCase from 'just-kebab-case'
import { badRequest, bodyParser, serverError } from 'remix-utils'
import type { Post, PostSchema } from '~/db/posts.server'
import {
  deletePostBySlug,
  getPostBySlug,
  postSchema,
  savePost,
} from '~/db/posts.server'
import type { ActionData } from '~/utils/forms.server'
import { mapSchemaErrorsToFields } from '~/utils/forms.server'
import { Breadcrumb } from '~/components/breadcrumbs'
import { HeaderSection } from '~/components/header-section'
import { Alert } from '~/components/alert'
import { Input } from '~/components/forms/input'
import { Textarea } from '~/components/forms/textarea'
import { Button } from '~/components/forms/button'
import { formatDate } from '~/utils/dates'
import type { Handle } from '~/types'

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

  const editedPost = validatedBody.data

  /**
   * Pathname should look like /admin/posts/the-old-slug/edit
   *
   * So, the second to last segment should be "the-old-slug".
   *
   * Short of having some hidden input in the form, I cannot think of
   * a better way to get the old slug.
   */
  const oldSlug = new URL(request.url).pathname.split('/').at(-2)

  if (!oldSlug) {
    return serverError({
      values: body,
      error: 'Woah, something is wrong here...',
    })
  }

  const changedSlug = editedPost.slug !== oldSlug

  if (changedSlug) {
    const postWithNewSlug = await getPostBySlug(editedPost.slug)

    if (postWithNewSlug) {
      return badRequest({
        values: body,
        error: `A post with the same slug already exists.`,
      })
    }

    await deletePostBySlug(oldSlug)
  }

  await savePost(editedPost)

  return redirect(`/admin/posts/${editedPost.slug}`)
}

export default function EditPost() {
  const post = useOutletContext<Post>()
  const actionData = useActionData<ActionData<PostSchema>>()

  const [title, setTitle] = React.useState(post.title)
  const [slug, setSlug] = React.useState(post.slug)

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
          onChange={e => {
            setTitle(e.target.value)
            setSlug(kebabCase(e.target.value))
          }}
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

        <Input
          name="publishedAt"
          type="date"
          placeholder="Published at"
          label="Published at"
          defaultValue={
            post.publishedAt
              ? formatDate(new Date(post.publishedAt))
              : undefined
          }
          error={actionData?.errors?.publishedAt}
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
