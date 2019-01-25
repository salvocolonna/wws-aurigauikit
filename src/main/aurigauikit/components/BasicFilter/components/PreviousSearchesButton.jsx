import React from "react"
import { FormattedMessage } from "react-intl"

import { Div } from "aurigauikit/components/Grid"

export default class extends React.Component {
  onClick = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onClick()
  }

  render() {
    const messageId = this.props.label || "basic-filter.previous"
    const className = "btn btn-primary-outline react-basic-filter-buttons-reset"
    return (
      <Div>
        <button
          onClick={this.onClick}
          className={className}
          style={{
            border: 0,
            backgroundColor: "transparent",
            textTransform: "none",
            padding: 0,
            width: 85,
            marginRight: 10
          }}>
          <FormattedMessage id={messageId} />
        </button>
      </Div>
    )
  }
}
