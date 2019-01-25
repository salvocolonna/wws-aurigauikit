import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import SimpleTable from "aurigauikit/components/SimpleTable"
import messages from "./messages"

class SelectedBranchesTable extends React.Component {
  get headers() {
    return ["Code", "Description", "Type"]
  }

  get columns() {
    return [
      { content: ou => ou.code },
      { content: ou => ou.description },
      { content: ou => ou.type }
    ]
  }

  decorateHeaderWithMode = header => {
    const { mode, onRemove } = this.props
    if (mode && mode !== "view" && onRemove) {
      return [...header, ""]
    } else {
      return header
    }
  }

  decorateWithMode = columns => {
    const { mode, onRemove } = this.props
    if (mode && mode !== "view" && onRemove) {
      return [
        ...columns,
        {
          content: branch => (
            <i
              style={{ color: "#DC402B", cursor: "pointer" }}
              className="fa fa-times"
              onClick={() => onRemove(branch)}
            />
          )
        }
      ]
    } else {
      return columns
    }
  }

  render() {
    return (
      <SimpleTable
        headers={this.decorateHeaderWithMode(this.headers)}
        columns={this.decorateWithMode(this.columns)}
        menu={this.props.menu}
        loading={this.props.loading}
        data={this.props.data}
        emptyState={this.props.emptyState}
      />
    )
  }
}

export default SelectedBranchesTable
