import React from "react"
import {Radio as AntRadio} from "antd"

const Radio = ({ isChecked, isDisabled, children, onChange,...props }) =>{
return <AntRadio checked={isChecked} disabled={isDisabled} onChange={onChange} {...props} />
}

export default Radio
