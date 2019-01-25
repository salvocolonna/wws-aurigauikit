import React from "react"
import { FormattedMessage } from "react-intl"

import { Div } from "aurigauikit/components/Grid"
class ResetButton extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onClick()
  }

  render() {
    const messageId = this.props.label || "basic-filter.undo"
    const className = "btn btn-warning-outline react-basic-filter-buttons-reset"
    return (
      <Div>
        <button onClick={this.onClick} className={className}>
          <FormattedMessage id={messageId} />
        </button>
      </Div>
    )
  }
}

export default ResetButton
