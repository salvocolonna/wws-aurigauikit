import React from 'react'
import Sidebar from './Sidebar'
import SidebarLegacy from './SidebarLegacy'
export * from './SidebarLegacy'

export default props => {
  const legacy = !window.ANT_LAYOUT
  if (legacy) return <SidebarLegacy {...props} />
  return <Sidebar {...props} />
}
