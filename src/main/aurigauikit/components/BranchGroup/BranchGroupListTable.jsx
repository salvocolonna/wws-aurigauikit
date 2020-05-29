import React from 'react'
import { FormattedMessage } from 'react-intl'
import Tooltip from 'aurigauikit/components/Tooltip'
import SimpleTable from 'aurigauikit/components/SimpleTable'

const headers = [
  {
    content: <FormattedMessage id="branch-groups-page.branch-groups-table.headers.group-code" />,
  },
  {
    content: <FormattedMessage id="branch-groups-page.branch-groups-table.headers.group-desc" />,
  },
  {
    content: <FormattedMessage id="branch-groups-page.branch-groups-table.headers.branches" />,
  },
  {
    content: <FormattedMessage id="branch-groups-page.branch-groups-table.headers.notPublic" />,
  },
]

const columns = [
  {
    content: branchGroupData => branchGroupData.branchGroupCode,
    cssClass: 'noWrap',
  },
  {
    content: branchGroupData => branchGroupData.branchGroupDescription,
    cssClass: 'noWrap',
  },
  {
    content: branchGroupData => {
      return (
        <div>
          {branchGroupData.branches.length}
          <Tooltip
            text={branchGroupData.branches
              .map(x => `${x.branchDesc} (${x.branchCode})`)
              .reduce((a, b) => `${a}\n${b}`)}
          />
        </div>
      )
    },
    cssClass: 'noWrap',
  },
  {
    content: branchGroupData =>
      branchGroupData.notPublic ? <i className="fa fa-check" /> : <i className="fa fa-remove" />,
    cssClass: 'noWrap',
  },
]

class BranchGroupsTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: { items: [] },
    }
  }

  componentDidMount() {
    this.createMenu()
  }

  async createMenu() {
    const menu = {
      items: [
        {
          title: <FormattedMessage id="branch-groups-page.branch-groups-table.context-menu.view" />,
          iconName: 'eye',
          action: context => this.props.readGroup(context.currentRow.branchGroupId),
        },
        {},
        // {
        //   title: <FormattedMessage id="branch-groups-page.branch-groups-table.context-menu.edit" />,
        //   iconName: 'pencil',
        //   action: context => this.props.editGroup(context.currentRow.branchGroupId),
        // },
        // {},
        {
          title: (
            <FormattedMessage id="branch-groups-page.branch-groups-table.context-menu.delete" />
          ),
          iconName: 'trash-o',
          style: 'destructive',
          action: context => this.props.deleteGroup(context.currentRow.branchGroupId),
        },
      ],
    }
    this.setState({ menu: menu })
  }

  render() {
    return (
      <section>
        <SimpleTable
          pageable
          page={this.props.page}
          pageSize={10}
          totalPages={this.props.totalPages}
          onPageChange={this.props.onPageChange}
          totalElements={this.props.totalElements}
          caption={<FormattedMessage id="branch-groups-page.branch-groups-table.caption" />}
          loading={this.props.loading}
          headers={headers}
          columns={columns}
          data={this.props.data}
          menu={this.state.menu.items.length > 0 ? this.state.menu : undefined}
        />
      </section>
    )
  }
}

export default BranchGroupsTable
