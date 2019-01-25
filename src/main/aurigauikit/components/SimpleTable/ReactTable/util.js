import React from "react"
import Header from "./Header"
import Pagination from "../components/Pagination"

const countPages = (length, size) => Math.floor(length / size + (length % size > 0 ? 1 : 0))

const getRawValue = (column, data) => {
  if (column.props.rawValue) return column.props.rawValue(data)
  else {
    const value = column.props.children(data)
    if (typeof value !== "number" && typeof value !== "string") {
      console.warn("Not sortable column without rawValue prop")
      return null
    }
    return value
  }
}

export const parseHeaders = (children, override) => {
  let sortable = false
  const headers = children
    .filter(({ type }) => type.displayName === Header.displayName)
    .map((header, index) => {
      if (header.props.sortable) sortable = true
      return React.cloneElement(header, {
        sort: header.props.sort || override.sort[index], //this.state.sort[index],
        onClick: header.onClick || (() => override.onClick(index)) //(() => this.changeSort(index))
      })
    })
  return { headers, sortable }
}

export const parsePaging = (children, data, override) => {
  let paging = children.find(({ type }) => type.displayName === Pagination.displayName)
  const pageSize = paging && paging.props.pageSize
  const page = paging && (paging.props.page || override.page)
  const onPageChange = paging && (paging.props.onChange || override.onPageChange)
  const totalElements = data.length
  const totalPages = paging && countPages(totalElements, pageSize)
  if (paging) {
    paging = React.cloneElement(paging, {
      totalElements,
      page,
      onPageChange,
      totalPages
    })
  }
  return { paging, pageSize, page }
}

export const sort = (rows, index, direction) => {
  rows.sort((a, b) => {
    const aColumn = React.Children.toArray(a.props.children)[index]
    const bColumn = React.Children.toArray(b.props.children)[index]
    const aData = a.props.data
    const bData = b.props.data
    const aValue = getRawValue(aColumn, aData)
    const bValue = getRawValue(bColumn, bData)
    let result = 0
    if (aValue && bValue) {
      if (!isNaN(aValue)) {
        a = Number(aValue)
        b = Number(bValue)
        result = direction === "ASC" ? a - b : b - a
      } else if (typeof aValue === "string") {
        a = aValue.toUpperCase()
        b = bValue.toUpperCase()
        if (a < b) result = direction === "ASC" ? -1 : 1
        if (a > b) result = direction === "ASC" ? 1 : -1
      }
    }
    return result
  })
}
