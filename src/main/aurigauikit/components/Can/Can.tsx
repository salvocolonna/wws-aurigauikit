import * as React from 'react'
import { SecurityContext } from './SecurityContext'
type Action = 'create' | 'read' | 'edit' | 'delete'

export interface ProfilePermission {
  profile: string
  exceptions: string[]
  permissions: Permission[]
}

export interface Permission {
  object: string
  actions: Action[]
}

interface CanProps {
  create?: boolean
  read?: boolean
  edit?: boolean
  delete?: boolean
  actions: Action[]
  objects: string[]
  children: React.ReactNode
  [name: string]: any
}

export function isUserAllowed(params: {
  user?: string
  profilePermissions?: ProfilePermission[]
  actions: Action[]
  objects: string[]
}): boolean {
  const { user, profilePermissions, actions, objects } = params
  if (typeof user === 'undefined' || typeof profilePermissions === 'undefined') return false

  const profile = profilePermissions.find(p => p.profile === user)
  if (profile) {
    objects.forEach(obj => {
      const permission = profile.permissions.find(p => p.object === obj)
      if (permission) {
        const allow = actions.every(action => permission.actions.includes(action))
        return allow
      }
    })
  }

  return false
}

/*

<Can delete objects={['order']}>
  <DeleteOrder />
</Can>

<Can actions={['delete']} objects={['order']}>
  <DeleteOrder />
</Can>

*/

function Can(props: CanProps) {
  const { objects } = props
  const { user, profilePermissions } = React.useContext(SecurityContext)

  const actions = React.useMemo(() => {
    const actions = []
    if (props.read) actions.push('read')
    if (props.create) actions.push('create')
    if (props.edit) actions.push('edit')
    if (props.delete) actions.push('delete')

    return Array.from(new Set([...actions, ...props.actions])) as Action[]
  }, [props.actions, props.create, props.read, props.edit, props.delete])

  const isAllowed = React.useMemo<boolean>(
    () => isUserAllowed({ user, profilePermissions, actions, objects }),
    [user, profilePermissions, actions, objects]
  )

  return isAllowed ? props.children : null
}

export default Can
