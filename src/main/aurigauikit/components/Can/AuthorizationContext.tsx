import * as React from 'react'
import { ProfilePermission } from './Can'

interface AuthorizationContext {
  profilePermission?: ProfilePermission
  setProfilePermission: (permissions: ProfilePermission) => void
}

const initialContext: AuthorizationContext = {
  profilePermission: undefined,
  setProfilePermission: () => {},
}

const AuthorizationContext = React.createContext(initialContext)

const AuthorizationContextController = ({ children }: { children: React.ReactNode }) => {
  const [profilePermission, setProfilePermission] = React.useState(
    (undefined as unknown) as ProfilePermission
  )

  const value = React.useMemo<AuthorizationContext>(
    () => ({
      profilePermission,
      setProfilePermission,
    }),
    [profilePermission]
  )
  return <AuthorizationContext.Provider value={value}>{children}</AuthorizationContext.Provider>
}

const withAuthorizationContext = (Component: React.FC) => (props: any) => (
  <AuthorizationContext.Consumer>
    {AuthorizationContext => <Component {...props} AuthorizationContext={AuthorizationContext} />}
  </AuthorizationContext.Consumer>
)

export { AuthorizationContextController, AuthorizationContext, withAuthorizationContext }
