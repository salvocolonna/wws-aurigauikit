import React from "react"
import DatePicker from "aurigauikit/components/DatePicker"
import Show from "./components/Show"

export default class extends React.Component {
  state = { date: null }

  onChange = date => this.setState({ date })

  render() {
    const { date } = this.state
    return (
      <div>
        <Show date={date} />
        <DatePicker selected={date} onChange={this.onChange} />
      </div>
    )
  }
}
