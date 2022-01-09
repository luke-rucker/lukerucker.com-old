import type { ActionFunction, LoaderFunction, MetaFunction } from 'remix'
import { Form, useActionData } from 'remix'
import { badRequest, bodyParser, unauthorized } from 'remix-utils'
import { Alert } from '~/components/alert'
import { Card } from '~/components/card'
import { Button } from '~/components/forms/button'
import { Input } from '~/components/forms/input'
import { Link } from '~/components/link'
import type { ActionData } from '~/utils/forms.server'
import { mapSchemaErrorsToFields } from '~/utils/forms.server'
import type { LoginSchema } from '~/utils/session.server'
import {
  createUserSession,
  login,
  loginSchema,
  redirectIfLuke,
} from '~/utils/session.server'

export const meta: MetaFunction = () => ({
  title: 'Login | Luke Rucker',
})

export const loader: LoaderFunction = async ({ request }) => {
  await redirectIfLuke(request)
  return null
}

export const action: ActionFunction = async ({ request }) => {
  const body = await bodyParser.toJSON(request)
  const validatedBody = await loginSchema.safeParseAsync(body)

  if (!validatedBody.success) {
    return badRequest({
      values: body,
      errors: mapSchemaErrorsToFields<LoginSchema>(validatedBody.error),
    })
  }

  const loggedIn = await login(validatedBody.data)

  if (!loggedIn) {
    return unauthorized({
      values: body,
      error: 'Nice try :)',
    })
  }

  return createUserSession()
}

export default function Login() {
  const actionData = useActionData<ActionData<LoginSchema>>()

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-5 font-semibold">Login</h1>

      <Card className="w-full max-w-sm">
        <Form method="post" reloadDocument className="space-y-2">
          {actionData?.error ? (
            <Alert variant="error">{actionData?.error}</Alert>
          ) : null}

          <Input
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            defaultValue={actionData?.values.password}
            error={actionData?.errors?.password}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
      </Card>

      <Link to="/" className="mt-4 text-sm">
        To Public Site
      </Link>
    </div>
  )
}
