import React from 'react'
import Tooltip from './TooltipAnt'
import TooltipLegacy from './Tooltip'

export default ({ legacy, ...props }) =>
  legacy ? <TooltipLegacy {...props} /> : <Tooltip {...props} />
