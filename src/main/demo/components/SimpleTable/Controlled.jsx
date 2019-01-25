import React from "react"
import SimpleTable from "aurigauikit/components/SimpleTable"

const Show = ({ page, sort, headers }) => (
  <div style={{ marginBottom: 20 }}>
    Current page is: {page}, sorting by {headers[sort.index]} {sort.direction}
  </div>
)

export default class extends React.Component {
  state = { page: 1, sort: { index: 0, direction: "DESC" } }

  changePage = page => this.setState({ page })

  changeSort = sort => this.setState({ sort })

  render() {
    const { page, sort } = this.state
    const headers = ["Header 1", "Header 2"]
    return (
      <div style={{ width: "100%" }}>
        <Show headers={headers} page={page} sort={sort} />
        <SimpleTable
          sortable
          pageable
          pageSize={2}
          page={page}
          sort={sort}
          onSort={this.changeSort}
          onPageChange={this.changePage}
          headers={headers}
          columns={["column1", "column2"]}
          data={[
            { column1: "Column 1 Row 1", column2: "Column 2 Row 1" },
            { column1: "Column 1 Row 2", column2: "Column 2 Row 2" },
            { column1: "Column 1 Row 3", column2: "Column 2 Row 3" }
          ]}
        />
      </div>
    )
  }
}
