import React from "react"
import { FormattedMessage } from "react-intl"
import Modal from "aurigauikit/components/Modal"

const slotDefaultText = "HH:mm"
const formatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

class NewTimeSlotModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startTime: this.props.startTime != null ? this.props.startTime : "",
      startTimeError: false,
      endTime: this.props.endTime != null ? this.props.endTime : "",
      endTimeError: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let newState = {}
    if (nextProps.startTime !== this.props.startTime) {
      newState.startTime = nextProps.startTime
    }
    if (nextProps.endTime !== this.props.endTime) {
      newState.endTime = nextProps.endTime
    }
    this.setState(newState)
  }

  save() {
    let newState = {}
    let error = false
    if (!this.state.startTime || !this.state.startTime.match(formatRegex)) {
      error = true
      newState.startTimeError = true
    } else {
      newState.startTimeError = false
    }
    if (!this.state.endTime || !this.state.endTime.match(formatRegex)) {
      error = true
      newState.endTimeError = true
    } else {
      newState.endTimeError = false
    }
    this.setState(newState)
    if (!error) {
      this.props.saveSlot({
        startTime: this.state.startTime,
        endTime: this.state.endTime
      })
      this.setState({
        startTime: this.props.startTime != null ? this.props.startTime : "",
        startTimeError: false,
        endTime: this.props.endTime != null ? this.props.endTime : "",
        endTimeError: false
      })
    }
  }

  render() {
    const invalidFormatMsg = (
      <FormattedMessage
        id={"branch-configuration-page.new-time-slots-modal.error.invalid-format"}
      />
    )
    return (
      <Modal
        style={{ width: "30%" }}
        show={this.props.show}
        onClose={() => this.onSelectionAborted()}>
        <section>
          <Modal.Header
            title={<FormattedMessage id="branch-configuration-page.new-time-slots-modal.title" />}
          />
          <Modal.Content>
            <section>
              <div className="grid">
                <div className="col-1-2" style={{ paddingRight: 10 }}>
                  <label>
                    <FormattedMessage id="branch-configuration-page.new-time-slots-modal.startTime" />
                  </label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder={slotDefaultText}
                    value={this.state.startTime}
                    onChange={e => this.setState({ startTime: e.target.value })}
                  />
                  <span style={{ color: "#DC402B" }}>
                    {this.state.startTimeError && invalidFormatMsg}
                  </span>
                </div>
                <div className="col-1-2" style={{ paddingLeft: 10 }}>
                  <label>
                    <FormattedMessage id="branch-configuration-page.new-time-slots-modal.endTime" />
                  </label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder={slotDefaultText}
                    value={this.state.endTime}
                    onChange={e => this.setState({ endTime: e.target.value })}
                  />
                  <span style={{ color: "#DC402B" }}>
                    {this.state.endTimeError && invalidFormatMsg}
                  </span>
                </div>
              </div>
            </section>
            <span style={{ color: "#DC402B" }}>
              {this.props.error && (
                <FormattedMessage
                  id={`branch-configuration-page.new-time-slots-modal.error.${this.props.error}`}
                />
              )}
            </span>
          </Modal.Content>
          <Modal.Footer>
            <div className="btn-group">
              <button
                className="btn btn-warning-outline"
                style={{ marginRight: "20px" }}
                onClick={() => this.props.onSelectionAborted()}>
                <FormattedMessage id="branch-configuration-page.new-time-slots-modal.button-cancel" />
              </button>
              <button className="btn btn-confirmatory" onClick={() => this.save()}>
                <FormattedMessage id="branch-configuration-page.new-time-slots-modal.button-save" />
              </button>
            </div>
          </Modal.Footer>
        </section>
      </Modal>
    )
  }
}

export default NewTimeSlotModal
