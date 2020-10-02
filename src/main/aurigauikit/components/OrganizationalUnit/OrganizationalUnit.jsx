import React, { useMemo } from 'react'
import { Popover } from 'antd'
import Search from './OrganizationalUnitSearch'
import './style.less'
import messages from './messages'
import { injectIntl } from 'react-intl'

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

export default injectIntl(({ data, onRemove, canRemove, intl }) => {
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
            {items.length} {messages.type[type] ? intl.formatMessage(messages.type[type]) : type}
          </div>
        </Popover>
      ))}
    </div>
  )
})
