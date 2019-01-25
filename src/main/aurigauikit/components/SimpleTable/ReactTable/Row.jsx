import React from "react"

export default class extends React.Component {
  static displayName = "ReactTableRow"
  render() {
    const { data } = this.props
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { data })
    )
    return <tr>{children}</tr>
  }
}
