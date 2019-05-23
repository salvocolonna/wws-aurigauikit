import React from "react"

export default class extends React.Component {
  static displayName = "ReactTableCaption"

  render() {
    const { children } = this.props
    return (
      <caption style={{ pointerEvents: "none" }}>
        <div>{children}</div>
      </caption>
    )
  }
}
