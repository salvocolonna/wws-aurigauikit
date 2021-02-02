import React, { Fragment } from 'react'
import { FormattedMessage as Msg } from 'react-intl'
import { Grid, Div } from 'aurigauikit/components/Grid'
import Select2 from 'aurigauikit/components/Select2'
import OrganizationalUnitSelect from 'aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect'
import Scheduler from 'aurigauikit/components/Scheduler'
import messages from './messages'

const { data: scheduler } = Scheduler.defaultProps

export const defaultProps = {
  data: {
    reportName: '',
    template: null,
    organizationalUnit: null,
    organizationalUnits: [],
    startDate: null,
    duration: 0,
    previousMonth: true,
    scheduler,
  },
}

export default class extends React.Component {
  static defaultProps = defaultProps

  componentDidMount() {
    const { organizationalUnitProps } = this.props
    this.change({
      organizationalUnit: organizationalUnitProps.defaultSelection,
      organizationalUnits: [organizationalUnitProps.defaultSelection],
    })
  }

  change = data => {
    const { data: oldData, onChange } = this.props
    if (onChange) onChange({ ...oldData, ...data })
  }

  changeReportName = reportName => this.change({ reportName })

  changeTemplate = template => {
    const { organizationalUnitProps } = this.props
    this.change({
      template,
      organizationalUnit: organizationalUnitProps.defaultSelection,
      organizationalUnits: [organizationalUnitProps.defaultSelection],
    })
  }

  changeOrganizationalUnits = organizationalUnits => this.change({ organizationalUnits })

  changeStartDate = startDate => this.change({ startDate })

  changeDuration = duration => this.change({ duration })

  changePreviousMonth = previousMonth => this.change({ previousMonth })

  changeScheduler = scheduler => this.change({ scheduler })

  render() {
    const { data, onUndo, onConfirm, organizationalUnitProps, saving, loading, mode } = this.props
    const { templates, template, reportName, organizationalUnits, scheduler } = data
    return (
      <Fragment>
        <div style={{ padding: 20, backgroundColor: '#fafafa' }}>
          <section>
            <Grid style={{ overflow: 'inherit' }}>
              <Div col="1-2">
                <Template
                  loading={loading}
                  onChange={this.changeTemplate}
                  template={template}
                  templates={templates}
                />
              </Div>
              <Div col="1-2">
                <label style={{ marginTop: 12 }}>
                  <Msg {...messages.organizationalUnit} />
                </label>
                <OrganizationalUnitSelect
                  selectedElements={organizationalUnits}
                  onSelectionChange={this.changeOrganizationalUnits}
                  {...organizationalUnitProps}
                />
              </Div>
              <Div col="1-2">
                <ReportName reportName={reportName} onChange={this.changeReportName} />
              </Div>
            </Grid>
          </section>
          <section>
            <h3>
              <Msg {...messages.schedulation} />
            </h3>
            <Scheduler
              existing={mode === 'edit'}
              data={{ ...scheduler }}
              onChange={this.changeScheduler}
              recurrings={['NEVER', 'DAILY', 'WEEKLY', 'MONTHLY']}
            />
          </section>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Undo onClick={onUndo} disabled={saving} />
          <Confirm onClick={onConfirm} disabled={saving || loading} saving={saving} />
        </div>
      </Fragment>
    )
  }
}

const Undo = ({ onClick, disabled }) => (
  <button
    type="button"
    className="btn btn-warning-outline"
    onClick={onClick}
    disabled={disabled}
    style={{ marginTop: 20 }}
  >
    <Msg {...messages.undo} />
  </button>
)

const Confirm = ({ onClick, disabled, saving }) => (
  <button
    className="btn btn-confirmatory"
    type="submit"
    style={{ marginLeft: 20, marginTop: 20 }}
    disabled={disabled}
    onClick={onClick}
  >
    {saving ? <Msg {...messages.saving} /> : <Msg {...messages.confirm} />}
  </button>
)

const ReportName = ({ onChange, reportName }) => (
  <label style={{ marginTop: 12 }}>
    <Msg {...messages.reportName} />
    <input
      style={{ width: '100%' }}
      type="text"
      onChange={e => onChange(e.target.value)}
      value={reportName}
      required
    />
  </label>
)

const Template = ({ onChange, template, templates, loading }) => (
  <label style={{ margin: 0, marginTop: 12 }}>
    <Msg {...messages.template} />
    <Select2
      style={{ width: '100%' }}
      disabled={loading}
      data={templates}
      loading={loading}
      value={template}
      willDisplay={template => template.name}
      didSelect={onChange}
    />
  </label>
)
