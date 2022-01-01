import * as React from 'react'
import type { ActionFunction, MetaFunction } from 'remix'
import { Form, redirect, useActionData } from 'remix'
import { badRequest, bodyParser } from 'remix-utils'
import kebabCase from 'just-kebab-case'
import type { ActionData } from '~/utils/forms.server'
import { mapSchemaErrorsToFields } from '~/utils/forms.server'
import type { PostSchema } from '~/db/posts.server'
import { getPostBySlug, postSchema, savePost } from '~/db/posts.server'
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
      New
    </Breadcrumb>
  ),
}

export const meta: MetaFunction = () => ({
  title: 'New Post | Luke Rucker',
})

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
  const postWithSameSlug = await getPostBySlug(newPost.slug)

  if (postWithSameSlug) {
    return badRequest({
      values: body,
      error: `A post with the same slug already exists.`,
    })
  }

  await savePost(newPost)

  return redirect('/admin/posts')
}

export default function NewPost() {
  const actionData = useActionData<ActionData<PostSchema>>()

  const [title, setTitle] = React.useState(actionData?.values.title || '')
  const [slug, setSlug] = React.useState(kebabCase(title) || '')

  React.useEffect(() => {
    setSlug(kebabCase(title))
  }, [title])

  return (
    <>
      <HeaderSection text="New Post" />

      <Form method="post" className="mt-4 space-y-4">
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
          defaultValue={actionData?.values.description}
          error={actionData?.errors?.description}
        />

        <Input
          name="publishedAt"
          type="date"
          placeholder="Published at"
          label="Published at"
          defaultValue={formatDate(
            actionData?.values.publishedAt
              ? new Date(actionData?.values.publishedAt)
              : new Date()
          )}
          error={actionData?.errors?.publishedAt}
        />

        <Textarea
          name="markdown"
          label="Content"
          placeholder="Some profound thoughts..."
          rows={20}
          defaultValue={actionData?.values.markdown}
          error={actionData?.errors?.markdown}
        />

        <Button type="submit" className="mt-2 w-full">
          Publish
        </Button>
      </Form>
    </>
  )
}
