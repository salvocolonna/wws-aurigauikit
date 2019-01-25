import React from "react"
import moment from "moment"
import DatePicker from "aurigauikit/components/DatePicker"
import Show from "./components/Show"

export default class extends React.Component {
  state = { date: moment() }

  onChange = date => this.setState({ date })

  render() {
    const { date } = this.state
    return (
      <div>
        <Show date={date} />
        <DatePicker isClearable selected={date} onChange={this.onChange} />
      </div>
    )
  }
}
