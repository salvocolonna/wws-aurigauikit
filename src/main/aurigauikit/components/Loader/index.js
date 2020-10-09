import React from 'react'
import { Spin } from 'antd'
import './style.less'
import { Loading3QuartersOutlined } from '@ant-design/icons'

export default ({
  size = 'default',
  fontSize = 20,
  // legacy props
  style,
  legacy = false,
}) => {
  return legacy ? (
    <div className="loader" style={style} />
  ) : (
    <Spin size={size} indicator={<Loading3QuartersOutlined style={{ fontSize }} spin />} />
  )
}
