import React, { Fragment } from "react"
import { FormattedMessage as Msg } from "react-intl"
import { Grid, Div } from "aurigauikit/components/Grid"
import Select2 from "aurigauikit/components/Select2"
import OrganizationalUnitSelect from "aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect"
import DatePicker from "aurigauikit/components/DatePicker"
import Checkbox from "aurigauikit/components/Checkbox"
import { toExpression } from "aurigauikit/components/Scheduler/utils"
import Scheduler from "aurigauikit/components/Scheduler"
import moment from "moment"
import messages from "./messages"

const { data: scheduler } = Scheduler.defaultProps
const { cronExp } = toExpression(scheduler)

export const defaultProps = {
  data: {
    reportName: "",
    template: null,
    organizationalUnit: null,
    organizationalUnits: [],
    startDate: null,
    duration: 0,
    previousMonth: false,
    scheduler,
    cron: cronExp
  }
}

export default class extends React.Component {
  static defaultProps = defaultProps

  componentDidMount() {
    const { organizationalUnitProps } = this.props
    this.change({
      organizationalUnit: organizationalUnitProps.defaultSelection,
      organizationalUnits: [organizationalUnitProps.defaultSelection]
    })
  }

  change = data => {
    const { data: oldData, onChange } = this.props
    if (onChange) onChange({ ...oldData, ...data })
  }

  changeReportName = reportName => this.change({ reportName })

  changeTemplate = template => this.change({ template })

  changeOrganizationalUnits = organizationalUnits => this.change({ organizationalUnits })

  changeStartDate = startDate => this.change({ startDate })

  changeDuration = duration => this.change({ duration })

  changePreviousMonth = previousMonth => this.change({ previousMonth })

  changeScheduler = (scheduler, cron) => this.change({ scheduler, cron })

  render() {
    const { data, onUndo, onConfirm, organizationalUnitProps, saving, loading, mode } = this.props
    const {
      templates,
      template,
      reportName,
      organizationalUnits,
      startDate,
      duration,
      previousMonth,
      scheduler
    } = data
    return (
      <Fragment>
        <div style={{ padding: 20, backgroundColor: "#fafafa" }}>
          <section>
            <Grid style={{ overflow: "initial" }}>
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
                <Template
                  loading={loading}
                  onChange={this.changeTemplate}
                  template={template}
                  templates={templates}
                />
              </Div>
              <Div col="1-2">
                <ReportName reportName={reportName} onChange={this.changeReportName} />
              </Div>
              <Div col="3-12">
                <StartDate onChange={this.changeStartDate} startDate={startDate} />
              </Div>
              <Div col="1-12">
                <Duration onChange={this.changeDuration} duration={duration} />
              </Div>
              <Div col="2-12">
                <PreviousMonth onChange={this.changePreviousMonth} previousMonth={previousMonth} />
              </Div>
            </Grid>
          </section>
          <section>
            <h3>
              <Msg {...messages.schedulation} />
            </h3>
            <Scheduler
              existing={mode === "edit"}
              data={scheduler}
              onChange={this.changeScheduler}
            />
          </section>
        </div>
        <div style={{ textAlign: "right" }}>
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
    style={{ marginTop: 20 }}>
    <Msg {...messages.undo} />
  </button>
)

const Confirm = ({ onClick, disabled, saving }) => (
  <button
    className="btn btn-confirmatory"
    type="submit"
    style={{ marginLeft: 20, marginTop: 20 }}
    disabled={disabled}
    onClick={onClick}>
    {saving ? <Msg {...messages.saving} /> : <Msg {...messages.confirm} />}
  </button>
)

const ReportName = ({ onChange, reportName }) => (
  <label style={{ marginTop: 12, position: "relative" }}>
    <Msg {...messages.reportName} />
    <input
      style={{ width: "100%" }}
      type="text"
      onChange={e => onChange(e.target.value)}
      value={reportName}
      required
    />
  </label>
)

const Template = ({ onChange, template, templates, loading }) => (
  <label style={{ marginTop: 12 }}>
    <Msg {...messages.template} />
    <Select2
      style={{ width: "100%" }}
      disabled={loading}
      data={templates}
      loading={loading}
      value={template}
      willDisplay={template => template.name}
      didSelect={onChange}
    />
  </label>
)

const StartDate = ({ onChange, startDate }) => (
  <Fragment>
    <label style={{ marginTop: 12 }}>
      <Msg {...messages.startDate} />
    </label>
    {startDate && (
      <DatePicker
        selected={startDate && moment(startDate)}
        maxDate={moment()}
        onChange={onChange}
      />
    )}
    {!startDate && <DatePicker onChange={onChange} required />}
  </Fragment>
)

const Duration = ({ onChange, duration }) => (
  <label style={{ marginTop: 12 }}>
    <Msg {...messages.duration} />
    <input
      style={{ width: "100%" }}
      type="number"
      min="0"
      onChange={e => onChange(e.target.value)}
      value={duration}
    />
  </label>
)

const PreviousMonth = ({ onChange, previousMonth }) => (
  <label style={{ marginTop: 26 }}>
    &nbsp;
    <Checkbox isChecked={previousMonth} onChange={onChange}>
      <Msg {...messages.previousMonth} />
    </Checkbox>
  </label>
)
