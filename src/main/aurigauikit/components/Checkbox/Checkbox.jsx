import React from 'react'
import { Checkbox as AntCheckbox } from 'antd'

const Checkbox = ({ isChecked, isDisabled, ...props }) => {
  return <AntCheckbox checked={isChecked} disabled={isDisabled} {...props} />
}

export default Checkbox
