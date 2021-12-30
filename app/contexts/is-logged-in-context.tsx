import * as React from 'react'

export const IsLoggedInContext = React.createContext<boolean | undefined>(
  undefined
)

export function useIsLoggedIn() {
  const authContext = React.useContext(IsLoggedInContext)
  if (authContext === undefined) {
    throw new Error(
      'useIsLoggedIn must be used within a IsLoggedInContext Provider'
    )
  }
  return authContext!
}
