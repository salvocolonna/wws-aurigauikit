import React from "react"
import Modal from "aurigauikit/components/Modal"

export default class extends React.Component {
  render() {
    const { onClose, onConfirm, group } = this.props
    return (
      <Modal style={{ width: 600, borderColor: "#DC402B" }} onClose={onClose} show={group}>
        <Modal.Header
          title={
            <div style={{ color: "#DC402B" }}>
              Are you sure you want definitively remove {group && group.groupType} group{" "}
              {group && group.code}?
            </div>
          }
        />
        <Modal.Footer>
          <div style={{ marginTop: 40 }}>
            <button
              onClick={onClose}
              style={{ marginRight: 20 }}
              className="btn btn-warning-outline">
              Undo
            </button>
            <button onClick={() => onConfirm(group)} className="btn btn-destructive">
              Delete
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}
