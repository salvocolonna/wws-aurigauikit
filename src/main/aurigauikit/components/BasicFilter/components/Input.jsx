import React from "react"

class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <input
        className="filter-element"
        style={{ width: "100%" }}
        type={this.props.type}
        data-validation-trigger="input focusout"
        onChange={e => this.props.updateFilter(this.props.filter, e.target.value)}
      />
    )
  }
}

export default Input
