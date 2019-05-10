<<<<<<< HEAD
import React from 'react'
import OrganizationalUnitModal from './OrganizationalUnitModal/OrganizationalUnitModal'
import Select2 from '../Select2'
import { injectIntl } from 'react-intl'
import isEqual from 'lodash/isEqual'
import messages from './messages'

const show = org => (org.description ? org.description + ' (' + org.code + ')' : org.code)

class OrganizationalUnitSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectedElements:
        this.props.selectedElements ||
        (this.props.defaultSelection ? [this.props.defaultSelection] : []),
      selectedItem: this.props.selectedItem || this.props.defaultSelection,
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
    canSelect: () => true,
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
          this.props.all && this.state.selectedElements.length > 1 ? 'ALL' : selectedElements[0]
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
      intl,
    } = this.props
    const style = {
      display: 'inline-flex',
      width: '100%',
    }

    const allMessage = intl.formatMessage(messages.type.ALL)

    const typeMessage = ({ type, description, code }) =>
      `${intl.formatMessage(messages.type[type])} - ${description} (${code})`

    const display = element =>
      element === 'ALL'
        ? allMessage
        : this.isDefault(element) && !this.isEqual(element, this.state.selectedItem)
        ? '[DEFAULT] ' + typeMessage(element)
        : typeMessage(element)
    show
    return disabled ? (
      <input
        type="text"
        disabled
        style={{ width: '100%', backgroundColor: '#fff' }}
        value={`${intl.formatMessage(messages.type[defaultSelection.type])} - ${show(
          defaultSelection
        )}`}
      />
    ) : (
      <div style={style}>
=======
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
  onSelectionChange = () => true,
  onSelect = () => {},
  canSelect = () => true,
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
      style={{ width: '100%', backgroundColor: '#fff' }}
      value={`${intl.formatMessage(messages.type[defaultSelection.type])} - ${
        defaultSelection.description
      } (${defaultSelection.code})`}
    />
  ) : (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      {show && (
>>>>>>> 79693f0685e43a40306dc4adf3e65ae2cf8f6026
        <OrganizationalUnitModal
          show
          onConfirm={confirm}
          onSelect={e => {
            onSelectionChange(e)
            onSelect(e[e.length - 1])
          }}
          defaultSelection={defaultSelection}
          radioOptions={radioOptions}
          datasource={datasource}
          canSelect={canSelect}
          selectedElements={selectedElements}
          onRemove={unselect}
          canRemove={canUnselect}
          onAbort={() => setShow(false)}
        />
<<<<<<< HEAD
        {this.state.selectedElements.length === 1 ? (
          <input
            type="text"
            disabled
            style={{ width: '100%', backgroundColor: '#fff' }}
            value={`${intl.formatMessage(
              messages.type[this.state.selectedElements[0].type]
            )} - ${show(this.state.selectedElements[0])}`}
          />
        ) : (
          <Select2
            style={{ width: '100%' }}
            data={all ? ['ALL', ...this.state.selectedElements] : this.state.selectedElements}
            willDisplay={this.props.willDisplay || display}
            value={this.state.selectedItem}
            options={{
              placeholder: this.props.placeHolder || intl.formatMessage(messages.type.placeholder),
            }}
            didSelect={element => this.onSelect(element)}
          />
        )}
        {groupable && this.state.selectedElements.length > 1 && (
          <GroupButton onClick={() => this.onShow()} />
        )}
        <ModalButton onClick={() => this.onShow()} />
      </div>
    )
  }
=======
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
          style={{ width: '100%' }}
        />
      )}
      <ModalButton onClick={() => setShow(true)} />
    </div>
  )
>>>>>>> 79693f0685e43a40306dc4adf3e65ae2cf8f6026
}

const Single = injectIntl(({ element, intl }) => (
  <input
    type="text"
    disabled
    style={{ width: '100%', backgroundColor: '#fff' }}
    value={`${intl.formatMessage(messages.type[element.type])} - ${element.description} (${
      element.code
    })`}
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
<<<<<<< HEAD
        }}
      />
    </a>
  )
}

const GroupButton = ({ onClick }) => {
  const style = {
    marginLeft: '10px',
    padding: '0 0.8em',
    height: '2.8em',
    cursor: 'pointer',
  }
  return (
    <a style={style} className="btn btn-confirmatory-outline" onClick={() => onClick()}>
      <i
        className="fa fa-compress"
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '2px',
          lineHeight: '32px',
          cursor: 'pointer',
          margin: '0',
=======
>>>>>>> 79693f0685e43a40306dc4adf3e65ae2cf8f6026
        }}
      />
    </a>
  )
}

export default injectIntl(OuSelect)
