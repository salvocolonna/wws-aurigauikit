import React from 'react'
import { Spin, Icon } from 'antd'
import './style.less'

export default ({
  size = 'default',
  iconType = 'loading-3-quarters',
  fontSize = 20,
  // legacy props
  style,
  legacy = false,
}) => {
  return legacy ? (
    <div className="loader" style={style} />
  ) : (
    <Spin size={size} indicator={<Icon type={iconType} style={{ fontSize }} spin />} />
  )
}
