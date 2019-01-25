import React from "react"
import Switch from "aurigauikit/components/Switch"

export default class extends React.Component {
  state = { checked: false }

  changed = () => this.setState(({ checked }) => ({ checked: !checked }))

  render() {
    const { checked } = this.state
    return <Switch checked={checked} onChange={this.changed} />
  }
}
