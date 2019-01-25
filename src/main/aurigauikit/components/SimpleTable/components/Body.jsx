import React from "react"
import Checkbox from "../../Checkbox"
import { FormattedMessage } from "react-intl"

import isFunction from "lodash/isFunction"

class Body extends React.Component {
  constructor(props) {
    super(props)
    this.menuRef = React.createRef()
  }

  onMenuItemClick(event, rowIndex) {
    event.preventDefault()
    event.stopPropagation()
    const rect = event.target.getBoundingClientRect()
    const left = rect.left
    const top = rect.top + document.getElementById("content-dynamic").scrollTop
    this.props.onMenuItemClick(rowIndex, { top: top, left: left }, event.target)
  }

  isEditable(row, column) {
    if (!this.props.editable) return false
    return this.props.shouldEditCell({ settings: { data: this.props.data } }, row, column)
  }

  getCellEditorTitle(column) {
    if (!this.props.editorTitleForColumn) return "Edit"
    return this.props.editorTitleForColumn(this, column)
  }

  onEditCellClicked(rowIndex, colIndex, row, column, event) {
    if (this.props.editable && this.isEditable(rowIndex, colIndex)) {
      const rect = event.target.getBoundingClientRect()
      this.props.onEditCellClicked({
        title: this.getCellEditorTitle(colIndex),
        value: this.props.cellValueForEditor(
          { settings: { data: this.props.data } },
          rowIndex,
          colIndex,
          column
        ),
        rowIndex: rowIndex,
        colIndex: colIndex,
        position: {
          top: rect.top + document.getElementById("content-dynamic").scrollTop,
          left: rect.left
        }
      })
    }
  }

  static getValue(row, column) {
    let field = column
    if (typeof field === "object") {
      field = column.content
      if (isFunction(field)) return field(row)
    }
    return row[field]
  }

  static getStyle(column) {
    if (typeof column === "string") return {}
    return column.cssStyle
  }

  static getClass(column) {
    if (typeof column === "string") return ""
    return column.cssClass
  }
  getLoadingOrEmptyMessage() {
    let toView
    if (this.props.loading) {
      toView = this.props.loadingState || "simple-table.loading-state"
    } else {
      toView = this.props.emptyState || "simple-table.empty-state"
    }
    if (typeof toView === "string") {
      return <FormattedMessage id={toView} />
    } else {
      return toView
    }
  }

  canSelect() {
    const rows = this.getRows()
    return this.props.canSelect(rows.reduce((a, b) => (this.props.canSelect(a) ? a : b)))
  }

  isSelectable() {
    return this.props.selectable && this.canSelect()
  }

  isRowCheckDisabled(row) {
    return (
      this.props.defaultSelection.find(e1 => this.props.dataComparator(e1, row)) !== undefined ||
      !this.props.canSelect(row)
    )
  }

  isRowChecked(row) {
    return this.props.selectedRows.find(e1 => this.props.dataComparator(e1, row)) !== undefined
  }

  getRows() {
    const last = this.props.index + this.props.pageSize
    return this.props.sliceData ? this.props.data.slice(this.props.index, last) : this.props.data
  }

  onRowClick = (e, rowIndex) => {
    if (e.target !== this.menuRef.current) this.props.onRowClick && this.props.onRowClick(rowIndex)
  }

  render() {
    const rows = this.getRows()
    const { rowStyle = () => null } = this.props
    return (
      <tbody>
        {(rows.length === 0 || (this.props.loading && rows.length === 0)) && (
          <tr className="empty">
            <td colSpan={this.props.columns.length}>{this.getLoadingOrEmptyMessage()}</td>
          </tr>
        )}
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            style={
              rowStyle(rowIndex, row) || {
                backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#fafafa"
              }
            }
            className={this.props.onRowClick ? "clickable-row" : ""}
            onClick={e => this.onRowClick(e, rowIndex)}>
            {this.isSelectable(row) && (
              <td>
                <Checkbox
                  isChecked={this.isRowChecked(row)}
                  isDisabled={this.isRowCheckDisabled(row)}
                  onChange={() => this.props.onRowSelected(row)}
                />
              </td>
            )}
            {this.props.columns.map((column, colIndex) => (
              <td
                key={colIndex}
                style={Body.getStyle(column)}
                className={
                  (this.isEditable(rowIndex + this.props.index, colIndex)
                    ? "editable editable-left"
                    : "") +
                  " " +
                  Body.getClass(column)
                }
                onClick={event =>
                  this.onEditCellClicked(this.props.index + rowIndex, colIndex, row, column, event)
                }>
                {Body.getValue(row, column)}
              </td>
            ))}
            {this.props.menu.items.length > 0 && (
              <td
                ref={this.menuRef}
                className="icon-column clickable"
                onClick={event => this.onMenuItemClick(event, rowIndex)}>
                <i className="fa fa-ellipsis-h" style={{ pointerEvents: "none" }} />
              </td>
            )}
            {!this.props.menu.items.length > 0 && this.props.loading && <td />}
          </tr>
        ))}
      </tbody>
    )
  }
}

export default Body
