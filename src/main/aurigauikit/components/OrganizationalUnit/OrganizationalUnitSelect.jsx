import React, { useState, useCallback } from 'react'
import OrganizationalUnitModal from './OrganizationalUnitModal/OrganizationalUnitModal'
import { injectIntl } from 'react-intl'
import messages from './messages'
import OrganizationalUnit from './OrganizationalUnit'
import Select2 from 'aurigauikit/components/Select2'

const OuSelect = ({
  selectedElements = [],
  defaultSelection,
  disabled,
  datasource,
  radioOptions,
  selectedItem,
  multiple,
  intl,
  selectableType = 'multiple',
  placeholder = defaultSelection ? '' : intl.formatMessage(messages.type.placeholder),
  onSelectionChange = () => true,
  onSelect = () => {},
  canSelect = () => true,
}) => {
  const isMultiple = multiple && selectableType === 'multiple'
  const [show, setShow] = useState(false)
  const confirm = selectedElements => {
    if (onSelectionChange) onSelectionChange(selectedElements)
    setShow(false)
  }

  const unselect = item => {
    const index = selectedElements.findIndex(a => a.type === item.type && a.id === item.id)
    const items = [...selectedElements]
    items.splice(index, 1)
    onSelectionChange(items.length > 0 ? items : defaultSelection ? [defaultSelection] : [])
  }

  const canUnselect = item =>
    defaultSelection
      ? !(
          selectedElements.length === 1 &&
          (item.type === defaultSelection.type && item.id === defaultSelection.id)
        )
      : true

  const display = useCallback(v => `${v.description} ${v.code ? `(${v.code})` : ''}`, [])

  const disabledItem = disabled && defaultSelection ? defaultSelection : selectedItem

  return disabled ? (
    <input
      type="text"
      disabled
      style={{ width: '100%' }}
      value={
        disabledItem
          ? `${intl.formatMessage(messages.type[disabledItem.type])} - ${
              disabledItem.description
            } ${disabledItem.code ? `(${disabledItem.code})` : ''}`
          : placeholder || intl.formatMessage(messages.type.placeholder)
      }
    />
  ) : (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      {show && (
        <OrganizationalUnitModal
          show
          onConfirm={confirm}
          onSelect={e => {
            onSelectionChange(e)
            onSelect(e[e.length - 1])
          }}
          onSelectAborting={e => onSelectionChange(e)}
          defaultSelection={defaultSelection}
          radioOptions={radioOptions}
          datasource={datasource}
          canSelect={canSelect}
          selectableType={selectableType}
          selectedElements={selectedElements}
          onRemove={unselect}
          canRemove={canUnselect}
          onClose={() => setShow(false)}
        />
      )}
      {isMultiple ? (
        selectedElements.length === 0 ? (
          <Placeholder placeholder={placeholder} />
        ) : selectedElements.length === 1 ? (
          <Single element={selectedElements[0]} />
        ) : (
          <OrganizationalUnit data={selectedElements} onRemove={unselect} canRemove={canUnselect} />
        )
      ) : selectedElements.length === 0 ? (
        <Placeholder placeholder={placeholder} />
      ) : selectedElements.length === 1 && (!placeholder || selectableType === 'single') ? (
        <Single element={selectedElements[0]} />
      ) : (
        <Select2
          data={placeholder ? [placeholder, ...selectedElements] : selectedElements}
          value={selectedItem || placeholder}
          didSelect={o => (o === placeholder ? onSelect(null) : onSelect(o))}
          willDisplay={d => (placeholder === d ? d : display(d))}
          style={{
            width: '100%',
            color: (!selectedItem || selectedItem === placeholder) && '#aaa',
          }}
        />
      )}
      <ModalButton onClick={() => setShow(true)} />
    </div>
  )
}

const Placeholder = injectIntl(({ placeholder, intl }) => (
  <input
    type="text"
    disabled
    style={{ width: '100%', backgroundColor: '#fff', color: '#aaa' }}
    value={placeholder || intl.formatMessage(messages.type.placeholder)}
  />
))

const Single = injectIntl(({ element, intl }) => (
  <input
    type="text"
    disabled
    style={{ width: '100%', backgroundColor: '#fff' }}
    value={
      element
        ? `${
            messages.type[element.type]
              ? intl.formatMessage(messages.type[element.type])
              : element.type
          } - ${element.description} ${element.code ? `(${element.code})` : ''}`
        : ''
    }
  />
))

const ModalButton = ({ onClick }) => {
  const style = {
    marginLeft: '10px',
    padding: '0 0.8em',
    height: '2.8em',
    cursor: 'pointer',
  }
  return (
    <a style={style} className="btn btn-primary" onClick={() => onClick()}>
      <i
        className="fa fa-bank"
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '2px',
          lineHeight: '32px',
          cursor: 'pointer',
          margin: '0',
        }}
      />
    </a>
  )
}

export default injectIntl(OuSelect)
