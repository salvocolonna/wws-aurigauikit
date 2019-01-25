import React from "react"

class Foot extends React.Component {
  constructor(props) {
    super(props)
  }

  static getValue(footer) {
    let value = footer
    if (typeof value === "object") value = footer.content
    return value
  }

  static getStyle(footer) {
    if (typeof footer === "string") return {}
    return footer.cssStyle
  }

  static getClass(footer) {
    if (typeof footer === "string") return ""
    return footer.cssClass
  }

  render() {
    const last = this.props.index + this.props.pageSize
    let rows = this.props.data
    if (this.props.sliceData) rows = this.props.data.slice(this.props.index, last)

    let selectable = false

    rows.forEach(row => {
      if (this.props.canSelect(row)) selectable = true
    })
    return (
      <tfoot>
        <tr>
          {this.props.selectable && selectable && <td />}
          {this.props.footers.map((footer, index) => (
            <td key={index} className={" " + Foot.getClass(footer)} style={Foot.getStyle(footer)}>
              {Foot.getValue(footer)}
            </td>
          ))}
          {(this.props.menu.items.length > 0 || this.props.loading) && <td />}
        </tr>
      </tfoot>
    )
  }
}

export default Foot
