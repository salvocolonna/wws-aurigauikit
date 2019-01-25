import React from "react"
import OrganizationalUnitModal from "./OrganizationalUnitModal/OrganizationalUnitModal"
import Select2 from "../Select2/Select2ReWrapper"
import { injectIntl } from "react-intl"
import isEqual from "lodash/isEqual"
import messages from "./messages"

const show = org => (org.description ? org.description + " (" + org.code + ")" : org.code)

class OrganizationalUnitSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectedElements:
        this.props.selectedElements ||
        (this.props.defaultSelection ? [this.props.defaultSelection] : []),
      selectedItem: this.props.selectedItem || this.props.defaultSelection
    }
  }

  componentWillReceiveProps(props) {
    if (
      this.props.selectedElements &&
      (!isEqual(props.selectedElements, this.props.selectedElements) ||
        !isEqual(props.selectedElements, this.state.selectedElements))
    ) {
      this.setState({ selectedElements: props.selectedElements })
    }
    if (
      this.props.selectedItem &&
      !(
        this.props.selectedItem.type === props.selectedItem.type &&
        this.props.selectedItem.id === props.selectedItem.id
      )
    ) {
      this.setState({ selectedItem: props.selectedItem })
    }
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
    this.setState({ showModal: false, selectedElements, selectedItem: selectedElements[0] }, () => {
      if (this.props.onSelectionChange) this.props.onSelectionChange(selectedElements)
      if (this.props.onSelect)
        this.props.onSelect(
          this.props.all && this.state.selectedElements.length > 1 ? "ALL" : selectedElements[0]
        )
    })
  }

  onSelect(element) {
    this.setState({ selectedItem: element }, () => {
      if (this.props.onSelect) this.props.onSelect(element)
    })
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
      intl
    } = this.props
    const style = {
      display: "inline-flex",
      width: "100%"
    }

    const allMessage = intl.formatMessage(messages.type.ALL)

    const typeMessage = ({ type, description, code }) =>
      `${intl.formatMessage(messages.type[type])} - ${description} (${code})`

    const display = element =>
      element === "ALL"
        ? allMessage
        : this.isDefault(element) && !this.isEqual(element, this.state.selectedItem)
          ? "[DEFAULT] " + typeMessage(element)
          : typeMessage(element)
    show
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
          selectedElements={this.state.selectedElements}
          defaultSelection={defaultSelection}
          dataComparator={dataComparator}
          onSelectionAborted={() => this.onAbort()}
          radioOptions={radioOptions}
        />
        {this.state.selectedElements.length === 1 ? (
          <input
            type="text"
            disabled
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={`${intl.formatMessage(
              messages.type[this.state.selectedElements[0].type]
            )} - ${show(this.state.selectedElements[0])}`}
          />
        ) : (
          <Select2
            style={{ width: "100%" }}
            data={all ? ["ALL", ...this.state.selectedElements] : this.state.selectedElements}
            willDisplay={this.props.willDisplay || display}
            value={this.state.selectedItem}
            options={{
              placeholder: this.props.placeHolder || intl.formatMessage(messages.type.placeholder)
            }}
            didSelect={element => this.onSelect(element)}
          />
        )}
        {groupable &&
          this.state.selectedElements.length > 1 && <GroupButton onClick={() => this.onShow()} />}
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
