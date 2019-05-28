import * as React from 'react'
import { Permission } from './Can'

interface SecurityContext {
  user?: string
  setUser: (user: string) => void
  permissions?: Permission[]
  setPermissions: (permissions: Permission[]) => void
}

const initialContext = {
  user: undefined,
  setUser: () => {},
  permissions: undefined,
  setPermissions: () => {},
} as SecurityContext

const SecurityContext = React.createContext(initialContext)

const SecurityContextController = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState((undefined as unknown) as string)
  const [permissions, setPermissions] = React.useState((undefined as unknown) as Permission[])

  const value = React.useMemo<SecurityContext>(
    () => ({
      user,
      setUser,
      permissions,
      setPermissions,
    }),
    [user, permissions]
  )
  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>
}

export { SecurityContextController, SecurityContext }
