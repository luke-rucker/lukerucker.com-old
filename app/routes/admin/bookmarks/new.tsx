import type { ActionFunction, MetaFunction } from 'remix'
import { Form, redirect, useActionData } from 'remix'
import { badRequest, bodyParser } from 'remix-utils'
import { Alert } from '~/components/alert'
import { Breadcrumb } from '~/components/breadcrumbs'
import { Card } from '~/components/card'
import { Button } from '~/components/forms/button'
import { Input } from '~/components/forms/input'
import { HeaderSection } from '~/components/header-section'
import type { BookmarkSchema } from '~/db/bookmarks.server'
import { bookmarkSchema, saveBookmark } from '~/db/bookmarks.server'
import type { Handle } from '~/types'
import type { ActionData } from '~/utils/forms.server'
import { mapSchemaErrorsToFields } from '~/utils/forms.server'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      New
    </Breadcrumb>
  ),
}

export const meta: MetaFunction = () => ({
  title: 'New Bookmark | Luke Rucker',
})

export const action: ActionFunction = async ({ request }) => {
  const body = await bodyParser.toJSON(request)
  const validatedBody = await bookmarkSchema.safeParseAsync(body)

  if (!validatedBody.success) {
    return badRequest({
      values: body,
      errors: mapSchemaErrorsToFields<BookmarkSchema>(validatedBody.error),
    })
  }

  await saveBookmark(validatedBody.data)

  return redirect('/admin/bookmarks')
}

export default function NewBookmark() {
  const actionData = useActionData<ActionData<BookmarkSchema>>()

  return (
    <>
      <HeaderSection text="New Bookmark" />

      <Card>
        <Form method="post" className="space-y-4">
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
            defaultValue={actionData?.values.title}
            error={actionData?.errors?.title}
          />

          <Input
            name="url"
            type="text"
            placeholder="URL"
            label="URL"
            defaultValue={actionData?.values.url}
            error={actionData?.errors?.url}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </Form>
      </Card>
    </>
  )
}
