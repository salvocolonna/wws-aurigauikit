import * as React from 'react'
import { ProfilePermission } from './Can'

interface SecurityContext {
  profilePermission?: ProfilePermission
  setProfilePermission: (permissions: ProfilePermission) => void
}

const initialContext: SecurityContext = {
  profilePermission: undefined,
  setProfilePermission: () => {},
}

const SecurityContext = React.createContext(initialContext)

const SecurityContextController = ({ children }: { children: React.ReactNode }) => {
  const [profilePermission, setProfilePermission] = React.useState(
    (undefined as unknown) as ProfilePermission
  )

  const value = React.useMemo<SecurityContext>(
    () => ({
      profilePermission,
      setProfilePermission,
    }),
    [profilePermission]
  )
  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>
}

const withSecurityContext = (Component: React.FC) => (props: any) => (
  <SecurityContext.Consumer>
    {securityContext => <Component {...props} securityContext={securityContext} />}
  </SecurityContext.Consumer>
)

export { SecurityContextController, SecurityContext, withSecurityContext }
