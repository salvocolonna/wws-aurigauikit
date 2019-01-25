import React from "react"
import { FormattedMessage } from "react-intl"
import { Div } from "aurigauikit/components/Grid"
class ApplyButton extends React.Component {
  onClick = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onClick()
  }

  render() {
    const { label: messageId = "basic-filter.restore" } = this.props
    const className = "btn btn-confirmatory react-basic-filter-buttons-apply"
    return (
      <Div style={{ float: "right" }}>
        <button disabled={this.props.disabled} className={className} onClick={this.onClick}>
          <FormattedMessage id={messageId} />
        </button>
      </Div>
    )
  }
}

export default ApplyButton
