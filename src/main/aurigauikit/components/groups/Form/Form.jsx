import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import messages from "./messages"
import InfoLabel from "aurigauikit/components/InfoLabel"
import { Grid, Div } from "aurigauikit/components/Grid"
import { Form } from "aurigauikit/components/parsley"
import OrganizationalUnitModal from "aurigauikit/components/OrganizationalUnit/OrganizationalUnitModal"
import Checkbox from "aurigauikit/components/Checkbox"

const PARENT_BANK = "PARENT_BANK"
const BANK = "BANK"
const AREA = "AREA"
const BRANCH = "BRANCH"

export default class extends React.Component {
  state = { selectedElements: [], adding: false }

  add = () => this.setState({ adding: true })

  undoAdd = () => this.setState({ adding: false })

  changeCode = code => this.props.onChange({ code })

  changeDescription = description => this.props.onChange({ description })

  confirmSelection = selectedElements => {
    this.setState(
      { adding: false, selectedElements },
      () => this.props.onAdd && this.props.onAdd(selectedElements)
    )
  }

  submit = () => {
    const { code, description, notPublic, onSave } = this.props
    if (onSave) onSave({ code, description, notPublic })
  }

  changePrivate = notPublic => this.props.onChange({ notPublic })

  canSelect = ({ type }) => {
    const { groupType } = this.props
    const selectable = {
      [PARENT_BANK]: type === PARENT_BANK,
      [BANK]: type === PARENT_BANK || type === BANK,
      [AREA]: type === PARENT_BANK || type === BANK || type === AREA,
      [BRANCH]: type === PARENT_BANK || type === BANK || type === AREA || type === BRANCH
    }
    return selectable[groupType] || true
  }

  render() {
    const {
      organizationalUnitDatasource,
      mode,
      group,
      items,
      onAbort,
      loading,
      getSelectedElements,
      code,
      description,
      notPublic,
      children,
      saving
    } = this.props

    return (
      <Form onSubmit={this.submit}>
        <Grid style={{ overflow: "initial" }}>
          <Div col="1-4">
            <Code mode={mode} code={code} onChange={this.changeCode} />
          </Div>
          <Div col="1-2">
            <Description mode={mode} description={description} onChange={this.changeDescription} />
          </Div>
          <Div col="1-4">
            <Private mode={mode} checked={notPublic} onChange={this.changePrivate} />
          </Div>
        </Grid>
        <section style={{ paddingBottom: 20, marginTop: mode === "view" && 40 }}>
          {mode !== "view" && <AddButton disabled={loading} onClick={this.add} />}
          {children}
          <OrganizationalUnitModal
            show={this.state.adding}
            onSelectionConfirmed={this.confirmSelection}
            datasource={organizationalUnitDatasource}
            dataComparator={(e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id}
            onSelectionAborted={this.undoAdd}
            selectedElements={
              getSelectedElements ? getSelectedElements() : this.state.selectedElements
            }
            canSelect={this.canSelect}
          />
        </section>
        {mode !== "view" && (
          <div className="btn-group" style={{ marginTop: 20 }}>
            <SaveButton disabled={items.length === 0 || loading} saving={saving} />
            <UndoButton onClick={onAbort} saving={saving} />
          </div>
        )}
        {mode === "view" && (
          <div className="btn-group" style={{ marginTop: 20 }}>
            <BackButton onClick={onAbort} />
          </div>
        )}
      </Form>
    )
  }
}

const UndoButton = ({ onClick, saving }) => (
  <button
    className="btn btn-warning-outline"
    type="button"
    disabled={saving}
    style={{ marginRight: "20px", float: "right" }}
    onClick={onClick}>
    <Msg {...messages.undo} />
  </button>
)

const BackButton = ({ onClick }) => (
  <button
    className="btn btn-primary-outline"
    type="button"
    style={{ float: "right" }}
    onClick={onClick}>
    <Msg {...messages.back} />
  </button>
)

const SaveButton = ({ disabled, saving }) => (
  <button
    className="btn btn-confirmatory"
    disabled={disabled || saving}
    style={{ float: "right" }}
    type="submit">
    {saving ? <Msg {...messages.saving} /> : <Msg {...messages.save} />}
  </button>
)

const Private = ({ checked, onChange, mode }) => {
  return mode === "view" ? (
    <InfoLabel label={<Msg {...messages.private} />}>
      {checked ? (
        <i className="fa fa-check" style={{ marginRight: 15 }} />
      ) : (
        <i className="fa fa-remove" style={{ marginRight: 15 }} />
      )}
    </InfoLabel>
  ) : (
    <Checkbox style={{ float: "left", marginTop: 26 }} isChecked={checked} onChange={onChange}>
      <Msg {...messages.private} />
    </Checkbox>
  )
}

const AddButton = ({ disabled, onClick }) => (
  <button
    disabled={disabled}
    type="button"
    style={{
      marginTop: 40,
      float: "right",
      marginBottom: 10
    }}
    className="btn btn-primary"
    onClick={onClick}>
    <i className="fa fa-bank" style={{ marginRight: 15 }} />
    <Msg {...messages.add} />
  </button>
)

const Code = ({ mode, code, onChange }) => {
  return mode === "view" ? (
    <InfoLabel label={<Msg {...messages.code} />}>{code}</InfoLabel>
  ) : (
    <label>
      <Msg {...messages.code} />
      <input
        required
        className="filter-element"
        style={{ width: "100%" }}
        type="text"
        value={code}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  )
}

const Description = ({ mode, description, onChange }) => {
  return mode === "view" ? (
    <InfoLabel label={<Msg {...messages.description} />}>{description}</InfoLabel>
  ) : (
    <label>
      <Msg {...messages.description} />
      <input
        required
        className="filter-element"
        style={{ width: "100%" }}
        type="text"
        value={description}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  )
}
