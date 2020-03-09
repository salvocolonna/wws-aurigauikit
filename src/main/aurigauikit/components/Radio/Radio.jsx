import React from 'react'
import { Radio as AntRadio } from 'antd'

const Radio = ({ isChecked, isDisabled, ...props }) => {
  return <AntRadio checked={isChecked} disabled={isDisabled} {...props} />
}

export default Radio
