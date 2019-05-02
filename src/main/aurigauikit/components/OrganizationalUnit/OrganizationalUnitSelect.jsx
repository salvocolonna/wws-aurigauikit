import React from "react"
import OrganizationalUnitModal from "./OrganizationalUnitModal/OrganizationalUnitModal"
import Select2 from "../Select2/Select2ReWrapper"
import { injectIntl } from "react-intl"
import isEqual from "lodash/isEqual"
import messages from "./messages"

const show = org => (org.description ? org.description + " (" + org.code + ")" : org.code)

class OrganizationalUnitSelect extends React.Component {
  state = {
    showModal: false,
    selectedElements: this.props.defaultSelection ? [this.props.defaultSelection] : []
  }

  static defaultProps = {
    dataComparator: (e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id,
    canSelect: () => true
  }

  onShow() {
    this.setState({ showModal: true })
  }

  onAbort() {
    this.setState({ showModal: false })
  }

  onConfirm(selectedElements) {
    const previousSelectedElements = this.props.selectedElements || this.state.selectedElements
    const newElements = this.props.multiple
      ? [
          ...this.props.selectedItem,
          ...selectedElements.filter(
            ({ id, type }) => !previousSelectedElements.find(e => e.id === id && e.type === type)
          )
        ]
      : selectedElements

    this.setState({ showModal: false, selectedElements }, () => {
      if (this.props.onSelectionChange) this.props.onSelectionChange(selectedElements)
      if (this.props.onSelect)
        this.props.onSelect(
          this.props.all && newElements.length > 1
            ? "ALL"
            : this.props.multiple
            ? newElements
            : newElements[0]
        )
    })
  }

  onSelect(element) {
    if (this.props.onSelect) this.props.onSelect(element)
  }

  isDefault = element => {
    const { defaultSelection } = this.props
    return this.isEqual(element, defaultSelection)
  }

  isEqual = ({ type, id }, other) => {
    return type && other && type === other.type && id === other.id
  }

  render() {
    const {
      disabled,
      datasource,
      defaultSelection,
      canSelect,
      dataComparator,
      radioOptions,
      groupable,
      all,
      multiple,
      intl
    } = this.props
    const style = {
      display: "inline-flex",
      width: "100%"
    }

    const selectedElements = this.props.selectedElements || this.state.selectedElements

    const allMessage = intl.formatMessage(messages.type.ALL)

    const typeMessage = ({ type, description, code }) =>
      `${intl.formatMessage(messages.type[type])} - ${description} (${code})`

    const display = element =>
      element === "ALL"
        ? allMessage
        : this.isDefault(element) && !this.isEqual(element, this.props.selectedItem)
        ? "[DEFAULT] " + typeMessage(element)
        : typeMessage(element)

    return disabled ? (
      <input
        type="text"
        disabled
        style={{ width: "100%", backgroundColor: "#fff" }}
        value={`${intl.formatMessage(messages.type[defaultSelection.type])} - ${show(
          defaultSelection
        )}`}
      />
    ) : (
      <div style={style}>
        <OrganizationalUnitModal
          groupable={groupable}
          show={this.state.showModal}
          onSelectionConfirmed={selectedElements => this.onConfirm(selectedElements)}
          onReset={() => this.onReset()}
          datasource={datasource}
          canSelect={element => canSelect(element)}
          selectedElements={selectedElements}
          defaultSelection={defaultSelection}
          dataComparator={dataComparator}
          onSelectionAborted={() => this.onAbort()}
          radioOptions={radioOptions}
        />
        {selectedElements.length === 1 ? (
          <input
            type="text"
            disabled
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={`${intl.formatMessage(messages.type[selectedElements[0].type])} - ${show(
              selectedElements[0]
            )}`}
          />
        ) : multiple && this.props.selectedItem.length === 1 ? (
          <Select2
            style={{ width: "100%" }}
            data={all ? ["ALL", ...selectedElements] : selectedElements}
            willDisplay={this.props.willDisplay || display}
            value={this.props.selectedItem[0]}
            options={{
              placeholder: this.props.placeHolder || intl.formatMessage(messages.type.placeholder)
            }}
            didSelect={element => this.onSelect([this.props.selectedItem[0], element])}
          />
        ) : (
          <Select2
            key="single"
            style={{ width: "100%" }}
            data={all ? ["ALL", ...selectedElements] : selectedElements}
            willDisplay={this.props.willDisplay || display}
            value={this.props.selectedItem}
            options={{
              placeholder: this.props.placeHolder || intl.formatMessage(messages.type.placeholder)
            }}
            multiple={multiple}
            didSelect={element => this.onSelect(element)}
          />
        )}
        {groupable && selectedElements.length > 1 && <GroupButton onClick={() => this.onShow()} />}
        <ModalButton onClick={() => this.onShow()} />
      </div>
    )
  }
}

const ModalButton = ({ onClick }) => {
  const style = {
    marginLeft: "10px",
    padding: "0 0.8em",
    height: "2.8em",
    cursor: "pointer"
  }
  return (
    <a style={style} className="btn btn-primary" onClick={() => onClick()}>
      <i
        className="fa fa-bank"
        style={{
          width: "100%",
          textAlign: "center",
          padding: "2px",
          lineHeight: "32px",
          cursor: "pointer",
          margin: "0"
        }}
      />
    </a>
  )
}

const GroupButton = ({ onClick }) => {
  const style = {
    marginLeft: "10px",
    padding: "0 0.8em",
    height: "2.8em",
    cursor: "pointer"
  }
  return (
    <a style={style} className="btn btn-confirmatory-outline" onClick={() => onClick()}>
      <i
        className="fa fa-compress"
        style={{
          width: "100%",
          textAlign: "center",
          padding: "2px",
          lineHeight: "32px",
          cursor: "pointer",
          margin: "0"
        }}
      />
    </a>
  )
}

export default injectIntl(OrganizationalUnitSelect)
