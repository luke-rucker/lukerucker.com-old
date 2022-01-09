import * as React from 'react'

export const IsLukeContext = React.createContext<boolean | undefined>(undefined)

export function useIsLuke() {
  const isLukeContext = React.useContext(IsLukeContext)
  if (isLukeContext === undefined) {
    throw new Error('useIsLuke must be used within a IsLuke Provider')
  }
  return isLukeContext!
}
