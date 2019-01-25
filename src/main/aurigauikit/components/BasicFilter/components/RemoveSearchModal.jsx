import React from "react"
import Modal from "aurigauikit/components/Modal"

export default class extends React.Component {
  render() {
    const { show, onClose, onConfirm, search, deleting } = this.props
    return (
      <Modal style={{ width: 600, borderColor: "#DC402B" }} onClose={onClose} show={show}>
        <Modal.Header
          title={
            <div style={{ color: "#DC402B" }}>
              Are you sure you want definitively remove{" "}
              {search && (search.name || '"Unnamed search ' + search.search_id + '"')}?
            </div>
          }
        />
        <Modal.Footer>
          <div style={{ marginTop: 40 }}>
            <button
              onClick={onClose}
              style={{ marginRight: 20 }}
              disabled={deleting}
              className="btn btn-warning-outline">
              Undo
            </button>
            <button
              onClick={() => onConfirm(search)}
              disabled={deleting}
              className="btn btn-destructive">
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}
