import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import SimpleTable from "aurigauikit/components/SimpleTable"
import messages from "./messages"

class SelectedBranchesTable extends React.Component {
  get headers() {
    const { groupType, customTypes, customHeaders } = this.props
    const headers = [{ content: <Msg {...messages.parentBank} /> }]
    if (groupType === "BANK") headers.push({ content: <Msg {...messages.bank} /> })
    if (groupType === "AREA") {
      headers.push({ content: <Msg {...messages.bank} /> })
      headers.push({ content: <Msg {...messages.area} /> })
    }
    if (groupType === "BRANCH") {
      headers.push({ content: <Msg {...messages.bank} /> })
      headers.push({ content: <Msg {...messages.area} /> })
      headers.push({ content: <Msg {...messages.branch} /> })
    }
    if (customTypes.includes(groupType)) {
      headers.push({ content: <Msg {...messages.bank} /> })
      headers.push({ content: <Msg {...messages.area} /> })
      headers.push({ content: <Msg {...messages.branch} /> })
      headers.push(...customHeaders)
    }
    return headers
  }

  get columns() {
    const { customColumns } = this.props
    return [
      { content: ou => `${ou.parentBankCode} (${ou.parentBankDescription})` },
      { content: ou => `${ou.bankCode} (${ou.bankDescription})` },
      { content: ou => `${ou.areaCode} (${ou.areaDescription})` },
      { content: ou => `${ou.branchCode} (${ou.branchDescription})` },
      ...customColumns
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
        pageable
        pageSize={9}
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
