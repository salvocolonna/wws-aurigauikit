import React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import SimpleTable from 'aurigauikit/components/SimpleTable'
import DeleteReportModal from './DeleteReportModal'

const ICONS = {
  COMPLETED: 'confirmatory',
  WAITING: 'warning',
  READY: 'info',
  START: 'info',
  IN_CREATION: 'info',
  DELETED: 'critical',
  ERROR: 'critical',
}

const StatusLabel = ({ status }) => (
  <span style={{ textTransform: 'uppercase' }}>
    <span style={{ margin: '0 8px 0 0' }} className={`dot dot-${ICONS[status]}`} />
    <span className="asset-label">
      <FormattedMessage id={'report.report-table.report-state.' + status} />
    </span>
  </span>
)

const headers = [
  { content: <FormattedMessage id="report.report-table.columns.state" /> },
  { content: <FormattedMessage id="report.report-table.report-name.head-table" /> },
  { content: <FormattedMessage id="report.report-table.columns.report-template" /> },
  { content: <FormattedMessage id="report.report-table.columns.period" /> },
  { content: <FormattedMessage id="report.report-table.columns.date" /> },
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
        return <FormattedMessage id={'report.report-table.columns.end-date.unvalued'} />
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
          <FormattedMessage id={'report.schedulation-table.recurrence.NEVER'} />
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

const emptyState = <FormattedMessage id="report.report-table.empty-state" />

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
    const { canInteract } = this.props
    return {
      items: [
        {
          title: <FormattedMessage id="report.report-table.menu.view" />,
          iconName: 'eye',
          hidden: context => context.currentRow && context.currentRow.status !== 'COMPLETED',
          action: context => {
            const report = context.currentRow.contents.find(x => x.type === 'PDF')
            this.props.onPDFView(report.reportContentId)
          },
        },
        {
          title: <FormattedMessage id="report.report-table.menu.download.pdf" />,
          iconName: 'file-pdf-o',
          hidden: context => context.currentRow && context.currentRow.status !== 'COMPLETED',
          action: context => {
            const report = context.currentRow.contents.find(x => x.type === 'PDF')
            this.props.onPDFDownload(report.reportContentId)
          },
        },
        {
          title: <FormattedMessage id="report.report-table.menu.download.csv" />,
          iconName: 'file-text-o',
          hidden: context => context.currentRow && context.currentRow.status !== 'COMPLETED',
          action: context => {
            const report = context.currentRow.contents.find(x => x.type === 'CSV')
            this.props.onCSVDownload(report.reportContentId)
          },
        },
        canInteract && {},
        canInteract && {
          title: <FormattedMessage id="report.report-table.menu.delete" />,
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
        <DeleteReportModal
          show={this.state.showDelete}
          onConfirm={() => this.onDeleteConfirm()}
          onClose={() => this.onDeleteUndo()}
          reportName={deletingReport && deletingReport.report && deletingReport.report.reportName}
        />
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
