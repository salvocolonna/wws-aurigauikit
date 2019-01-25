import React from "react"
import { Grid, Div } from "aurigauikit/components/Grid"
import Select2 from "aurigauikit/components/Select2"
import Radio from "aurigauikit/components/Radio"
import { FormattedMessage as Msg, injectIntl } from "react-intl"
import messages from "./messages"

import { orders, days, monthlyModes } from "./constants"

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
    intl
  }) => (
    <div>
      <label style={{ marginTop: 20 }}>
        <Msg {...messages.labels.on} />
      </label>
      <Grid style={{ overflow: "initial" }}>
        <Div col="1-2" style={{ marginTop: 6 }}>
          <Radio
            isChecked={mode === monthlyModes[0]}
            onChange={() => onModeChange(monthlyModes[0])}
          />
          <Grid style={{ paddingTop: 5 }}>
            <Div col="1-2">
              <Select2
                style={{ width: "100%" }}
                value={order}
                didSelect={onOrderChange}
                willDisplay={order => intl.formatMessage(messages.orders[order])}
                data={orders}
              />
            </Div>
            <Div col="1-2">
              <Select2
                style={{ width: "100%" }}
                value={weekDay}
                didSelect={onWeekDayChange}
                willDisplay={day => intl.formatMessage(messages.days[day])}
                data={days}
              />
            </Div>
          </Grid>
        </Div>
        <Div col="1-2" style={{ marginTop: 6 }}>
          <div style={{ marginBottom: 10 }}>
            <Radio
              style={{ paddingRight: 10 }}
              isChecked={mode === monthlyModes[1]}
              onChange={() => onModeChange(monthlyModes[1])}>
              <Msg {...messages.labels.day} />
            </Radio>
          </div>
          <div style={{ width: "calc(100% - 7em)" }}>
            <input
              style={{ width: "5em", padding: 9 }}
              type="number"
              max="31"
              min="1"
              onChange={e => onDayChange(e.target.value)}
              value={day}
            />
          </div>
        </Div>
      </Grid>
    </div>
  )
)
