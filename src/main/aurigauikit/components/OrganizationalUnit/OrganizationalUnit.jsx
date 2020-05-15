import React, { useMemo, useRef } from 'react'
import './style.less'
import { Popover } from 'antd'
import OrganizationalUnitSearch from './OrganizationalUnitSearch'

const getData = (data = []) => () => {
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

const OuType = ({ name, ...props }) => {
  const ref = useRef()

  return (
    <div ref={ref}>
      <Popover
        getPopupContainer={() => ref.current}
        content={<OrganizationalUnitSearch {...props} />}
        trigger="click"
      >
        <div className={'OuType'}>
          {props.items.length} {name}
        </div>
      </Popover>
    </div>
  )
}

export default ({ data, onRemove, canRemove }) => {
  const ouTypes = useMemo(getData(data))
  if (ouTypes.length === 0) return null
  return (
    <div className="Ou">
      {ouTypes.map(({ type, items }) => (
        <OuType key={type} name={type} items={items} onRemove={onRemove} canRemove={canRemove} />
      ))}
    </div>
  )
}
