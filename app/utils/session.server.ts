import { createCookieSessionStorage, redirect } from 'remix'
import { z } from 'zod'
import { ensureExistenceOfEnvVar } from './env.server'

const config = {
  adminPassword: ensureExistenceOfEnvVar('ADMIN_PASSWORD', ADMIN_PASSWORD),
  session: {
    secret: ensureExistenceOfEnvVar('SESSION_SECRET', SESSION_SECRET),
    key: 'isLuke',
  },
  loginPath: '/login',
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
    secure: ENVIRONMENT !== 'development',
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

export async function checkIfIsLuke(request: Request): Promise<boolean> {
  const session = await getSession(request)
  return Boolean(session.get(config.session.key))
}

export async function requireLuke(request: Request) {
  const isLuke = await checkIfIsLuke(request)

  if (!isLuke) {
    throw redirect(config.loginPath)
  }
}

export async function redirectIfLuke(request: Request) {
  const isLuke = await checkIfIsLuke(request)

  if (isLuke) {
    throw redirect(config.adminPath)
  }
}

export async function createUserSession() {
  const session = await storage.getSession()
  session.set(config.session.key, true)

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
