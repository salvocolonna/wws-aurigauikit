import React from "react"
import { Grid, Div } from "aurigauikit/components/Grid"
import DatePicker from "aurigauikit/components/DatePicker"
import Select2 from "aurigauikit/components/Select2"
import { FormattedMessage as Msg, injectIntl } from "react-intl"
import messages from "./messages"
import moment from "moment"
import { recurrings, recurringMap } from "./constants"

const today = date => {
  return moment().isSame(moment(date), "day")
}

const getMinTime = date => {
  if (date && today(date)) {
    return moment()
      .hours(moment().hour())
      .minutes(moment().minutes())
  }
}

const getMaxTime = date => {
  if (date && today(date)) {
    return moment()
      .hours(23)
      .minutes(30)
  }
}

export default injectIntl(
  ({
    repeatEvery,
    onRepeatEveryChange,
    date,
    onDateChange,
    recurring,
    onRecurringChange,
    existing,
    intl
  }) => (
    <Grid style={{ overflow: "initial" }}>
      <Div col="1-2">
        <label>
          <Msg {...messages.labels.date} />
        </label>
        {existing && (
          <DatePicker selected={date && moment(date)} dateFormat="LLL" disabled required />
        )}
        {!existing && (
          <DatePicker
            selected={date && moment(date)}
            onChange={onDateChange}
            showTimeSelect
            dateFormat="LLL"
            timeFormat="LT"
            minDate={moment()}
            minTime={getMinTime(date)}
            maxTime={getMaxTime(date)}
            required
          />
        )}
      </Div>
      <Div col={recurring !== "NEVER" && recurring !== "WEEKLY" ? "1-4" : "1-2"}>
        <label>
          <Msg {...messages.labels.recurring} />
        </label>
        <Select2
          style={{ width: "100%" }}
          didSelect={onRecurringChange}
          willDisplay={recurring => intl.formatMessage(messages.recurrings[recurring])}
          value={recurring}
          data={recurrings}
        />
      </Div>
      {recurring !== "NEVER" &&
        recurring !== "WEEKLY" && (
          <Div col="1-4">
            <label>
              <Msg {...messages.labels.repeatEvery} />
            </label>
            <input
              style={{ width: "5em", padding: 10 }}
              type="number"
              min="1"
              onChange={e => onRepeatEveryChange(e.target.value)}
              value={repeatEvery}
            />
            <label style={{ display: "inline-block", paddingLeft: 10 }}>
              <Msg {...messages.labels[recurringMap[recurring]]} values={{ value: repeatEvery }} />
            </label>
          </Div>
        )}
    </Grid>
  )
)
