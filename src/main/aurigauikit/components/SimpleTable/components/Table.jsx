import React from 'react'
import Head from './Head'
import Foot from './Foot'
import Body from './Body'
import Pagination from './Pagination'
import CellEditor from './CellEditor'
import ContextMenu from '../../ContextMenu/ContextMenu'
import { FormattedMessage } from 'react-intl'

class Table extends React.Component {
  getTotalPages() {
    if (this.props.totalPages === 0) {
      const pageSize = this.props.pageSize,
        size = this.props.data.length
      return Math.floor(size / pageSize + (size % pageSize > 0 ? 1 : 0))
    }
    return this.props.totalPages
  }

  onSelectAll() {
    const unselectedRows = this.getUnselectedRows()
    if (unselectedRows.length === 0) this.props.onUnselectAll(this.getSelectableRows())
    else this.props.onSelectAll(unselectedRows)
  }

  onRowSelected(row) {
    const foundedRow = this.props.selectedRows.find(r => this.props.dataComparator(r, row))
    if (!foundedRow) this.props.onRowSelected(row)
    else this.props.onRowUnselected(foundedRow)
  }

  getSelectableRows() {
    let rows = this.props.data
    if (this.props.selectOnPage) {
      const first = this.props.pageSize * (this.props.page - 1)
      const last = first + this.props.pageSize
      if (this.props.totalPages === 0) rows = this.props.data.slice(first, last)
    }
    return rows.filter(row => this.props.canSelect(row))
  }

  getUnselectedRows() {
    const selectableRows = this.getSelectableRows()
    return selectableRows.filter(
      row => this.props.selectedRows.find(e1 => this.props.dataComparator(e1, row)) === undefined
    )
  }

  onCellEditConfirmed(rowIndex, colIndex, value) {
    const table = { settings: { data: this.props.data } }
    this.props.willUpdateCell(table, rowIndex, colIndex, value)
  }

  getLoadingOrEmptyMessage() {
    let toView
    if (this.props.loading) {
      toView = this.props.loadingState || 'simple-table.loading-state'
    } else {
      toView = this.props.emptyState || 'simple-table.empty-state'
    }
    if (typeof toView === 'string') {
      return <FormattedMessage id={toView} />
    } else {
      return toView
    }
  }

  render() {
    const unselectedRows = this.getUnselectedRows()
    const hasMenu = this.props.menu.items.length > 0
    return (
      <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden', ...this.props.style }}>
        {this.props.editable && this.props.cellEditor.context && (
          <CellEditor
            isOpen={this.props.cellEditor.isOpen}
            title={this.props.cellEditor.context.title}
            position={this.props.cellEditor.context.position}
            validations={this.props.validations}
            colIndex={this.props.cellEditor.context.colIndex}
            rowIndex={this.props.cellEditor.context.rowIndex}
            onEditAborted={() => this.props.onEditAborted()}
            onEditConfirmed={(rowIndex, colIndex, value) =>
              this.onCellEditConfirmed(rowIndex, colIndex, value)
            }
            value={this.props.cellEditor.context.value}
          />
        )}
        {hasMenu && (
          <ContextMenu
            items={this.props.menu.items}
            onCloseRequested={() => this.props.onContextMenuCloseRequested()}
            context={this.props.menu.context}
          />
        )}
        <table className={`table table-striped ${this.props.className}`}>
          {this.props.caption && this.props.caption != '' && (
            <caption style={{ pointerEvents: 'none' }}>
              <div>{this.props.caption}</div>
            </caption>
          )}
          <Head
            data={this.props.data}
            index={this.props.pageSize * (this.props.page - 1)}
            sliceData={this.props.pageSize > 0 && this.props.totalPages === 0}
            groupHeaders={this.props.groupHeaders}
            headers={this.props.headers}
            sortable={this.props.sortable}
            onSort={sort => this.props.onSort(sort)}
            onSelectAll={() => this.onSelectAll()}
            allSelected={unselectedRows.length === 0}
            selectable={this.props.selectable}
            menu={this.props.menu}
            canSelect={element => this.props.canSelect(element)}
            sort={this.props.sort}
            pageSize={this.props.pageSize}
            loading={this.props.loading}
          />
          <Body
            onRowClick={this.props.onRowClick}
            data={this.props.data}
            defaultSelection={this.props.defaultSelection}
            columns={this.props.columns}
            index={this.props.pageSize * (this.props.page - 1)}
            rowStyle={this.props.rowStyle}
            sliceData={
              this.props.pageable && this.props.pageSize > 0 && this.props.totalPages === 0
            }
            onRowSelected={row => this.onRowSelected(row)}
            selectedRows={this.props.selectedRows}
            dataComparator={this.props.dataComparator}
            editable={this.props.editable}
            shouldEditCell={(table, row, column) => this.props.shouldEditCell(table, row, column)}
            editorTitleForColumn={(table, col) => this.props.editorTitleForColumn(table, col)}
            cellValueForEditor={(table, rowIndex, colIndex, column) =>
              this.props.cellValueForEditor(table, rowIndex, colIndex, column)
            }
            selectable={this.props.selectable}
            canSelect={element => this.props.canSelect(element)}
            menu={this.props.menu}
            onMenuItemClick={(row, position, target) =>
              this.props.onMenuItemClick(row, position, target)
            }
            onEditCellClicked={context => this.props.onEditCellClicked(context)}
            pageSize={this.props.pageSize}
            emptyState={this.props.emptyState}
            loadingState={this.props.loadingState}
            loading={this.props.loading}
          />
          {this.props.footers.length > 0 && this.props.loading && (
            <tfoot>
              <tr>
                <td colSpan={this.props.columns.length + 1} />
              </tr>
            </tfoot>
          )}
          {this.props.footers.length > 0 && (
            <Foot
              data={this.props.data}
              index={this.props.pageSize * (this.props.page - 1)}
              sliceData={this.props.pageSize > 0 && this.props.totalPages === 0}
              footers={this.props.footers}
              sortable={this.props.sortable}
              onSelectAll={() => this.onSelectAll()}
              allSelected={unselectedRows.length === 0}
              selectable={this.props.selectable}
              canSelect={element => this.props.canSelect(element)}
              menu={this.props.menu}
              pageSize={this.props.pageSize}
              loading={this.props.loading}
            />
          )}
        </table>
        {this.props.pageable && (
          <Pagination
            page={this.props.page}
            totalElements={this.props.totalElements}
            pageSize={this.props.data.length}
            totalPages={this.getTotalPages()}
            onPageChange={page => this.props.onPageChange(page)}
          />
        )}
      </div>
    )
  }
}

export default Table
