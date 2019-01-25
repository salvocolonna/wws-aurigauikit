import React from "react"
import Row from "./Row"
import { parseHeaders, parsePaging, sort } from "./util"

export default class extends React.Component {
  static displayName = "ReactTable"

  state = { page: 1, sort: {} }

  changePage = page => this.setState({ page })

  changeSort = index => {
    const currentSort = this.state.sort[index]
    const sort = {}
    if (currentSort) {
      if (currentSort === "ASC") sort[index] = "DESC"
      else sort[index] = "ASC"
    } else sort[index] = "DESC"
    this.setState({ sort })
  }

  parseChildren = () => {
    const children = React.Children.toArray(this.props.children)
    let rows = children.filter(({ type }) => type.displayName === Row.displayName)
    const data = rows.map(row => row.props.data)
    const { headers, sortable } = parseHeaders(children, {
      sort: this.state.sort,
      onClick: this.changeSort
    })
    const { paging, pageSize, page } = parsePaging(children, data, {
      page: this.state.page,
      onPageChange: this.changePage
    })
    if (sortable) {
      const sortIndex = Object.keys(this.state.sort)[0]
      if (sortIndex) {
        const direction = this.state.sort[sortIndex]
        sort(rows, sortIndex, direction)
      }
    }
    if (paging) {
      const index = pageSize * (page - 1)
      const last = index + pageSize
      rows = rows.slice(index, last)
    }
    return { headers, rows, paging }
  }

  render() {
    const { striped = true } = this.props
    const { headers, rows, paging } = this.parseChildren()
    const stripedClass = striped ? " table-striped" : ""
    return (
      <React.Fragment>
        <table className={"table" + stripedClass}>
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        {paging}
      </React.Fragment>
    )
  }
}
