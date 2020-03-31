import React, { useMemo, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from '../../Modal'
import messages from '../messages'
import InlineOrganizationalUnit from '../InlineOrganizationalUnit'

const dataComparator = (e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id
const isEqual = (a, b) => a.reduce((equal, a, i) => equal && dataComparator(a, b[i]), true)

const OuModal = ({
  show,
  selectedElements,
  defaultSelection,
  onClose = () => {},
  onSelect = () => {},
  onSelectionConfirmed = () => {},
  onSelectionAborted = () => {},
  onSelectAborting = onSelect,
  ...props
}) => {
  const intitialData = useRef(selectedElements)

  const touched = useMemo(() => !isEqual(selectedElements, intitialData.current), [
    selectedElements,
  ])

  const canReset = useMemo(() => {
    if (defaultSelection && selectedElements.find(a => dataComparator(a, defaultSelection)))
      return selectedElements.length > 1
    return selectedElements.length > 0
  }, [defaultSelection, selectedElements])

  const close = () => {
    onSelectAborting(intitialData.current)
    onClose()
    onSelectionAborted()
  }

  const abort = () => {
    onSelectAborting(intitialData.current)
    onClose()
    onSelectionAborted()
  }

  const confirm = () => {
    onClose()
    onSelectionConfirmed(selectedElements)
  }

  const title = (
    <span>
      <FormattedMessage {...messages.general.title} />
    </span>
  )

  return (
    <Modal show={show} style={{ width: '70%' }} onClose={close}>
      <Modal.Header title={title}>
        <div style={{ marginRight: -10, marginTop: -40 }}>
          <ResetButton
            disabled={!canReset}
            onClick={() => onSelect(defaultSelection ? [defaultSelection] : [])}
          />
        </div>
      </Modal.Header>
      <Modal.Content>
        <InlineOrganizationalUnit
          {...props}
          selectedElements={selectedElements}
          defaultSelection={defaultSelection}
          onSelect={onSelect}
        />
        <div style={{ float: 'right', marginTop: 20 }}>
          <AbortButton onClick={abort} />
          <ConfirmButton disabled={!touched} onClick={confirm} />
        </div>
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  )
}

const ResetButton = ({ disabled, onClick }) => {
  const style = {
    float: 'right',
    fontWeight: 'bold',
    margin: 10,
    lineHeight: 'inherit',
    fontSize: '0.8em',
  }
  return (
    <button
      disabled={disabled}
      className="btn btn-primary-outline"
      style={style}
      onClick={() => onClick()}
    >
      <FormattedMessage {...messages.modal.general.reset} />
    </button>
  )
}

const AbortButton = ({ onClick }) => (
  <button
    className="btn btn-warning-outline"
    style={{ marginRight: '20px' }}
    onClick={() => onClick()}
  >
    <FormattedMessage {...messages.modal.general.cancel} />
  </button>
)

const ConfirmButton = ({ disabled, onClick }) => (
  <button disabled={disabled} className="btn btn-confirmatory" onClick={() => onClick()}>
    <FormattedMessage {...messages.modal.general.select} />
  </button>
)

export default OuModal
