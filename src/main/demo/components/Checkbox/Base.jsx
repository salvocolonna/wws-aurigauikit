import React from "react"
import Checkbox from "aurigauikit/components/Checkbox"

export default class extends React.Component {
  state = { firstChecked: false, secondChecked: false }

  changeFirst = () => this.setState(({ firstChecked }) => ({ firstChecked: !firstChecked }))

  changeSecond = () => this.setState(({ secondChecked }) => ({ secondChecked: !secondChecked }))

  render() {
    const { firstChecked, secondChecked } = this.state
    return (
      <div style={{ display: "inline-flex" }}>
        <Checkbox style={{ padding: 10 }} isChecked={firstChecked} onChange={this.changeFirst}>
          First
        </Checkbox>
        <Checkbox style={{ padding: 10 }} isChecked={secondChecked} onChange={this.changeSecond}>
          Second
        </Checkbox>
      </div>
    )
  }
}
