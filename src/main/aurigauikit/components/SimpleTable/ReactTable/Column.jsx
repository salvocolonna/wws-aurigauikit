import React from "react"

export default class extends React.Component {
  static displayName = "ReactTableColumn"
  render() {
    const { data, children } = this.props
    return <td>{children(data)}</td>
  }
}
