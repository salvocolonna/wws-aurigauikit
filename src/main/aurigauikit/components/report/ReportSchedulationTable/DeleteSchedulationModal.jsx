import React from "react"
import { FormattedMessage } from "react-intl"

import Modal from "aurigauikit/components/Modal"

class DeleteSchedulationModal extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { show, onClose, onConfirm } = this.props
    return (
      <Modal show={show} onClose={() => onClose()} style={{ width: "40%", borderColor: "#DC402B" }}>
        <Modal.Header>
          <i
            style={{ float: "left", color: "#DC402B", marginRight: 20 }}
            className="fa fa-trash fa-4x"
          />
          <div style={{ color: "#DC402B" }} className="dialog-title-content">
            <FormattedMessage id="report.delete-schedulation-modal.title" />
          </div>
        </Modal.Header>
        <Modal.Content>
          <div className="text">
            <FormattedMessage id="report.delete-schedulation-modal.content" />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="btn-group">
            <button
              className="btn btn-warning-outline"
              style={{ marginRight: "20px" }}
              onClick={() => onClose()}>
              <FormattedMessage id="report.delete-schedulation-modal.cancel-button" />
            </button>
            <button className="btn btn-destructive" onClick={() => onConfirm()}>
              <FormattedMessage id="report.delete-schedulation-modal.confirm-button" />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteSchedulationModal
