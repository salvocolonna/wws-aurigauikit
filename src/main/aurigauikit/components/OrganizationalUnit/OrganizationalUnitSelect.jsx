import React, { useState } from "react"
import OrganizationalUnitModal from "./OrganizationalUnitModal/OrganizationalUnitModal"
import { injectIntl } from "react-intl"
import messages from "./messages"
import OrganizationalUnit from "./OrganizationalUnit"

const OuSelect = ({
  selectedElements,
  defaultSelection,
  onSelectionChange,
  disabled,
  datasource,
  canSelect,
  intl
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
          onSelect={onSelectionChange}
          defaultSelection={defaultSelection}
          datasource={datasource}
          canSelect={canSelect}
          selectedElements={selectedElements}
          onRemove={unselect}
          canRemove={canUnselect}
          onAbort={() => setShow(false)}
        />
      )}
      {selectedElements.length === 1 ? (
        <Single element={selectedElements[0]} />
      ) : (
        <OrganizationalUnit data={selectedElements} onRemove={unselect} canRemove={canUnselect} />
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
