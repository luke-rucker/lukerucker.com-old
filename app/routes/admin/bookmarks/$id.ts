import { ActionFunction, redirect } from 'remix'
import { badRequest } from 'remix-utils'
import { deleteBookmarkById } from '~/db/bookmarks.server'

export const action: ActionFunction = async ({ params }) => {
  if (!params.id) {
    throw badRequest({ error: 'Expected an id.' })
  }

  await deleteBookmarkById(params.id)

  return redirect('/admin/bookmarks')
}
