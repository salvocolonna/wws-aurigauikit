import React from 'react'
import { FormattedMessage } from 'react-intl'

class Address extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.className}>
        <h4 className="branch-configuration-timeslots-title">
          <FormattedMessage id="branch-configuration-page.address-title" />
        </h4>
        {this.props.children}
      </div>
    )
  }
}

export default Address
