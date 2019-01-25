import React from "react"
import { injectIntl } from "react-intl"
import Popover from "aurigauikit/components/Popover"

@injectIntl
class Tooltip extends React.Component {
  render() {
    const {
      text,
      icon = "fa-question-circle",
      intl,
      onClick,
      position,
      onClose,
      children
    } = this.props
    let title = text
    if (text.intl) title = intl.formatMessage({ id: text.intl.id }, text.intl.values)
    return [
      <i key="tooltip" className={`fa ${icon} tooltip`} title={title} onClick={onClick} />,
      <Popover key="popover" position={position} onClose={onClose}>
        {children}
      </Popover>
    ]
  }
}

export default Tooltip
