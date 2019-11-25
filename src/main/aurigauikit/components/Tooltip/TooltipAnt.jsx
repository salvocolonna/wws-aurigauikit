import React from 'react'
import { injectIntl } from 'react-intl'
import { Tooltip as AntTooltip } from 'antd'

function Tooltip({ text, icon = 'fa-question-circle', intl, ...props }) {
  const title =
    text && text.intl ? intl.formatMessage({ id: text.intl.id }, text.intl.values) : text
  return (
    <AntTooltip
      placement={'right'}
      title={title}
      trigger="click"
      onClick={e => e.stopPropagation()}
      {...props}
    >
      <i className={'tooltip fa ' + icon} />
    </AntTooltip>
  )
}

export default injectIntl(Tooltip)
