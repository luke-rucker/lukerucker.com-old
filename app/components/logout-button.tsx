import { Form } from 'remix'

export function LogoutButton() {
  return (
    <Form method="delete" action="/logout">
      <button type="submit" className="link">
        logout
      </button>
    </Form>
  )
}
