import React, { useState, useCallback } from "react"
import OrganizationalUnitModal from "./OrganizationalUnitModal/OrganizationalUnitModal"
import { injectIntl } from "react-intl"
import messages from "./messages"
import OrganizationalUnit from "./OrganizationalUnit"
import Select2 from "aurigauikit/components/Select2"

const OuSelect = ({
  selectedElements = [],
  defaultSelection,
  disabled,
  datasource,
  radioOptions,
  selectedItem,
  multiple,
  intl,
  onSelectionChange = () => true,
  onSelect = () => {},
  canSelect = () => true
}) => {
  const [show, setShow] = useState(false)
  const confirm = selectedElements => {
    if (onSelectionChange) onSelectionChange(selectedElements)
    setShow(false)
  }

  const unselect = item => {
    const index = selectedElements.findIndex(a => a.type === item.type && a.id === item.id)
    const items = [...selectedElements]
    items.splice(index, 1)
    onSelectionChange(items)
  }

  const canUnselect = item =>
    defaultSelection
      ? !(item.type === defaultSelection.type && item.id === defaultSelection.id)
      : true

  const display = useCallback(v => `${v.description} (${v.code})`, [selectedElements, selectedItem])

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
    <div style={{ display: "inline-flex", width: "100%" }}>
      {show && (
        <OrganizationalUnitModal
          show
          onConfirm={confirm}
          onSelectionConfirmed={onSelectionChange}
          defaultSelection={defaultSelection}
          radioOptions={radioOptions}
          datasource={datasource}
          canSelect={canSelect}
          selectedElements={selectedElements}
          onRemove={unselect}
          canRemove={canUnselect}
          onSelectionAborted={() => setShow(false)}
        />
      )}
      {selectedElements.length === 1 ? (
        <Single element={selectedElements[0]} />
      ) : multiple ? (
        <OrganizationalUnit data={selectedElements} onRemove={unselect} canRemove={canUnselect} />
      ) : (
        <Select2
          data={selectedElements}
          value={selectedItem}
          didSelect={onSelect}
          willDisplay={display}
          style={{ width: "100%" }}
        />
      )}
      <ModalButton onClick={() => setShow(true)} />
    </div>
  )
}

const Single = injectIntl(({ element, intl }) => (
  <input
    type="text"
    disabled
    style={{ width: "100%", backgroundColor: "#fff" }}
    value={`${intl.formatMessage(messages.type[element.type])} - ${element.description} (${
      element.code
    })`}
  />
))

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

export default injectIntl(OuSelect)
