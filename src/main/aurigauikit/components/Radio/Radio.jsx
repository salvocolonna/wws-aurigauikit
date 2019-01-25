import React from "react"
import "./radio.less"

class Radio extends React.Component {
  constructor(props) {
    super(props)
    this.id = guid()
  }

  render() {
    const { isChecked, isDisabled, children, onChange, style } = this.props
    const divStyle = {
      cursor: isDisabled ? "default" : "pointer",
      pointerEvents: isDisabled ? "none" : "all",
      ...style
    }
    return (
      <div style={divStyle} onClick={() => onChange(!isChecked)}>
        <input
          type="radio"
          id={this.id}
          style={{ pointerEvents: "none" }}
          onChange={e => e.preventDefaults()}
          checked={isChecked}
          disabled={isDisabled}
        />
        <label htmlFor={this.id} style={{ pointerEvents: "none" }}>
          {children}
        </label>
      </div>
    )
  }
}

export default Radio
