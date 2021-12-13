import React from 'react'
import { FormattedMessage } from 'react-intl'
import TimeSlotElement from './components/TimeSlotElement'
import NewTimeSlotModal from './components/NewTimeSlotModal'
import Card from '../Card'
import './branch-configuration-timeslots.less'
import moment from 'moment'

class BranchConfigurationTimeSlots extends React.Component {
  static defaultProps = { editable: true }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectedDay: null,
      selectedIndex: null,
      selectedStartTime: null,
      selectedEndTime: null,
      error: null,
    }
  }

  showModal(day) {
    this.setState({
      selectedDay: day,
      selectedIndex: null,
      selectedStartTime: null,
      selectedEndTime: null,
      showModal: true,
      error: null,
    })
  }

  edit(day, index) {
    let timeSlot = this.props.times.find(x => x.day === day)
    let dailySlot = timeSlot.dailySlots[index]
    this.setState({
      selectedDay: day,
      selectedIndex: index,
      selectedStartTime: dailySlot.startTime,
      selectedEndTime: dailySlot.endTime,
      showModal: true,
      error: null,
    })
  }

  saveSlot(day, newSlot) {
    let error
    let timeSlot = this.props.times.find(x => x.day === day)
    let ok = timeSlot.dailySlots.every((item, index) => {
      return (
        moment(newSlot.startTime, 'hh:mm').valueOf() > moment(item.endTime, 'hh:mm').valueOf() ||
        moment(newSlot.endTime, 'hh:mm').valueOf() < moment(item.startTime, 'hh:mm').valueOf() ||
        index === this.state.selectedIndex
      )
    })
    if (!ok) error = 'conflict'
    if (!error) {
      this.props.saveSlot(day, newSlot, this.state.selectedIndex)
      this.closeModal()
    } else {
      this.setState({
        showModal: true,
        selectedDay: day,
        selectedIndex: this.state.selectedIndex,
        selectedStartTime: newSlot.startTime,
        selectedEndTime: newSlot.endTime,
        error: error,
      })
    }
  }

  closeModal() {
    this.setState({
      showModal: false,
      selectedDay: null,
      selectedIndex: null,
      selectedStartTime: null,
      selectedEndTime: null,
      error: null,
    })
  }

  render() {
    return (
      <Card
        title={<FormattedMessage id="branch-configuration-page.time-slots-title" />}
        fullscreen={false}
        style={{ paddingBottom: 45 }}
      >
        <div className="grid" style={{ textAlign: 'center', overflow: 'initial' }}>
          {this.props.times &&
            this.props.times.map(time => (
              <TimeSlotElement
                editable={this.props.editable}
                key={time.day}
                day={time.day}
                text={`branch-configuration-page.time-slots-label.${time.day.toLowerCase()}`}
                maxSlot="3"
                slots={time.dailySlots}
                add={day => this.showModal(day)}
                onRemove={this.props.onRemove}
                totalTimeSlots={this.props.times.length}
                onEdit={(day, index) => this.edit(day, index)}
              />
            ))}
        </div>
        <NewTimeSlotModal
          show={this.state.showModal}
          day={this.state.selectedDay}
          startTime={this.state.selectedStartTime}
          endTime={this.state.selectedEndTime}
          error={this.state.error}
          onSelectionAborted={() => this.closeModal()}
          saveSlot={newSlot => this.saveSlot(this.state.selectedDay, newSlot)}
        />
      </Card>
    )
  }
}

export default BranchConfigurationTimeSlots
