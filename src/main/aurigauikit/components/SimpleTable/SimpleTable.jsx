import React from 'react'
import Table from './components/Table'
import './styles/main.less'

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: props.page,
      sort: props.sort || {},
      data: props.data,
      selectedRows: props.selectedRows,
      menu: { context: { position: null } },
      cellEditor: {
        isOpen: false,
        context: {
          title: 'Edit',
          value: 0,
          rowIndex: 0,
          colIndex: 0,
          position: { top: 0, left: 0 },
        },
        validations: {},
      },
    }

    this.defaultSelectionFound = false
  }

  findSelectedRows() {
    if (this.props.defaultSelection.length > 0 && this.props.selectedRows.length === 0)
      this.getDefaultSelection()
  }

  componentDidMount() {
    this.findSelectedRows()
  }

  getDefaultSelection() {
    if (this.props.defaultSelection) {
      if (this.props.dataComparator === SimpleTable.defaultProps.dataComparator)
        console.warn('I cannot compare selection without a data comparator') // eslint-disable-line no-console
      const defaultSelection = this.props.data.filter(e1 => {
        const exist =
          typeof this.props.defaultSelection.find(e2 => this.props.dataComparator(e1, e2)) !==
          'undefined'
        return exist
      })
      if (defaultSelection.length > 0) {
        this.defaultSelectionFound = true
        this.onSelectionChange(defaultSelection)
      }
    }
  }

  isDataChanged(data) {
    const added = data.filter(element => !this.props.data.includes(element))
    const removed = this.props.data.filter(element => !data.includes(element))
    return (added.length || removed.length) > 0
  }

  //	componentDidUpdate(prevProps){
  //		if(!this.defaultSelectionFound) this.findSelectedRows()
  //	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) this.setState({ page: nextProps.page })
    if (nextProps.sort !== this.props.sort) this.setState({ sort: nextProps.sort })
    if (this.isDataChanged(nextProps.data)) this.setState({ data: nextProps.data })
    if (nextProps.selectedRows !== this.props.selectedRows)
      this.setState({ selectedRows: nextProps.selectedRows })
    if (
      nextProps.menu.context &&
      nextProps.menu.context.position !== this.props.menu.context.position
    )
      this.setState({ menu: { context: nextProps.menu.context } })
  }

  onMenuItemClick(rowIndex, position, target) {
    let realRowIndex = rowIndex
    if (!this.props.totalPages) realRowIndex += (this.state.page - 1) * this.props.pageSize
    this.setState(prevState => ({
      menu: {
        context: {
          table: this,
          rowIndex: realRowIndex,
          currentRow: prevState.data[realRowIndex],
          position: position,
          target,
        },
      },
    }))
  }

  onRowClick = rowIndex => {
    let realRowIndex = rowIndex
    if (!this.props.totalPages) realRowIndex += (this.state.page - 1) * this.props.pageSize
    this.props.onRowClick({
      table: this,
      rowIndex: realRowIndex,
      currentRow: this.state.data[realRowIndex],
    })
  }

  onPageChange(page) {
    if (this.props.onPageChange) this.props.onPageChange(page)
    this.setState({ page: page })
  }

  onUnselectAll(rows) {
    const comparator = this.props.dataComparator !== SimpleTable.defaultProps.dataComparator
    let selectedRows = this.state.selectedRows.filter(row =>
      comparator ? !rows.find(r => this.props.dataComparator(row, r)) : rows.indexOf(row) < 0
    )
    this.onSelectionChange(selectedRows)
  }

  onSelectAll(rows) {
    let selectedRows = this.state.selectedRows.slice()
    this.onSelectionChange([...rows, ...selectedRows])
  }

  onRowSelected(row) {
    if (this.props.selectableType && this.props.selectableType === 'single') {
      this.onSelectionChange([row])
    } else {
      this.onSelectionChange([row, ...this.state.selectedRows])
    }
  }

  onRowUnselected(row) {
    if (this.props.selectableType !== 'single') {
      const comparator = this.props.dataComparator !== SimpleTable.defaultProps.dataComparator
      let selectedRows = this.state.selectedRows.filter(r =>
        comparator ? !this.props.dataComparator(row, r) : selectedRows.indexOf(r) < 0
      )
      this.onSelectionChange(selectedRows)
    }
  }

  onSelectionChange(selectedRows) {
    this.props.onSelectionChange(selectedRows)
    this.setState({ selectedRows: selectedRows })
  }

  evaluate = (data, column) => {
    let result = null
    if (typeof column === 'string') {
      result = data[column]
    } else {
      const content = column.content
      if (typeof content === 'string') {
        result = data[content]
      } else if (typeof content === 'function') {
        result = content(data)
      }
    }
    if (column.rawValue) {
      result = column.rawValue(data)
    }
    return result
  }

  onSort(sort) {
    if (this.props.onSort) {
      this.props.onSort(sort)
      this.setState({
        sort: sort,
      })
    } else {
      const column = this.props.columns[sort.index]
      this.setState({
        sort: sort,
        data: this.state.data.slice().sort((a, b) => {
          const aValue = this.evaluate(a, column)
          const bValue = this.evaluate(b, column)
          let result = 0
          if (
            (aValue || aValue === '' || aValue === 0) &&
            (bValue || bValue === '' || bValue === 0)
          ) {
            if (!isNaN(aValue)) {
              a = Number(aValue)
              b = Number(bValue)
              result = sort.direction === 'ASC' ? a - b : b - a
            } else if (typeof aValue === 'string') {
              a = aValue.toUpperCase()
              b = bValue.toUpperCase()
              if (a < b) result = sort.direction === 'ASC' ? -1 : 1
              if (a > b) result = sort.direction === 'ASC' ? 1 : -1
            }
          }
          return result
        }),
      })
    }
  }

  onContextMenuCloseRequested() {
    this.setState({
      menu: {
        context: {
          position: null,
        },
      },
    })
  }

  onEditCellClicked(context) {
    this.setState({
      cellEditor: {
        isOpen: true,
        context: context,
        validations: this.getValidations(context.rowIndex, context.colIndex),
      },
    })
  }

  onEditAborted() {
    this.setState(({ cellEditor }) => ({
      cellEditor: { ...cellEditor, isOpen: false },
    }))
  }

  getValidations(rowIndex, colIndex) {
    return this.props.validationAttributesForColumn(
      {
        settings: { data: this.props.data },
      },
      rowIndex,
      colIndex
    )
  }

  willUpdateCell(table, rowIndex, colIndex, value) {
    const canUpdate = this.props.willUpdateCell(table, rowIndex, colIndex, value)
    if (canUpdate) this.setState({ data: table.settings.data }, () => this.didEditCell(table))
  }

  didEditCell(table) {
    this.props.onDataChange(table.settings.data)
  }

  render() {
    return (
      <Table
        style={this.props.style}
        caption={this.props.caption}
        emptyState={this.props.emptyState}
        data={this.state.data}
        groupHeaders={this.props.groupHeaders}
        headers={this.props.headers}
        footers={this.props.footers}
        columns={this.props.columns}
        loading={this.props.loading}
        pageable={this.props.pageable}
        scrollable={this.props.scrollable}
        pageSize={this.props.pageSize}
        page={(this.props.onPageChange && this.props.page) || this.state.page}
        totalPages={this.props.totalPages}
        totalElements={this.props.totalElements}
        onPageChange={page => this.onPageChange(page)}
        sortable={this.props.sortable}
        rowStyle={this.props.rowStyle}
        sort={(this.props.onSort && this.props.sort) || this.state.sort}
        onSort={sort => this.onSort(sort)}
        menu={{
          context: this.state.menu.context,
          items: this.props.menu.items,
        }}
        onMenuItemClick={(row, position, target) => this.onMenuItemClick(row, position, target)}
        onContextMenuCloseRequested={() => this.onContextMenuCloseRequested()}
        selectable={this.props.selectable}
        selectableType={this.props.selectableType ? this.props.selectableType : 'multiple'}
        selectedRows={this.state.selectedRows}
        defaultSelection={this.props.defaultSelection}
        dataComparator={this.props.dataComparator}
        onRowSelected={row => this.onRowSelected(row)}
        onRowUnselected={row => this.onRowUnselected(row)}
        onSelectAll={rows => this.onSelectAll(rows)}
        onUnselectAll={rows => this.onUnselectAll(rows)}
        willSelectRow={(table, rowIndex, row) => this.props.willSelectRow(table, rowIndex, row)}
        didSelectRow={(table, rowIndex, row) => this.props.didSelectRow(table, rowIndex, row)}
        canSelect={element => this.props.canSelect(element)}
        onRowClick={this.props.onRowClick && this.onRowClick}
        editable={this.props.editable}
        cellEditor={this.state.cellEditor}
        onEditAborted={() => this.onEditAborted()}
        onEditCellClicked={context => this.onEditCellClicked(context)}
        editorTitleForColumn={(table, col) => this.props.editorTitleForColumn(table, col)}
        validationAttributesForColumn={(table, rowIndex, colIndex) =>
          this.props.validationAttributesForColumn(table, rowIndex, colIndex)
        }
        validations={this.state.cellEditor.validations}
        cellValueForEditor={(table, rowIndex, colIndex, column) =>
          this.props.cellValueForEditor(table, rowIndex, colIndex, column)
        }
        shouldEditCell={(table, row, column) => this.props.shouldEditCell(table, row, column)}
        willUpdateCell={(table, rowIndex, colIndex, value) =>
          this.willUpdateCell(table, rowIndex, colIndex, value)
        }
        className={this.props.className}
      />
    )
  }
}

SimpleTable.defaultProps = {
  headers: [],
  footers: [],
  columns: [],
  data: [],
  sortable: false,
  pageable: false,
  scrollable: false,
  pageSize: 0,
  selectedRows: [],
  page: 1,
  sort: null,
  totalPages: 0,
  selectable: false,
  menu: { items: [] },
  editable: false,
  defaultSelection: [],
  loading: false,

  /* eslint-disable no-unused-vars */
  onRowClick: null,
  shouldEditCell: (table, row, col) => true,
  editorTitleForColumn: (table, col) => 'Edit the value',
  validationAttributesForColumn: (table, rowIndex, colIndex) => ({}),
  cellValueForEditor: (table, rowIndex, colIndex, column) => column,
  didEditCell: (table, rowIndex, colIndex, value) => {},
  willUpdateCell: (table, rowIndex, colIndex, value) => true,
  onDataChange: data => data,
  canSelect: selectedItem => true,
  dataComparator: (e1, e2) => false,
  /* eslint-enable no-unused-vars */

  className: '',
}

export default SimpleTable
