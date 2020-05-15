import React, { useMemo } from 'react'
import { Popover } from 'antd'
import Search from './OrganizationalUnitSearch'
import './style.less'

const getData = (data = []) => {
  const types = Array.from(
    data.reduce((types, ou) => {
      if (ou) types.add(ou.type)
      return types
    }, new Set())
  )
  return types.map(type => {
    const items = data.filter(item => item.type === type)
    return { type, items }
  })
}

export default ({ data, onRemove, canRemove }) => {
  const ouTypes = useMemo(() => getData(data), [data])
  if (ouTypes.length === 0) return null
  return (
    <div className="Ou">
      {ouTypes.map(({ type, items }) => (
        <Popover
          key={type}
          trigger="click"
          getPopupContainer={e => e.parentElement}
          content={<Search items={items} onRemove={onRemove} canRemove={canRemove} />}
        >
          <div className="OuType">
            {items.length} {type}
          </div>
        </Popover>
      ))}
    </div>
  )
}
