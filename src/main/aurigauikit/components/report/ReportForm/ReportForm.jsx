import React, { Fragment } from 'react'
import { FormattedMessage as Msg, injectIntl } from 'react-intl'
import { Grid, Div } from 'aurigauikit/components/Grid'
import Select2 from 'aurigauikit/components/Select2'
import OrganizationalUnitSelect from 'aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect'
import DatePicker from 'aurigauikit/components/DatePicker'
import moment from 'moment'
import messages from './messages'
import schedulerMessages from '../../Scheduler/messages'

const initialState = {
  reportName: '',
  template: null,
  organizationalUnit: null,
  organizationalUnits: [],
  startDate: null,
  endDate: null,
}

export default class extends React.Component {
  static initialState = initialState

  componentDidMount() {
    const { data, organizationalUnitProps } = this.props
    this.change({
      ...{ ...initialState, ...data },
      organizationalUnit: organizationalUnitProps.defaultSelection,
      organizationalUnits: [organizationalUnitProps.defaultSelection],
    })
  }

  change = data => {
    const { data: oldData, onChange } = this.props
    const newData = { ...{ ...initialState, ...oldData }, ...data }
    onChange(newData)
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
  changeEndDate = endDate => this.change({ endDate })

  render() {
    const { data, onUndo, onConfirm, organizationalUnitProps, saving, loading } = this.props
    if (!data) return null
    const { templates, template, reportName, organizationalUnits, startDate, endDate } = data
    const showDates = !template || template.dates !== false
    return (
      <Fragment>
        <div style={{ padding: 20, backgroundColor: '#fafafa' }}>
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
            <Div col="3-12">
              <StartDate
                disabled={!showDates}
                onChange={this.changeStartDate}
                startDate={startDate}
                endDate={endDate}
              />
            </Div>
            <Div col="3-12">
              <EndDate
                disabled={!showDates}
                onChange={this.changeEndDate}
                startDate={startDate}
                endDate={endDate}
              />
            </Div>
          </Grid>
        </div>
        <div style={{ float: 'right', marginTop: 20 }}>
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

const StartDate = ({ disabled, onChange, startDate, endDate }) => (
  <Fragment>
    <label style={{ marginTop: 12 }}>
      <Msg {...messages.startDate} />
    </label>
    {startDate && (
      <DatePicker
        selectsStart
        selected={startDate && moment(startDate)}
        startDate={startDate && moment(startDate)}
        endDate={endDate && moment(endDate)}
        maxDate={(endDate && moment(endDate)) || moment()}
        onChange={onChange}
        disabled={disabled}
      />
    )}
    {!startDate && (
      <DatePicker
        selectsStart
        startDate={startDate && moment(startDate)}
        endDate={endDate && moment(endDate)}
        maxDate={(endDate && moment(endDate)) || moment()}
        onChange={onChange}
        disabled={disabled}
        required={!disabled}
      />
    )}
  </Fragment>
)
let last = null
const buggyRemoveValidationMessagesKey = date => {
  let value = moment(date)
    .dayOfYear(0)
    .month(0)
    .year(0)
    .second(0)
    .millisecond(0)
    .valueOf()
  if (!last || !date) value = 'INIT'
  last = date
  return value
}

const EndDate = injectIntl(({ disabled, onChange, startDate, endDate, intl }) => (
  <Fragment>
    <label style={{ marginTop: 12 }}>
      <Msg {...messages.endDate} />
    </label>
    {endDate && (
      <div key={buggyRemoveValidationMessagesKey(endDate)}>
        <DatePicker
          selectsEnd
          startDate={startDate && moment(startDate)}
          endDate={endDate && moment(endDate)}
          minDate={startDate && moment(startDate)}
          maxDate={moment()}
          selected={endDate && moment(endDate)}
          onChange={onChange}
          customInput={
            endDate && (
              <input
                min={startDate ? moment(startDate).valueOf() : 0}
                max={moment()}
                data-validation-range-message={
                  endDate < startDate
                    ? intl.formatMessage(schedulerMessages.validations.endGreater)
                    : intl.formatMessage(messages.endGreater)
                }
                data-validation-value={endDate && moment(endDate).valueOf()}
              />
            )
          }
          disabled={disabled}
          required={!disabled}
        />
      </div>
    )}
    {!endDate && (
      <div key={buggyRemoveValidationMessagesKey(endDate)}>
        <DatePicker
          selectsEnd
          startDate={startDate && moment(startDate)}
          endDate={endDate && moment(endDate)}
          minDate={startDate && moment(startDate)}
          maxDate={moment()}
          onChange={onChange}
          disabled={disabled}
          required={!disabled}
        />
      </div>
    )}
  </Fragment>
))
