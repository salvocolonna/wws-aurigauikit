import React from 'react'
import { FormattedDate, FormattedMessage as Msg } from 'react-intl'
import SimpleTable from 'aurigauikit/components/SimpleTable'
import Prompt from 'aurigauikit/components/Prompt'
import messages from './messages'

const COLORS = {
  COMPLETED: '#65c25a',
  WAITING: '#e98036',
  READY: '#2984c5',
  START: '#2984c5',
  IN_CREATION: '#2984c5',
  DELETED: '#dc402b',
  ERROR: '#dc402b',
}

const StatusLabel = ({ status }) => (
  <span
    className="asset-label"
    style={{ color: `${COLORS[status]}`, fontWeight: 'bold', textTransform: 'uppercase' }}
  >
    <Msg id={'report.report-table.report-state.' + status} />
  </span>
)

const headers = [
  { content: <Msg id="report.report-table.columns.status" /> },
  { content: <Msg id="report.report-table.report-name.head-table" /> },
  { content: <Msg id="report.report-table.columns.report-template" /> },
  { content: <Msg id="report.report-table.columns.period" /> },
  { content: <Msg id="report.report-table.columns.date" /> },
]

const columns = [
  {
    content: report => <StatusLabel status={report.status} />,
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      return report.report.reportName
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      return report.report.template.name
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      if (!report.report.dataSourceParameters.parameters.startCreationDate) {
        return <Msg id={'report.report-table.columns.end-date.unvalued'} />
      } else {
        let startDate = (
          <FormattedDate
            value={new Date(report.report.dataSourceParameters.parameters.startCreationDate)}
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        )
        let endDate = report.report.dataSourceParameters.parameters.endCreationDate ? (
          <FormattedDate
            value={new Date(report.report.dataSourceParameters.parameters.endCreationDate)}
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        ) : (
          <Msg id={'report.schedulation-table.recurrence.NEVER'} />
        )
        return (
          <div>
            {startDate} - {endDate}
          </div>
        )
      }
    },
    cssClass: 'no-wrap',
  },
  {
    content: report => {
      return (
        <FormattedDate
          value={new Date(report.renderingEndDate)}
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

const emptyState = <Msg id="report.report-table.empty-state" />

class ReportListTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: { items: [] },
      showDelete: false,
      deletingReport: null,
    }
  }

  onDeleteConfirm() {
    this.setState({ showDelete: false }, () =>
      this.props.deleteReport(this.state.deletingReport.processId)
    )
  }

  onDeleteUndo() {
    this.setState({ showDelete: false })
  }

  get menu() {
    const { canDelete = true } = this.props
    return {
      items: [
        {
          title: <Msg id="report.report-table.menu.view" />,
          iconName: 'eye',
          hidden: context =>
            !this.props.onPDFView ||
            (context.currentRow && context.currentRow.status !== 'COMPLETED'),
          action: context => {
            const report = context.currentRow.contents.find(x => x.type === 'PDF')
            this.props.onPDFView(report.reportContentId, context.currentRow)
          },
        },
        {
          title: <Msg id="report.report-table.menu.download.pdf" />,
          iconName: 'file-pdf-o',
          hidden: context =>
            !this.props.onPDFDownload ||
            (context.currentRow && context.currentRow.status !== 'COMPLETED'),
          action: context => {
            const report = context.currentRow.contents.find(x => x.type === 'PDF')
            this.props.onPDFDownload(report.reportContentId, context.currentRow)
          },
        },
        {
          title: <Msg id="report.report-table.menu.download.csv" />,
          iconName: 'file-text-o',
          hidden: context =>
            !this.props.onCSVDownload ||
            (context.currentRow && context.currentRow.status !== 'COMPLETED'),
          action: context => {
            const report = context.currentRow.contents.find(x => x.type === 'CSV')
            this.props.onCSVDownload(report.reportContentId, context.currentRow)
          },
        },
        canDelete && {},
        canDelete && {
          title: <Msg id="report.report-table.menu.delete" />,
          iconName: 'trash-o',
          style: 'destructive',
          action: context =>
            this.setState({ showDelete: true, deletingReport: context.currentRow }),
        },
      ].filter(Boolean),
    }
  }

  onSort = sort => {
    let sortParam
    switch (sort.index) {
      case 0:
        sortParam = 'report.reportName'
        break
      case 1:
        sortParam = 'report.template.name'
        break
      case 2:
        sortParam = 'report.schedulingStartDate'
        break
      case 3:
        sortParam = 'status'
        break
      case 4:
        sortParam = 'renderingEndDate'
        break
      default:
        break
    }
    if (sortParam) {
      this.props.onSort(`${sortParam}[${sort.direction}]`)
    }
  }

  static sort = [
    'status',
    'report.reportName',
    'report.template.name',
    'report.schedulingStartDate',
    'renderingEndDate',
  ]

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
    const { deletingReport } = this.state

    return (
      <section>
        <Prompt
          show={this.state.showDelete}
          onConfirm={() => this.onDeleteConfirm()}
          onCancel={() => this.onDeleteUndo()}
          title={<Msg {...messages.title} />}
        >
          <Msg
            values={{
              name: (
                <b>{deletingReport && deletingReport.report && deletingReport.report.reportName}</b>
              ),
            }}
            {...messages.remove}
          />
        </Prompt>
        <SimpleTable
          sortable
          headers={headers}
          columns={columns}
          emptyState={emptyState}
          menu={this.menu}
          loading={loading}
          data={data}
          pageable
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

export default ReportListTable
