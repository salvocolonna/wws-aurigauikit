import * as React from 'react'
import { ProfilePermission } from './Can'

interface SecurityContext {
  user?: string
  setUser: (user: string) => void
  profilePermission?: ProfilePermission
  setProfilePermission: (permissions: ProfilePermission) => void
}

const initialContext: SecurityContext = {
  user: undefined,
  setUser: () => {},
  profilePermission: undefined,
  setProfilePermission: () => {},
}

const SecurityContext = React.createContext(initialContext)

const SecurityContextController = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState((undefined as unknown) as string)
  const [profilePermission, setProfilePermission] = React.useState(
    (undefined as unknown) as ProfilePermission
  )

  const value = React.useMemo<SecurityContext>(
    () => ({
      user,
      setUser,
      profilePermission,
      setProfilePermission,
    }),
    [user, profilePermission]
  )
  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>
}

export { SecurityContextController, SecurityContext }
