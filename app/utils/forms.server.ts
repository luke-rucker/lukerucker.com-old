import { ZodError } from 'zod'

export type FieldErrors<Schema> = {
  [key in keyof Partial<Schema>]: string
}

export function mapSchemaErrorsToFields<Schema>(
  error: ZodError
): FieldErrors<Schema> {
  const { fieldErrors } = error.formErrors
  const errors = {} as FieldErrors<Schema>

  Object.keys(fieldErrors).forEach(field => {
    const [fieldError] = fieldErrors[field]
    const formField = field as keyof Schema
    errors[formField] = fieldError
  })

  return errors
}

export type ActionData<Schema> = {
  values: Schema
  errors?: FieldErrors<Schema>
  error?: string
}
