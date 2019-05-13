import React from "react"
import isFunction from "lodash/isFunction"

export default class extends React.Component {
  static displayName = "ReactTableColumn"
  render() {
    const { data, children, style, className, editable, onClick } = this.props
    const classes = [editable && "editable editable-left", className].filter(Boolean).join(" ")
    return (
      <td style={style} className={classes} onClick={onClick}>
        {isFunction(children) ? children(data) : children}
      </td>
    )
  }
}
