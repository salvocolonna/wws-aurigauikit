import React, { useEffect } from 'react'
import Topbar from './TopbarRefactor'
import TopbarLegacy from './TopbarLegacy'

export default props => {
  const legacy = !window.ANT_LAYOUT

  useEffect(() => {
    document.body.style.fontFamily = window.ANT_LAYOUT
      ? '"Noto Sans",arial,sans-serif'
      : '"Open Sans",arial,sans-serif'
  }, [])

  if (legacy) return <TopbarLegacy {...props} />
  return <Topbar {...props} />
}
