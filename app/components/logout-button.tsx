import { Form } from 'remix'
import type { ButtonProps } from './forms/button'
import { Button } from './forms/button'

type LogoutButtonProps = Omit<ButtonProps, 'type' | 'variant' | 'children'>

export function LogoutButton(props: LogoutButtonProps) {
  return (
    <Form method="delete" action="/logout">
      <Button type="submit" variant="link" {...props}>
        logout
      </Button>
    </Form>
  )
}
