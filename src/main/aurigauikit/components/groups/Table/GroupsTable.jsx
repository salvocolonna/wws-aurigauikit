import React from "react"
import { FormattedMessage } from "react-intl"
import Tooltip from "aurigauikit/components/Tooltip"
import SimpleTable from "aurigauikit/components/SimpleTable"
import messages, { menu as menuMessages } from "./messages"
import RemoveGroupModal from "./RemoveGroupModal"

export default class extends React.Component {
  state = { deletingGroup: null }

  get headers() {
    return [
      { content: <FormattedMessage {...messages.groupType} />, sortable: false },
      { content: <FormattedMessage {...messages.code} /> },
      { content: <FormattedMessage {...messages.description} /> },
      //   { content: <FormattedMessage {...messages.count} /> },
      {
        content: <FormattedMessage {...messages.private} />,
        cssStyle: { width: "7em" }
      }
    ]
  }

  get columns() {
    return [
      { content: group => group.groupType },
      { content: group => group.code },
      { content: group => group.description },
      /*    {
        content:
          this.props.willDisplayGroup ||
          (group => {
            try {
              const tooltip = group.organizationalUnits
                .map(x => `${x.description} (${x.code})`)
                .reduce((a, b) => `${a}\n${b}`)
              return (
                <div>
                  {group.organizationalUnits.length}
                  <Tooltip text={tooltip} />
                </div>
              )
            } catch (e) {
              return ""
            }
          })
      },*/
      {
        content: group =>
          group.notPublic ? <i className="fa fa-check" /> : <i className="fa fa-minus" />
      }
    ]
  }

  static displayName = "GroupsTable"

  get menu() {
    const { readGroup, editGroup } = this.props
    return {
      items: [
        {
          title: <FormattedMessage {...menuMessages.view} />,
          action: ({ currentRow }) => readGroup(currentRow)
        },
        {},
        {
          title: <FormattedMessage {...menuMessages.edit} />,
          iconName: "pencil",
          action: ({ currentRow }) => editGroup(currentRow)
        },
        {},
        {
          title: <FormattedMessage {...menuMessages.delete} />,
          iconName: "trash-o",
          style: "destructive",
          action: ({ currentRow }) => this.setState({ deletingGroup: currentRow })
        }
      ]
    }
  }

  confirmDelete = group => {
    const { deleteGroup } = this.props
    deleteGroup(group)
    this.undoDelete()
  }

  undoDelete = () => this.setState({ deletingGroup: null })

  render() {
    const {
      pageable,
      sortable,
      onSort,
      onPageChange,
      pageSize,
      page,
      sort,
      loading,
      data,
      totalElements,
      totalPages
    } = this.props
    return (
      <section>
        <RemoveGroupModal
          group={this.state.deletingGroup}
          onClose={this.undoDelete}
          onConfirm={this.confirmDelete}
        />
        <SimpleTable
          pageable={pageable}
          sortable={sortable}
          onSort={onSort}
          onPageChange={onPageChange}
          pageSize={pageSize}
          page={page}
          sort={sort}
          loading={loading}
          headers={this.headers}
          columns={this.columns}
          data={data}
          menu={this.menu}
          totalElements={totalElements}
          totalPages={totalPages}
        />
      </section>
    )
  }
}
