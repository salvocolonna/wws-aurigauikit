import React from "react"
import Modal from "aurigauikit/components/Modal"

export default class extends React.Component {
  state = { name: "" }

  componentWillReceiveProps(props) {
    if (props.show && props.show !== this.props.show) this.setState({ name: "" })
  }

  changeName = name => this.setState({ name })

  render() {
    const { show, onClose, onConfirm, saving } = this.props
    return (
      <Modal style={{ width: 600 }} onClose={onClose} show={show}>
        <Modal.Header title="Save search" />
        <Modal.Content>
          <label>
            Name
            <input
              style={{ width: "100%" }}
              type="text"
              value={this.state.name}
              onChange={e => this.changeName(e.target.value)}
            />
          </label>
        </Modal.Content>
        <Modal.Footer>
          <div>
            <button
              onClick={onClose}
              style={{ marginRight: 20 }}
              className="btn btn-warning-outline">
              Undo
            </button>
            <button
              disabled={saving || this.state.name === ""}
              onClick={() => onConfirm(this.state.name)}
              className="btn btn-confirmatory">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}
