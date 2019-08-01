import React from 'react'
import Modal from 'aurigauikit/components/Modal'
import { FormattedMessage as Msg } from 'react-intl'
import messages from './messages'

interface Props {
  title: string
  children: JSX.Element
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
  show?: boolean
  type: 'warning' | 'confirmatory' | 'destructive'
}

const styleMap = {
  destructive: {
    classNameOnConfirm: 'btn btn-destructive',
  },
  warning: {
    classNameOnConfirm: 'btn btn-warning',
  },
  confirmatory: {
    classNameOnConfirm: 'btn btn-confirmatory',
  },
}

function Prompt(props: Props) {
  const {
    title,
    onConfirm,
    onCancel,
    loading,
    show = true,
    children,
    type = 'confirmatory',
  } = props
  const { classNameOnConfirm } = styleMap[type]
  const style = { width: 600 }

  return (
    <Modal style={style} onClose={onCancel} show={show}>
      <Modal.Header title={title} />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <button onClick={onCancel} className="btn btn-warning-outline" style={{ marginRight: 20 }}>
          <Msg {...messages.cancel} />
        </button>
        <button onClick={onConfirm} className={classNameOnConfirm} disabled={loading}>
          <Msg {...messages.confirm} />
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default Prompt
