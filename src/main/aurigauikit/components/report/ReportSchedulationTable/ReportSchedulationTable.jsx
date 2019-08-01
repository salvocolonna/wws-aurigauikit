import React from 'react'
import { FormattedDate, FormattedMessage as Msg } from 'react-intl'

import SimpleTable from 'aurigauikit/components/SimpleTable'
import Prompt from 'aurigauikit/components/Prompt'
import messages from './messages'

const ICONS = { true: 'confirmatory', false: 'critical' }

const StatusLabel = ({ status }) => (
  <span style={{ textTransform: 'uppercase' }}>
    <span style={{ margin: '0 8px 0 0' }} className={`dot dot-${ICONS[status]}`} />
    <span className="asset-label">
      {status ? (
        <Msg id={'report.schedulation-table.report-state.ENABLED'} />
      ) : (
          <Msg id={'report.schedulation-table.report-state.DISABLED'} />
        )}
    </span>
  </span>
)

const headers = [
  { content: <Msg id="report.schedulation-table.columns.state" /> },
  { content: <Msg id="report.schedulation-table.report-name.head-table" /> },
  { content: <Msg id="report.schedulation-table.columns.report-template" /> },
  { content: <Msg id="report.schedulation-table.columns.start-date" /> },
  { content: <Msg id="report.schedulation-table.columns.end-date" /> },
  { content: <Msg id="report.schedulation-table.columns.recurrence" /> },
  { content: <Msg id="report.delete-schedulation-modal.next-schedulation" /> },
]

const columns = [
  {
    content: report => <StatusLabel status={report.schedulation.recurrence} />,
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      return report.schedulation.reportName
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      return report.template.name
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      if (report.schedulation.startDate) {
        return (
          <FormattedDate
            value={new Date(report.schedulation.startDate)}
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        )
      } else {
        return <Msg id={'report.schedulation-table.recurrence.NEVER'} />
      }
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      if (report.schedulation.endDate) {
        return (
          <FormattedDate
            value={new Date(report.schedulation.endDate)}
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        )
      } else {
        return <Msg id={'report.schedulation-table.recurrence.NEVER'} />
      }
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      return toReadRecurringType(report.schedulation.recurringType)
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      return (
        <FormattedDate
          value={new Date(report.schedulation.nextExecution)}
          year="numeric"
          month="2-digit"
          day="2-digit"
          hour="2-digit"
          minute="2-digit"
          second="2-digit"
        />
      )
    },
    cssClass: 'no-wrap',
  },
]

const emptyState = <Msg id="report.schedulation-table.empty-state" />

const toReadRecurringType = rec => {
  switch (rec) {
    case null:
      return <Msg id={'report.schedulation-table.recurrence.NEVER'} />
    case 'NEVER':
      return <Msg id={'report.schedulation-table.recurrence.NEVER'} />
    case 'DAILY':
      return <Msg id={'report.schedulation-table.recurrence.DAILY'} />
    case 'WEEKLY':
      return <Msg id={'report.schedulation-table.recurrence.WEEKLY'} />
    case 'MONTHLY':
      return <Msg id={'report.schedulation-table.recurrence.MONTHLY'} />
  }
}

const toReadableExp = cronExpression => {
  const cronExp = cronExpression.split(' ', 6)
  const month = cronExp[4]
  const dayOfWeek = cronExp[5]
  if (!cronExpression || (month[0] !== '*' && dayOfWeek[0] === '?'))
    return <Msg id={'report.schedulation-table.recurrence.NEVER'} />
  if (month[0] === '*' && dayOfWeek[0] === '?' && cronExp[3][1] === '/')
    return <Msg id={'report.schedulation-table.recurrence.DAILY'} />
  if (dayOfWeek[0] !== '0' && !month[1] === '/')
    return <Msg id={'report.schedulation-table.recurrence.WEEKLY'} />
  if ((month[1] === '/' && cronExp[3] === '?') || (month[1] === '/' && dayOfWeek === '?'))
    return <Msg id={'report.schedulation-table.recurrence.MONTHLY'} />
}

const toReadableExpTs = cronExpression => {
  const cronExp = cronExpression.split(' ', 6)
  const seconds = cronExp[0]
  const minutes = cronExp[1]
  const hours = cronExp[2]

  const timeSlots = hours.split('-', 3)

  if (seconds[0] === '*' && minutes[0] === '*' && hours[0] === '*') return ''
  if (hours[0] !== 0) {
    if (timeSlots[0] !== 0) {
      let a = '0'
      if (timeSlots[0].length === 1) {
        if (minutes[0].length === 1) {
          return a
            .concat(timeSlots[0].toString())
            .concat(':')
            .concat(a)
            .concat(minutes[0].toString())
        } else {
          return a
            .concat(timeSlots[0].toString())
            .concat(':')
            .concat(minutes[0].toString())
        }
      } else {
        if (minutes[0].length === 1) {
          return timeSlots[0]
            .toString()
            .concat(':')
            .concat(a)
            .concat(minutes[0].toString())
        } else {
          return timeSlots[0]
            .toString()
            .concat(':')
            .concat(minutes[0].toString())
        }
      }
    }
  }
}

class ReportSchedulationTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: { items: [] },
      showDelete: false,
      deletingSchedulation: null,
    }
  }

  onDeleteConfirm() {
    this.setState({ showDelete: false }, () =>
      this.props.deleteSchedulation(this.state.deletingSchedulation)
    )
  }

  onDeleteUndo() {
    this.setState({ showDelete: false })
  }

  static sort = [
    'recurrence',
    'reportName',
    'template.name',
    'schedulingStartDate',
    'schedulingEndDate',
    'recurringType',
    'nextSchedulingDate',
  ]

  menu = {
    items: [
      {
        title: <Msg id="report.schedulation-table.menu.edit" />,
        iconName: 'pencil',
        hidden: () => false,
        action: context => this.props.editSchedulation(context.currentRow),
      },
      {},
      {
        title: <Msg id="report.schedulation-table.menu.enable" />,
        hidden: context =>
          context.currentRow && context.currentRow.schedulation.recurrence === true,
        iconName: 'check-circle',
        style: 'confirmatory',
        action: context => {
          this.props.enableSchedulation(context.currentRow)
        },
      },
      {
        title: <Msg id="report.schedulation-table.menu.disable" />,
        hidden: context =>
          context.currentRow && context.currentRow.schedulation.recurrence === false,
        iconName: 'times-circle',
        style: 'destructive',
        action: context => {
          this.props.disableSchedulation(context.currentRow)
        },
      },
      {},
      {
        title: <Msg id="report.schedulation-table.menu.delete" />,
        iconName: 'trash-o',
        style: 'destructive',
        action: context =>
          this.setState({ showDelete: true, deletingSchedulation: context.currentRow }),
      },
    ],
  }

  render() {
    const {
      data,
      loading,
      onSort,
      onPageChange,
      pageSize,
      page,
      sort,
      totalElements,
      totalPages,
    } = this.props
    const { deletingSchedulation } = this.state

    return (
      <section>
        <Prompt
          show={this.state.showDelete}
          title={<Msg {...messages.title} />}
          onConfirm={() => this.onDeleteConfirm()}
          onCancel={() => this.onDeleteUndo()}
        >
          <Msg
            values={{
              name: <b>{deletingSchedulation && deletingSchedulation.reportName}</b>,
            }}
            {...messages.remove}
          />
        </Prompt>
        <SimpleTable
          sortable
          pageable
          headers={headers}
          columns={columns}
          emptyState={emptyState}
          menu={this.menu}
          loading={loading}
          data={data}
          pageSize={pageSize}
          onSort={onSort}
          onPageChange={onPageChange}
          page={page}
          sort={sort}
          totalPages={totalPages}
          totalElements={totalElements}
        />
      </section>
    )
  }
}

export default ReportSchedulationTable
