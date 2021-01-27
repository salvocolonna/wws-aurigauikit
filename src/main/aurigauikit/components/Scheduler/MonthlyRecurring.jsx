import React from 'react'
import { Row, Col } from 'antd'
import { FormattedMessage as Msg, injectIntl } from 'react-intl'
import messages from './messages'
import { monthlyModes } from './constants'
import './style.less'

export default injectIntl(({ mode, day, onDayChange, date }) => (
  <>
    <label>
      <Msg {...messages.labels.on} /> <Msg {...messages.labels.day} />
    </label>
    <Row type="flex">
      <Col span={6}>
        <input
          style={{ width: '5em' }}
          type="number"
          disabled={mode !== monthlyModes[1]}
          max={date.endOf('month').format('DD')}
          min="1"
          onChange={e => onDayChange(e.target.value)}
          value={day}
        />
      </Col>
    </Row>
  </>
))
