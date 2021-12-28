import * as React from 'react'
import { ActionFunction, Form, useActionData } from 'remix'
import { badRequest, bodyParser, unauthorized } from 'remix-utils'
import { Input } from '~/components'
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
    <div>
      <h1>lukerucker.com Admin</h1>
      <h2>Login</h2>

      <Form method="post">
        {actionData?.error ? <p>{actionData.error}</p> : null}

        <Input
          name="password"
          type="password"
          placeholder="Password"
          label="Password"
          defaultValue={actionData?.values.password}
          error={actionData?.errors?.password}
        />

        <button type="submit">Login</button>
      </Form>
    </div>
  )
}
