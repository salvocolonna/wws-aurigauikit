import React from "react"
import ReactTable, {
  Column,
  Header,
  Row,
  Caption
} from "aurigauikit/components/SimpleTable/ReactTable"
import Pagination from "aurigauikit/components/SimpleTable/components/Pagination"
import CellEditor from "aurigauikit/components/SimpleTable/components/CellEditor"
import ContextMenu from "aurigauikit/components/ContextMenu"
import isFunction from "lodash/isFunction"
import "./styles/main.less"

class SimpleReactTable extends React.Component {
  menuRef = React.createRef()

  state = { cellEditor: null, menu: { items: [], content: { position: null } } }

  getValidations(rowIndex, colIndex) {
    return this.props.validationAttributesForColumn(
      { settings: { data: this.props.data } },
      rowIndex,
      colIndex
    )
  }

  getCellEditorTitle(column) {
    if (!this.props.editorTitleForColumn) return "Edit"
    return this.props.editorTitleForColumn(this, column)
  }

  isEditable(row, column) {
    if (!this.props.shouldEditCell) return false
    return this.props.shouldEditCell({ settings: { data: this.props.data } }, row, column)
  }

  onEditCellClicked(rowIndex, colIndex, row, column, event) {
    if (this.isEditable(rowIndex, colIndex)) {
      const rect = event.target.getBoundingClientRect()
      const context = {
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
          top: rect.top,
          left: rect.left
        }
      }
      this.setState({
        cellEditor: {
          isOpen: true,
          context,
          validations: this.getValidations(context.rowIndex, context.colIndex)
        }
      })
    }
  }

  onEditAborted = () => {
    this.setState({
      cellEditor: {
        isOpen: false,
        context: {
          title: "Edit",
          value: 0,
          rowIndex: 0,
          colIndex: 0,
          position: { top: 0, left: 0 }
        },
        validations: {}
      }
    })
  }

  onCellEditConfirmed = (rowIndex, colIndex, value) => {
    console.log({ rowIndex, colIndex, value })
    const table = { settings: { data: this.props.data } }
    const data = this.props.willUpdateCell(table, rowIndex, colIndex, value)
    this.props.onDataChange(table.settings.data)
  }

  onContextMenuCloseRequested() {
    this.setState({
      menu: {
        context: {
          position: null
        }
      }
    })
  }

  onMenuItemClick(event, rowIndex) {
    event.preventDefault()
    event.stopPropagation()
    const rect = event.target.getBoundingClientRect()
    const left = rect.left
    const top = rect.top + document.getElementById("content-dynamic").scrollTop

    let realRowIndex = rowIndex

    this.setState(prevState => ({
      menu: {
        context: {
          table: this,
          rowIndex: realRowIndex,
          currentRow: prevState.data[realRowIndex],
          position: { top, left },
          target: event.target
        }
      }
    }))
  }

  render() {
    const {
      caption,
      data,
      headers,
      columns,
      sortable,
      pageable,
      pageSize,
      style,
      className,
      onSort,
      onPageChange,
      sort,
      page,
      loading,
      menu
    } = this.props
    const { cellEditor } = this.state
    const hasMenu = menu && menu.items && menu.items.length > 0
    return (
      <React.Fragment>
        {cellEditor && (
          <CellEditor
            {...cellEditor}
            {...cellEditor.context}
            onEditAborted={this.onEditAborted}
            onEditConfirmed={this.onCellEditConfirmed}
          />
        )}
        {hasMenu && (
          <ContextMenu
            items={this.state.menu.items}
            onCloseRequested={() => this.onContextMenuCloseRequested()}
            context={this.state.menu.context}
          />
        )}
        <ReactTable
          className={className}
          loading={loading}
          sortable={sortable}
          data={data}
          style={style}
          sort={sort}
          onSort={onSort}>
          {caption && <Caption>{caption}</Caption>}
          {headers.map((header, i) => (
            <Header className={header.cssClass} style={header.cssStyle} key={i}>
              {header.content || (header.content === "" ? "" : header)}
            </Header>
          ))}
          {(row, i) => (
            <Row key={i}>
              {columns.map((column, y) => (
                <Column
                  editable={this.isEditable(i, y)}
                  onClick={event => this.onEditCellClicked(i, y, row, column, event)}
                  sortable={column.sortable}
                  style={column.cssStyle}
                  className={column.cssClass}
                  key={y}>
                  {typeof column === "string"
                    ? row[column]
                    : isFunction(column.content)
                    ? column.content(row)
                    : row[column.content]}
                  {hasMenu && (
                    <td
                      ref={this.menuRef}
                      className="icon-column clickable"
                      onClick={event => this.onMenuItemClick(event, i)}>
                      <i className="fa fa-ellipsis-h" style={{ pointerEvents: "none" }} />
                    </td>
                  )}
                </Column>
              ))}
            </Row>
          )}
          {pageable && <Pagination pageSize={pageSize} page={page} onChange={onPageChange} />}
        </ReactTable>
      </React.Fragment>
    )
  }
}

export default SimpleReactTable
