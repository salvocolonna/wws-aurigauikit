import * as React from 'react'
import { ProfilePermission } from './Can'

interface AuthorizationContextValue {
  profilePermission?: ProfilePermission
  setProfilePermission: (permissions: ProfilePermission) => void
}

const initialContext: AuthorizationContextValue = {
  profilePermission: undefined,
  setProfilePermission: () => {},
}

const AuthorizationContext = React.createContext(initialContext)

const AuthorizationContextController = ({ children }: { children: React.ReactNode }) => {
  const [profilePermission, setProfilePermission] = React.useState(
    (undefined as unknown) as ProfilePermission
  )

  const value = React.useMemo<AuthorizationContextValue>(
    () => ({ profilePermission, setProfilePermission }),
    [profilePermission]
  )

  return <AuthorizationContext.Provider value={value}>{children}</AuthorizationContext.Provider>
}

const AuthorizationContextProvider = ({
  profilePermission,
  ...props
}: {
  profilePermission: ProfilePermission
}) => {
  const context = React.useMemo(() => ({ profilePermission, setProfilePermission: () => {} }), [
    profilePermission,
  ])
  return <AuthorizationContext.Provider value={context} {...props} />
}

const withAuthorizationContext = (Component: React.FC) => (props: any) => (
  <AuthorizationContext.Consumer>
    {AuthorizationContext => <Component {...props} AuthorizationContext={AuthorizationContext} />}
  </AuthorizationContext.Consumer>
)

export {
  AuthorizationContextController,
  AuthorizationContext,
  withAuthorizationContext,
  AuthorizationContextProvider,
}
