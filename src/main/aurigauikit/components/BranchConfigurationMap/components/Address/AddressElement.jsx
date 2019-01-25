import React from "react"
import { FormattedMessage } from "react-intl"

class AddressElement extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-1-1" style={{ marginBottom: "5px" }}>
        <label className="label label-title" style={{ textAlign: "center" }}>
          <FormattedMessage id={this.props.text} />
        </label>
        {React.Children.only(this.props.children)}
      </div>
    )
  }
}

export default AddressElement
