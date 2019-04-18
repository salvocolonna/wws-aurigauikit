import React from "react"
import { FormattedMessage } from "react-intl"
import Loader from "aurigauikit/components/Loader"
import Row from "./Row"
import { parseHeaders, parsePaging, sort } from "./util"
import isFunction from "lodash/isFunction"

export default class extends React.Component {
  static displayName = "ReactTable"

  state = { page: 1, sort: {} }

  changePage = page => {
    if (this.props.onPageChange) this.props.onPageChange(page)
    else this.setState({ page })
  }

  changeSort = index => {
    const currentSort = this.props.sort || this.state.sort
    const sort = { index }
    if (currentSort) {
      if (currentSort.direction === "ASC") sort.direction = "DESC"
      else sort.direction = "ASC"
    } else sort.direction = "DESC"
    if (this.props.onSort) this.props.onSort(sort)
    else this.setState({ sort })
  }

  parseChildren = () => {
    const children = React.Children.toArray(this.props.children).filter(({ type }) => type)
    const createRow = this.props.children.find(child => isFunction(child))
    const isRenderProps = this.props.data && createRow

    const caption = children.find(({ type }) => type.displayName === "ReactTableCaption")

    let rows = isRenderProps
      ? this.props.data.map((element, i) => createRow(element, i))
      : children.filter(({ type }) => type.displayName === Row.displayName)

    const data = rows.map(row => row.props.data)

    const { headers, sortable } = parseHeaders(children, {
      sortable: this.props.sortable,
      sort: this.props.sort || this.state.sort,
      onClick: this.changeSort
    })

    const { paging, pageSize, page } = parsePaging(children, data, {
      page: this.state.page,
      onPageChange: this.changePage
    })

    if (sortable) {
      const { index, direction } = this.props.sort || this.state.sort || {}
      if (direction) sort(rows, index, direction)
    }

    if (paging) {
      const index = pageSize * (page - 1)
      const last = index + pageSize
      rows = rows.slice(index, last)
    }

    return { headers, rows, paging, caption }
  }

  render() {
    const { striped = true, style, className, loading, emptyState } = this.props
    const { headers, rows, paging, caption } = this.parseChildren()
    const classes = ["table", striped && "table-striped", className].filter(Boolean).join(" ")
    const styles = {
      width: "100%",
      overflowX: "auto",
      overflowY: "hidden",
      position: "relative",
      pointerEvents: "none",
      ...style
    }
    const message = loading ? (
      <FormattedMessage id="simple-table.loading-state" />
    ) : rows.length === 0 ? (
      emptyState ? (
        emptyState
      ) : (
        <FormattedMessage id="simple-table.empty-state" />
      )
    ) : null
    return (
      <div style={styles}>
        <table className={classes}>
          {caption}
          <thead style={{ pointerEvents: "all" }}>
            <tr>
              {headers}
              {loading && (
                <th style={{ width: 1 }}>
                  <Loader />
                </th>
              )}
            </tr>
          </thead>
          <tbody style={{ pointerEvents: "all" }}>
            {message ? (
              <tr className="empty">
                <td colSpan={headers.length}>{message}</td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </table>
        <div style={{ pointerEvents: "all" }}>{paging}</div>
      </div>
    )
  }
}
