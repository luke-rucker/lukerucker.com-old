import * as React from 'react'
import { ActionFunction, Form, Link, useActionData } from 'remix'
import { badRequest, bodyParser, unauthorized } from 'remix-utils'
import { Alert, Input } from '~/components'
import {
  FieldErrors,
  mapSchemaErrorsToFields,
} from '~/utils/form-validation.server'
import {
  createUserSession,
  login,
  loginSchema,
  LoginSchema,
} from '~/utils/session.server'

type ActionData = {
  values: LoginSchema
  errors?: FieldErrors<LoginSchema>
  error?: string
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
      error: 'Incorrect password.',
    })
  }

  return await createUserSession()
}

export default function Login() {
  const actionData = useActionData<ActionData>()

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>lukerucker.com Admin</h1>
      <h2 className="text-3xl mb-5 font-semibold">Login</h2>
      <div className="w-full max-w-sm shadow-2xl p-4">
        <Form method="post">
          {actionData?.error ? (
            <Alert variant="error" message={actionData?.error} />
          ) : null}

          <Input
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            defaultValue={actionData?.values.password}
            error={actionData?.errors?.password}
          />

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </div>

      <Link to="/" className="mt-4 text-sm">
        To Public Site
      </Link>
    </div>
  )
}
