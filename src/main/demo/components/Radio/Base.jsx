import React from "react"
import Radio from "aurigauikit/components/Radio"

export default class extends React.Component {
  state = { checked: "first" }

  change = checked => this.setState({ checked })

  render() {
    const { checked } = this.state
    return (
      <div style={{ display: "inline-flex" }}>
        <Radio
          style={{ padding: 10 }}
          isChecked={checked === "first"}
          onChange={() => this.change("first")}>
          First
        </Radio>
        <Radio
          style={{ padding: 10 }}
          isChecked={checked === "second"}
          onChange={() => this.change("second")}>
          Second
        </Radio>
      </div>
    )
  }
}
