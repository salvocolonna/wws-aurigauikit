import React from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'aurigauikit/components/Modal'
import { TimePicker } from 'antd'
import moment from 'moment'

class NewTimeSlotModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startTime: this.props.startTime != null ? this.props.startTime : '',
      startTimeError: false,
      endTime: this.props.endTime != null ? this.props.endTime : '',
      endTimeError: false,
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
    if (!this.state.startTime || !this.state.endTime) return
    this.props.saveSlot({
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    })
    this.setState({
      startTime: this.props.startTime != null ? this.props.startTime : '',
      startTimeError: false,
      endTime: this.props.endTime != null ? this.props.endTime : '',
      endTimeError: false,
    })
  }

  render() {
    return (
      <Modal
        style={{ width: '30%' }}
        show={this.props.show}
        onClose={() => this.props.onSelectionAborted()}
      >
        <section>
          <Modal.Header
            title={<FormattedMessage id="branch-configuration-page.new-time-slots-modal.title" />}
          />
          <Modal.Content>
            <TimePicker.RangePicker
              style={{ width: '100%' }}
              value={[
                this.state.startTime && moment(this.state.startTime, 'HH:mm'),
                this.state.endTime && moment(this.state.endTime, 'HH:mm'),
              ]}
              onChange={time =>
                this.setState({
                  startTime: time && moment(time[0]).format('HH:mm'),
                  endTime: time && moment(time[1]).format('HH:mm'),
                })
              }
              format="HH:mm"
            />
            <span style={{ color: 'red', fontSize: 11, fontWeight: 'bold' }}>
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
                style={{ marginRight: '20px' }}
                onClick={() => this.props.onSelectionAborted()}
              >
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
