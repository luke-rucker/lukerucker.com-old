import * as React from 'react'
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  useActionData,
} from 'remix'
import { badRequest, bodyParser, unauthorized } from 'remix-utils'
import { Alert, Button, Input, Link } from '~/components'
import { ActionData, mapSchemaErrorsToFields } from '~/utils/forms.server'
import {
  createUserSession,
  login,
  loginSchema,
  LoginSchema,
  redirectIfLoggedIn,
} from '~/utils/session.server'

export const meta: MetaFunction = () => ({
  title: 'Login | Luke Rucker',
})

export const loader: LoaderFunction = async ({ request }) => {
  await redirectIfLoggedIn(request)
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

  return await createUserSession()
}

export default function Login() {
  const actionData = useActionData<ActionData<LoginSchema>>()

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-5 font-semibold">Login</h1>
      <div className="w-full max-w-sm shadow-2xl p-4">
        <Form method="post">
          {actionData?.error ? (
            <Alert
              variant="error"
              message={actionData?.error}
              className="mb-2"
            />
          ) : null}

          <Input
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            defaultValue={actionData?.values.password}
            error={actionData?.errors?.password}
          />

          <Button type="submit" className="mt-2 w-full">
            Login
          </Button>
        </Form>
      </div>

      <Link to="/" className="mt-4 text-sm">
        To Public Site
      </Link>
    </div>
  )
}
