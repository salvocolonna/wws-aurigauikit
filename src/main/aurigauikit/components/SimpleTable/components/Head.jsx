import React from 'react'
import Checkbox from '../../Checkbox'
import Loader from '../../Loader'

const IMAGES = {
  ASC: 'fa-sort-asc',
  DESC: 'fa-sort-desc',
  BOTH: 'fa-sort',
}

class Head extends React.Component {
  constructor(props) {
    super(props)
  }

  onSort(header) {
    const index = this.props.headers.indexOf(header),
      sort = this.props.sort
    this.props.onSort({
      index: index,
      direction: Head.nextDirection(index, sort),
    })
  }

  static nextDirection(index, last) {
    return index !== last.index ? 'DESC' : last.direction === 'DESC' ? 'ASC' : 'DESC'
  }

  static getSortImage(index, last) {
    let image = IMAGES.BOTH
    if (index === last.index) {
      if (last.direction === 'DESC') image = IMAGES.DESC
      else image = IMAGES.ASC
    }
    const style = {
      paddingLeft: 7,
      paddingRight: 5,
      fontSize: '1.2em',
      color: '#2984C5',
      transform: 'translateX(-0.4em) translateY(0.15em)',
      marginTop: -3,
    }
    return <i className={'fa ' + image} style={style} />
  }

  static getValue(header) {
    let value = header
    if (typeof value === 'object') value = header.content
    return value
  }

  static getStyle(header) {
    if (typeof header === 'string') return {}
    return header.cssStyle
  }

  static getClass(header) {
    if (typeof header === 'string') return ''
    return header.cssClass
  }

  render() {
    const last = this.props.index + this.props.pageSize
    let rows = this.props.data
    if (this.props.sliceData) rows = this.props.data.slice(this.props.index, last)
    let allSelectable = false
    let oneSelectable = false
    rows.forEach(row => {
      if (this.props.canSelect(row) && this.props.selectableType === 'multiple')
        allSelectable = true
      if (this.props.canSelect(row) && this.props.selectableType === 'single') oneSelectable = true
    })
    // if (allSelectable) allSelectable = this.props.selectableType === 'multiple'
    const {
      loading,
      menu,
      headers,
      sort,
      sortable,
      onSelectAll,
      allSelected,
      selectable,
    } = this.props
    const extra = menu.items.length > 0
    return (
      <thead>
        <tr>
          {selectable && allSelectable && (
            <th>
              <Checkbox isChecked={allSelected} onChange={() => onSelectAll()} />
            </th>
          )}
          {selectable && oneSelectable && <th />}
          {this.props.headers.map((header, index) => (
            <th
              key={index}
              className={
                (header.sortable || (typeof header.sortable === 'undefined' && sortable)
                  ? 'sortable-table'
                  : '') +
                ' ' +
                Head.getClass(header)
              }
              style={Head.getStyle(header)}
              onClick={() =>
                (header.sortable || (typeof header.sortable === 'undefined' && sortable)) &&
                this.onSort(header)
              }
            >
              <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {(header.sortable || (typeof header.sortable === 'undefined' && sortable)) &&
                  Head.getSortImage(headers.indexOf(header), sort)}
                <div
                  style={{
                    marginRight: index < this.props.headers.length - 1 && 5,
                    display: 'inline-block',
                  }}
                >
                  {Head.getValue(header)}
                </div>
              </div>
            </th>
          ))}
          {loading && (
            <th style={{ width: 1 }}>
              <Loader />
            </th>
          )}
          {extra && !loading && <th style={{ width: 1 }} />}
        </tr>
      </thead>
    )
  }
}

export default Head
