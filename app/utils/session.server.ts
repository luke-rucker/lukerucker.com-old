import { createCookieSessionStorage, redirect } from 'remix'
import { z } from 'zod'
import { ensureExistenceOfEnvVar } from './env.server'

const config = {
  adminPassword: ensureExistenceOfEnvVar('ADMIN_PASSWORD', ADMIN_PASSWORD),
  session: {
    secret: ensureExistenceOfEnvVar('SESSION_SECRET', SESSION_SECRET),
    key: 'isLoggedIn',
  },
  loginPath: '/admin/login',
  adminPath: '/admin',
}

export const loginSchema = z.object({
  password: z.string().nonempty({ message: 'A password is required.' }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export async function login({ password }: LoginSchema) {
  // lol
  return password === config.adminPassword
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'keysToTheKingdom',
    secure: true,
    secrets: [config.session.secret],
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function getSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function requireLoggedIn(request: Request) {
  const session = await getSession(request)
  const isLoggedIn = session.get(config.session.key)

  if (!isLoggedIn) {
    throw redirect(config.loginPath)
  }
}

export async function createUserSession() {
  const session = await storage.getSession()
  session.set('loggedIn', true)

  return redirect(config.adminPath, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export async function logout(request: Request) {
  const session = await getSession(request)

  return redirect(config.loginPath, {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}
