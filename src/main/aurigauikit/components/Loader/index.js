import React from 'react'
import { Spin, Icon } from 'antd'
import './style.css'

export default ({
  size = 'default',
  iconType = 'loading-3-quarters',
  fontSize = 20,
  color = '#3498db',
  // legacy props
  style,
  legacy = false,
}) => {
  return legacy ? (
    <div
      className="loader"
      style={{
        float: 'right',
        width: '5px',
        height: '5px',
        border: '10px solid #f3f3f3',
        borderTop: '10px solid #3498db',
        borderRight: '10px solid #3498db',
        borderStyle: 'double',
        borderRadius: '50%',
        ...style,
      }}
    />
  ) : (
    <Spin size={size} indicator={<Icon type={iconType} style={{ fontSize, color }} spin />} />
  )
}
