import * as React from 'react'
import { SecurityContext } from './SecurityContext'
type Action = 'create' | 'read' | 'edit' | 'delete'

export interface Permission {
  object: string
  actions: Action[]
  exceptions: string[]
}

interface CanProps {
  create: boolean
  read: boolean
  edit: boolean
  delete: boolean
  actions: Action[]
  objects: string[]
  children: React.ReactNode
}

function Can(props: CanProps) {
  const securityContext = React.useContext(SecurityContext)

  function checkPermissions() {
    return Math.random() > 0.5
  }

  const canShow = React.useMemo<boolean>(() => checkPermissions(), [])

  return canShow ? props.children : null
}

export default Can
