export function ensureExistenceOfEnvVar(key: string, value?: string) {
  if (!value) {
    throw new Error(`${key} must be set in the env`)
  }

  return value
}
