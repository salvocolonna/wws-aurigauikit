import React from "react"
import { FormattedMessage } from "react-intl"
import InfoLabel from "../InfoLabel"

class BranchConfigurationHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="grid">
          {this.props.datasource.getFirstRow().map(entry => (
            <InfoLabel
              className="col-1-5"
              label={<FormattedMessage id={`${entry.label}`} />}
              key={entry.label}>
              {entry.value}
            </InfoLabel>
          ))}
        </div>
        <div className="grid">
          {this.props.datasource.getSecondRow().map(entry => (
            <InfoLabel
              className="col-1-5"
              label={<FormattedMessage id={`${entry.label}`} />}
              key={entry.label}>
              {entry.value}
            </InfoLabel>
          ))}
        </div>
      </div>
    )
  }
}

export default BranchConfigurationHeader
