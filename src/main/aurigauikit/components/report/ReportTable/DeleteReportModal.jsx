import React from 'react'
import { FormattedMessage as Msg } from 'react-intl'
import messages from './messages'

import Modal from 'aurigauikit/components/Modal'

class DeleteReportModal extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { show, onClose, onConfirm, reportName } = this.props
    return (
      <Modal show={show} onClose={() => onClose()} style={{ width: '40%', borderColor: '#DC402B' }}>
        <Modal.Header
          title={
            <div className="dialog-title-content">
              <Msg {...messages.title} />
            </div>
          }
        />

        <Modal.Content>
          <Modal.Content>
            <h3>
              <Msg {...messages.content1} /> {reportName}
              <Msg {...messages.content3} /> <Msg {...messages.content2} />
            </h3>
          </Modal.Content>
        </Modal.Content>
        <Modal.Footer>
          <div className="btn-group">
            <button
              className="btn btn-warning-outline"
              style={{ marginRight: '20px' }}
              onClick={() => onClose()}
            >
              <Msg {...messages.cancel} />
            </button>
            <button className="btn btn-destructive" onClick={() => onConfirm()}>
              <Msg {...messages.confirm} />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteReportModal
