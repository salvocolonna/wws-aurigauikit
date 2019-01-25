import React from "react"
import { Grid, Div } from "aurigauikit/components/Grid"
import Select2 from "aurigauikit/components/Select2"
import Radio from "aurigauikit/components/Radio"
import { FormattedMessage as Msg, injectIntl } from "react-intl"
import messages from "./messages"

import { orders, days, months, yearlyModes } from "./constants"

export default injectIntl(
  ({
    day,
    weekDay,
    order,
    month,
    orderMonth,
    mode,
    onDayChange,
    onWeekDayChange,
    onOrderChange,
    onMonthChange,
    onOrderMonthChange,
    onModeChange,
    intl
  }) => (
    <div>
      <label style={{ marginTop: 6 }}>
        <Msg {...messages.labels.on} />
      </label>
      <Grid style={{ overflow: "initial" }}>
        <Div col="1-2" style={{ marginTop: 6 }}>
          <Radio
            isChecked={mode === yearlyModes[0]}
            onChange={() => onModeChange(yearlyModes[0])}
          />
          <Grid style={{ paddingTop: 5 }}>
            <Div col="1-3">
              <Select2
                style={{ width: "100%" }}
                value={order}
                willDisplay={order => intl.formatMessage(messages.orders[order])}
                didSelect={onOrderChange}
                data={orders}
              />
            </Div>
            <Div col="1-3">
              <Select2
                style={{ width: "100%" }}
                value={weekDay}
                didSelect={onWeekDayChange}
                willDisplay={day => intl.formatMessage(messages.days[day])}
                data={days}
              />
            </Div>
            <Div col="1-3">
              <Select2
                style={{ width: "100%" }}
                value={orderMonth}
                didSelect={onOrderMonthChange}
                willDisplay={month => intl.formatMessage(messages.months[month])}
                data={months}
              />
            </Div>
          </Grid>
        </Div>
        <Div col="1-2" style={{ marginTop: 6 }}>
          <Radio
            style={{ paddingRight: 10 }}
            isChecked={mode === yearlyModes[1]}
            onChange={() => onModeChange(yearlyModes[1])}
          />
          <Grid style={{ paddingTop: 5 }}>
            <Div col="1-2">
              <Select2
                style={{ width: "100%" }}
                value={month}
                didSelect={onMonthChange}
                willDisplay={month => intl.formatMessage(messages.months[month])}
                data={months}
              />
            </Div>
            <Div col="1-2">
              <input
                style={{ width: "5em", padding: 9.5 }}
                type="number"
                onChange={e => onDayChange(e.target.value)}
                value={day}
              />
            </Div>
          </Grid>
        </Div>
      </Grid>
    </div>
  )
)
