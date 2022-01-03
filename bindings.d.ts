declare global {
  const ENVIRONMENT: 'development' | 'staging' | 'production'
  const ADMIN_PASSWORD: string
  const SESSION_SECRET: string

  const SITE: KVNamespace
}

export {}
