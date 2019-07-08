import * as React from 'react'
import { SecurityContext } from './SecurityContext'
type ActionType = 'create' | 'read' | 'edit' | 'delete'

interface Action {
  action: ActionType
  level: number
}

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
  actions: ActionType[]
  objects: string[]
  exception?: string
  children: React.ReactNode
  [name: string]: any
}

export function isUserAllowed(params: {
  profilePermission?: ProfilePermission
  actions?: ActionType[]
  objects?: string[]
  exception?: string
}): boolean {
  const { profilePermission, actions, objects, exception } = params
  if (typeof profilePermission === 'undefined') return false

  let validPermissions = true
  if (objects && actions) {
    validPermissions = objects.every(obj => {
      const permission = profilePermission.permissions.find(p => p.object === obj)
      if (permission) {
        const allow = actions.every(action =>
          permission.actions.find(pAction => pAction.action === action)
        )
        return allow
      }
    })
  } else {
    validPermissions = false
  }

  let validExceptions = true
  if (exception && profilePermission.exceptions) {
    validExceptions = profilePermission.exceptions.includes(exception)
  } else {
    validExceptions = false
  }

  return validExceptions || validPermissions
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
  const { objects, exception } = props
  const { profilePermission } = React.useContext(SecurityContext)

  const actions = React.useMemo(() => {
    const actions = []
    if (props.read) actions.push('read')
    if (props.create) actions.push('create')
    if (props.edit) actions.push('edit')
    if (props.delete) actions.push('delete')

    return Array.from(new Set([...actions, ...props.actions])) as ActionType[]
  }, [props.actions, props.create, props.read, props.edit, props.delete])

  const isAllowed = React.useMemo<boolean>(
    () => isUserAllowed({ profilePermission, actions, objects, exception }),
    [profilePermission, actions, objects, exception]
  )

  return isAllowed ? props.children : null
}

export default Can
