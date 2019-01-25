import React from "react"
import { FormattedMessage } from "react-intl"

class Address extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.className}>
        <h4 style={{ color: "#2984c5", fontSize: "1.5em", fontWeight: "bold" }}>
          <FormattedMessage id="branch-configuration-page.address-title" />
        </h4>
        {this.props.children}
      </div>
    )
  }
}

export default Address
