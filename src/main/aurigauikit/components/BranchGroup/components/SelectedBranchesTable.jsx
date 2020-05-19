import React from 'react'
import { FormattedMessage } from 'react-intl'
import SimpleTable from 'aurigauikit/components/SimpleTable'

const headers = [
  {
    content: (
      <FormattedMessage id="branch-groups-page.group-modal.selected-branches-table.headers.bank-code" />
    ),
  },
  {
    content: (
      <FormattedMessage id="branch-groups-page.group-modal.selected-branches-table.headers.bank-desc" />
    ),
  },
  {
    content: (
      <FormattedMessage id="branch-groups-page.group-modal.selected-branches-table.headers.area-code" />
    ),
  },
  {
    content: (
      <FormattedMessage id="branch-groups-page.group-modal.selected-branches-table.headers.area-desc" />
    ),
  },
  {
    content: (
      <FormattedMessage id="branch-groups-page.group-modal.selected-branches-table.headers.branch-code" />
    ),
  },
  {
    content: (
      <FormattedMessage id="branch-groups-page.group-modal.selected-branches-table.headers.branch-desc" />
    ),
  },
]

const columns = [
  { content: branch => branch.bankCode, cssClass: 'noWrap' },
  { content: branch => branch.bankDesc, cssClass: 'noWrap' },
  { content: branch => branch.areaCode, cssClass: 'noWrap' },
  { content: branch => branch.areaDesc, cssClass: 'noWrap' },
  { content: branch => branch.branchCode, cssClass: 'noWrap' },
  { content: branch => branch.branchDesc, cssClass: 'noWrap' },
]

class SelectedBranchesTable extends React.Component {
  constructor(props) {
    super(props)
  }

  decorateHeaderWithMode = header => {
    const { mode, onRemove } = this.props
    if (mode && mode !== 'view' && onRemove) {
      return [...header, '']
    } else {
      return header
    }
  }

  decorateWithMode = columns => {
    const { mode, onRemove } = this.props
    if (mode && mode !== 'view' && onRemove) {
      return [
        ...columns,
        {
          content: branch => (
            <i
              style={{ color: '#DC402B', cursor: 'pointer' }}
              className="fa fa-times"
              onClick={() => onRemove(branch)}
            />
          ),
        },
      ]
    } else {
      return columns
    }
  }

  render() {
    return (
      <SimpleTable
        headers={this.decorateHeaderWithMode(headers)}
        columns={this.decorateWithMode(columns)}
        menu={this.props.menu}
        loading={this.props.loading}
        data={this.props.data}
        emptyState={this.props.emptyState}
      />
    )
  }
}

export default SelectedBranchesTable
