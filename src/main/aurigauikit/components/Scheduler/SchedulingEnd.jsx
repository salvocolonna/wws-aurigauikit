import React from 'react'
import { Grid, Div } from 'aurigauikit/components/Grid'
import DatePicker from 'aurigauikit/components/DatePicker'
import Radio from 'aurigauikit/components/Radio'
import { FormattedMessage as Msg, injectIntl } from 'react-intl'
import messages from './messages'
import moment from 'moment'
import { endModes } from './constants'

const sameDay = (from, to) => moment(to).isSame(moment(from), 'day')

const getMinTime = (from, to) => {
  if (from) {
    if (to && !sameDay(from, to) && from > to) return moment(-1)
    if (!to || sameDay(from, to)) {
      return moment(from)
        .hours(from.hour())
        .minutes(from.minutes() + 30)
    }
  }
}

const getMaxTime = (from, to) => {
  if (from) {
    if (to && !sameDay(from, to) && from > to) return moment(-1)
    if (!to || sameDay(from, to)) {
      return moment(from)
        .hours(23)
        .minutes(30)
    }
  }
}

let last = null

const buggyRemoveValidationMessagesKey = date => {
  let value = moment(date)
    .dayOfYear(0)
    .month(0)
    .year(0)
    .second(0)
    .millisecond(0)
    .valueOf()
  if (!last || !date) value = 'INIT'
  last = date
  return value
}

const getMinDate = date => {
  if (date) {
    if (date.minute() >= 30 && date.hour() >= 23)
      return moment(date)
        .dayOfYear(moment(date).dayOfYear() + 1)
        .minute(0)
        .hour(0)
    return moment(date)
  }
  return moment(-1)
}

export default injectIntl(
  ({
    endDate,
    onEndDateChange,
    occurrenciesEnd,
    onOccurrenciesEndChange,
    endMode,
    onEndModeChange,
    date,
    intl,
  }) => (
    <div>
      <label style={{ marginTop: 25 }}>
        <Msg {...messages.labels.end} />
      </label>
      <Grid style={{ overflow: 'initial' }}>
        <Div col="1-2" style={{ marginTop: 6 }}>
          <Radio
            style={{ paddingRight: 10 }}
            isChecked={endMode === endModes[0]}
            onChange={() => onEndModeChange(endModes[0])}
          >
            <Msg {...messages.labels.on} />
          </Radio>
          <div style={{ paddingTop: 5 }} key={buggyRemoveValidationMessagesKey(endDate)}>
            <DatePicker
              selected={endDate && moment(endDate)}
              disabled={endMode !== endModes[0]}
              required={endMode === endModes[0]}
              minDate={getMinDate(date)}
              minTime={getMinTime(date, endDate)}
              maxTime={getMaxTime(date, endDate)}
              onChange={onEndDateChange}
              customInput={
                endDate && (
                  <input
                    min={date ? moment(date).valueOf() + 30 : 0}
                    data-validation-error-message={intl.formatMessage(
                      messages.validations.endGreater
                    )}
                    data-validation-value={endDate && moment(endDate).valueOf()}
                  />
                )
              }
              showTimeSelect
              dateFormat="LLL"
              timeFormat="LT"
            />
          </div>
        </Div>
        <Div col="1-4" style={{ marginTop: 6 }}>
          <Radio
            style={{ paddingRight: 10 }}
            isChecked={endMode === endModes[1]}
            onChange={() => onEndModeChange(endModes[1])}
          >
            <Msg {...messages.labels.after} />
          </Radio>
          <div style={{ paddingTop: 5 }}>
            <input
              style={{ maxWidth: '5em', marginRight: 10, padding: 9.5 }}
              disabled={endMode !== endModes[1]}
              type="number"
              min="1"
              onChange={e => onOccurrenciesEndChange(e.target.value)}
              value={occurrenciesEnd}
            />
            <label style={{ display: 'inline-block' }}>
              <Msg {...messages.labels.OCCURRENCIES} values={{ occurrencies: occurrenciesEnd }} />
            </label>
          </div>
        </Div>
        <Div col="1-4" style={{ marginTop: 6 }}>
          <Radio isChecked={endMode === endModes[2]} onChange={() => onEndModeChange(endModes[2])}>
            <Msg {...messages.labels.never} />
          </Radio>
        </Div>
      </Grid>
    </div>
  )
)
