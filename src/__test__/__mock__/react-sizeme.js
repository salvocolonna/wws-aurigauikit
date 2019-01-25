import React from 'react'
export default () => Component => props => (
  <Component {...props} size={{ width: 0, height: 0 }} />
)