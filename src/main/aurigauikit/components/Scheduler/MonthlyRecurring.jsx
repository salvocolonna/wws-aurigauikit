import React from 'react'
import { Row, Col } from 'aurigauikit/antd'
import Select2 from 'aurigauikit/components/Select2'
import Radio from 'aurigauikit/components/Radio'
import { FormattedMessage as Msg, injectIntl } from 'react-intl'
import messages from './messages'
import { orders, days, monthlyModes } from './constants'
import './style.less'

export default injectIntl(
  ({
    mode,
    onModeChange,
    order,
    onOrderChange,
    day,
    onDayChange,
    weekDay,
    onWeekDayChange,
    date,
    intl,
  }) => (
    <>
      <Row>
        <Col span={24} style={{ marginBottom: 5 }}>
          <label style={{ marginTop: 20 }}>
            <Msg {...messages.labels.when} />
          </label>
        </Col>
      </Row>
      <Row type="flex">
        <Col span={24} style={{ marginBottom: 5 }}>
          <Radio
            isChecked={mode === monthlyModes[0]}
            onChange={() => onModeChange(monthlyModes[0])}
          />
        </Col>
        <Col xs={24} md={12} className="scheduler-col-pr scheduler-col-pb">
          <Select2
            style={{ width: '100%' }}
            value={order}
            disabled={mode !== monthlyModes[0]}
            didSelect={onOrderChange}
            willDisplay={order => intl.formatMessage(messages.orders[order])}
            data={orders}
          />
        </Col>
        <Col xs={24} md={12} className="scheduler-col-pl scheduler-col-pb">
          <Select2
            style={{ width: '100%' }}
            value={weekDay}
            disabled={mode !== monthlyModes[0]}
            didSelect={onWeekDayChange}
            willDisplay={day => intl.formatMessage(messages.days[day])}
            data={days}
          />
        </Col>
      </Row>
      <Row type="flex">
        <Col span={24} style={{ marginBottom: 5 }}>
          <Radio
            style={{ paddingRight: 10 }}
            isChecked={mode === monthlyModes[1]}
            onChange={() => onModeChange(monthlyModes[1])}
          >
            <Msg {...messages.labels.day} />
          </Radio>
        </Col>
        <Col span={6}>
          <input
            style={{ width: '5em', padding: 9 }}
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
  )
)
