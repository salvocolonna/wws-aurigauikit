import React from "react"
import { FormattedMessage } from "react-intl"
import { Div } from "aurigauikit/components/Grid"
class ApplyButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const messageId = this.props.label || "basic-filter.apply"
    const className = "btn btn-primary-outline react-basic-filter-buttons-apply"
    return (
      <Div style={{ float: "right" }}>
        <button disabled={this.props.disabled} className={className}>
          <FormattedMessage id={messageId} />
        </button>
      </Div>
    )
  }
}

export default ApplyButton
