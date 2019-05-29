import * as React from 'react'
import { ProfilePermission } from './Can'

interface SecurityContext {
  user?: string
  setUser: (user: string) => void
  profilePermissions?: ProfilePermission[]
  setProfilePermissions: (permissions: ProfilePermission[]) => void
}

const initialContext: SecurityContext = {
  user: undefined,
  setUser: () => {},
  profilePermissions: undefined,
  setProfilePermissions: () => {},
}

const SecurityContext = React.createContext(initialContext)

const SecurityContextController = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState((undefined as unknown) as string)
  const [profilePermissions, setProfilePermissions] = React.useState(
    (undefined as unknown) as ProfilePermission[]
  )

  const value = React.useMemo<SecurityContext>(
    () => ({
      user,
      setUser,
      profilePermissions,
      setProfilePermissions,
    }),
    [user, profilePermissions]
  )
  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>
}

export { SecurityContextController, SecurityContext }
