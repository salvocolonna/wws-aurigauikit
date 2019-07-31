import React from 'react'
import Modal from 'aurigauikit/components/Modal'
import { FormattedMessage as Msg } from 'react-intl'
import messages from './messages'

interface Props {
  title: string
  children: JSX.Element
  onConfirm: () => void
  onCancel: () => void
  deleting?: boolean
}

function DeleteModal(props: Props) {
  const { title, onConfirm, onCancel, deleting, children } = props

  return (
  <Modal style={{ width: 600, borderColor: '#DC402B' }} onClose={() => onCancel} show>
    <Modal.Header title={title} />
    <Modal.Content>{children}</Modal.Content>
    <Modal.Footer>
      <button onClick={onCancel} className="btn btn-warning-outline" style={{ marginRight: 20 }}>
        <Msg {...messages.cancel} />
      </button>
      <button onClick={() => onConfirm()} className="btn btn-destructive" disabled={deleting}>
        <Msg {...messages.confirm} />
      </button>
    </Modal.Footer>
  </Modal>
  )
}

export default DeleteModal
