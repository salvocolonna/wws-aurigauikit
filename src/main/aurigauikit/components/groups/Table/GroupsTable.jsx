import React from 'react'
import { FormattedMessage as Msg } from 'react-intl'
import SimpleTable from 'aurigauikit/components/SimpleTable'
import messages, { menu as menuMessages } from './messages'
import Prompt from 'aurigauikit/components/Prompt'

export default class extends React.Component {
  state = { deletingGroup: null }

  get headers() {
    return [
      { content: <Msg {...messages.groupType} />, sortable: false },
      { content: <Msg {...messages.code} /> },
      { content: <Msg {...messages.description} /> },
      //   { content: <Msg {...messages.count} /> },
      {
        content: <Msg {...messages.private} />,
        cssStyle: { width: '7em' },
      },
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
          group.notPublic ? <i className="fa fa-check" /> : <i className="fa fa-minus" />,
      },
    ]
  }

  static displayName = 'GroupsTable'

  get menu() {
    const { readGroup, editGroup } = this.props
    return {
      items: [
        {
          title: <Msg {...menuMessages.view} />,
          action: ({ currentRow }) => readGroup(currentRow),
        },
        {},
        {
          title: <Msg {...menuMessages.edit} />,
          iconName: 'pencil',
          action: ({ currentRow }) => editGroup(currentRow),
        },
        {},
        {
          title: <Msg {...menuMessages.delete} />,
          iconName: 'trash-o',
          style: 'destructive',
          action: ({ currentRow }) => this.setState({ deletingGroup: currentRow }),
        },
      ],
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
      totalPages,
    } = this.props

    return (
      <section>
        <Prompt
          onCancel={this.undoDelete}
          onConfirm={() => this.confirmDelete(this.state.deletingGroup)}
          show={this.state.deletingGroup}
          title={<Msg {...messages.title} />}
        >
          <Msg
            values={{
              name: <b>{this.state.deletingGroup && this.state.deletingGroup.code}</b>,
            }}
            {...messages.remove}
          />
        </Prompt>
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
