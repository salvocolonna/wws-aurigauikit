import React from 'react'
import './checkbox.less'

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.id = guid()
  }

  render() {
    const { isChecked, isDisabled, children, onChange, style } = this.props
    return (
      <div
        style={{
          cursor: isDisabled ? 'default' : 'pointer',
          ...style,
        }}
      >
        <input
          type="checkbox"
          id={this.id}
          onChange={e => onChange(e.target.checked)}
          // onClick={e => onChange(e.target.checked)}
          checked={isChecked}
          disabled={isDisabled}
        />
        <label htmlFor={this.id}>{children}</label>
      </div>
    )
  }
}

export default Checkbox
