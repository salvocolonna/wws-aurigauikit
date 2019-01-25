import React from "react"

import { Div } from "aurigauikit/components/Grid"

export default class extends React.Component {
  onClick = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onClick()
  }

  render() {
    const className = "btn btn-confirmatory-outline"
    const { disabled } = this.props
    return (
      <Div>
        <button
          onClick={this.onClick}
          style={{ width: 40, padding: 0 }}
          className={className}
          disabled={disabled}>
          <i style={{ margin: 0 }} className="fa fa-save" />
        </button>
      </Div>
    )
  }
}
