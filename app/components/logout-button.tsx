import clsx from 'clsx'
import { Form } from 'remix'

type LogoutButtonProps = {
  className?: string
}

export function LogoutButton({ className }: LogoutButtonProps) {
  return (
    <Form method="delete" action="/logout">
      <button type="submit" className={clsx('link', className)}>
        logout
      </button>
    </Form>
  )
}
