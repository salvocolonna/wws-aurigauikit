import React from "react"
import { Grid, Div } from "aurigauikit/components/Grid"
import Checkbox from "aurigauikit/components/Checkbox"
import { FormattedMessage as Msg, injectIntl } from "react-intl"
import messages from "./messages"

import { days } from "./constants"

export default injectIntl(({ selectedDays, onChange, intl }) => (
  <Grid style={{ marginTop: 20, overflow: "initial" }}>
    <Div col="1-8">
      <label style={{ marginBottom: 8 }}>
        <Msg {...messages.labels.on} />
      </label>
      <Checkbox isChecked={selectedDays.includes(days[0])} onChange={() => onChange(days[0])}>
        <Msg {...messages.days.MONDAY} />
      </Checkbox>
    </Div>
    <Div col="1-8" style={{ marginTop: 20 }}>
      <Checkbox isChecked={selectedDays.includes(days[1])} onChange={() => onChange(days[1])}>
        <Msg {...messages.days.TUESDAY} />
      </Checkbox>
    </Div>
    <Div col="1-8" style={{ marginTop: 20 }}>
      <Checkbox isChecked={selectedDays.includes(days[2])} onChange={() => onChange(days[2])}>
        <Msg {...messages.days.WEDNESDAY} />
      </Checkbox>
    </Div>
    <Div col="1-8" style={{ marginTop: 20 }}>
      <Checkbox isChecked={selectedDays.includes(days[3])} onChange={() => onChange(days[3])}>
        <Msg {...messages.days.THURSDAY} />
      </Checkbox>
    </Div>
    <Div col="1-8" style={{ marginTop: 20 }}>
      <Checkbox isChecked={selectedDays.includes(days[4])} onChange={() => onChange(days[4])}>
        <Msg {...messages.days.FRIDAY} />
      </Checkbox>
    </Div>
    <Div col="1-8" style={{ marginTop: 20 }}>
      <Checkbox isChecked={selectedDays.includes(days[5])} onChange={() => onChange(days[5])}>
        <Msg {...messages.days.SATURDAY} />
      </Checkbox>
    </Div>
    <Div col="1-8" style={{ marginTop: 20 }}>
      <Checkbox isChecked={selectedDays.includes(days[6])} onChange={() => onChange(days[6])}>
        <Msg {...messages.days.SUNDAY} />
      </Checkbox>
    </Div>
    {selectedDays.length === 0 && (
      <Div col="1-8" style={{ marginTop: 20 }}>
        <input
          style={{ display: "none" }}
          required
          data-validation-error-message={intl.formatMessage(messages.validations.atLeastADay)}
        />
      </Div>
    )}
  </Grid>
))
