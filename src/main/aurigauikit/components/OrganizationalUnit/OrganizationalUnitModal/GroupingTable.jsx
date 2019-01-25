import React from "react"
import SimpleTable from "../../SimpleTable/SimpleTable"

export default class extends React.Component {
  getColumns = () => {
    return [
      ...this.props.columns,
      {
        content: data => (
          <i
            className="fa fa-remove"
            style={{ color: "#DC402B", fontSize: 15 }}
            onClick={() => this.props.onRemove(data)}
          />
        )
      }
    ]
  }
  getHeaderData = () => {
    return [...this.props.headers, { content: "", sortable: false, cssStyle: { width: "3em" } }]
  }
  render() {
    return (
      <SimpleTable
        pageable
        pageSize={8}
        data={this.props.data}
        columns={this.getColumns()}
        headers={this.getHeaderData()}
      />
    )
  }
}
