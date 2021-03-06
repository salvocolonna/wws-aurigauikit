import React from "react"

const icons = {
  ASC: "fa-sort-asc",
  DESC: "fa-sort-desc",
  BOTH: "fa-sort"
}

const SortIcon = ({ sort }) => {
  let image = icons.BOTH
  if (sort) {
    if (sort === "DESC") image = icons.DESC
    else image = icons.ASC
  }
  return (
    <i
      className={"fa " + image}
      style={{
        paddingLeft: 7,
        paddingRight: 5,
        fontSize: "1.2em",
        color: "#2984C5",
        transform: "translateX(-0.4em) translateY(0.15em)",
        position: "absolute"
      }}
    />
  )
}

export default class extends React.Component {
  static displayName = "ReactTableHeader"

  render() {
    const { children, sortable, sort, onClick, className, style } = this.props
    const classNames = [sortable && "sortable-table", className].filter(Boolean).join(" ")
    return (
      <th className={classNames} onClick={(sortable && onClick) || undefined} style={style}>
        {sortable && <SortIcon sort={sort} />}
        <div style={{ marginLeft: sortable && 15 }}>{children}</div>
      </th>
    )
  }
}
