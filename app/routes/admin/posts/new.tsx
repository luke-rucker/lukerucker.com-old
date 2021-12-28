import * as React from 'react'
import {
  ActionFunction,
  Form,
  MetaFunction,
  redirect,
  useActionData,
} from 'remix'
import { badRequest, bodyParser } from 'remix-utils'
import kebabCase from 'just-kebab-case'
import { z } from 'zod'
import { Alert, Button, Input } from '~/components'
import { ActionData, mapSchemaErrorsToFields } from '~/utils/forms.server'

export const handle = { hydrate: true }

export const meta: MetaFunction = () => ({
  title: 'New Post | Luke Rucker',
})

const postSchema = z.object({
  title: z.string().nonempty({ message: 'A title is required.' }),
  slug: z.string().nonempty({ message: 'A slug is required.' }),
})

type PostSchema = z.infer<typeof postSchema>

export const action: ActionFunction = async ({ request }) => {
  const body = await bodyParser.toJSON(request)
  console.log(body)
  const validatedBody = await postSchema.safeParseAsync(body)

  if (!validatedBody.success) {
    return badRequest({
      values: body,
      errors: mapSchemaErrorsToFields<PostSchema>(validatedBody.error),
    })
  }

  return redirect('/admin/posts')
}

export default function NewPost() {
  const actionData = useActionData<ActionData<PostSchema>>()

  const [title, setTitle] = React.useState(actionData?.values.title || '')
  const [slug, setSlug] = React.useState(kebabCase(title) || '')

  return (
    <div>
      <h2 className="text-2xl font-bold">New Post</h2>

      <Form method="post" className="mt-4 space-y-4">
        {actionData?.error ? (
          <Alert variant="error" message={actionData?.error} className="mb-2" />
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
          readOnly
          value={slug}
          error={actionData?.errors?.slug}
        />

        <Button type="submit" className="mt-2 w-full">
          Create
        </Button>
      </Form>
    </div>
  )
}
