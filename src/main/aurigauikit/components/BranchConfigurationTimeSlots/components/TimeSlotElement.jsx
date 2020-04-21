import React from 'react'
import { FormattedMessage } from 'react-intl'

const style = { width: '4em', display: 'inline-block', margin: 2.5 }

class TimeSlotElement extends React.Component {
  constructor(props) {
    super(props)
  }

  createSlot(slot, index, editable) {
    return (
      <div key={index}>
        <div
          className="grid"
          style={{
            float: 'none',
            overflow: 'initial',
            display: 'inline-block',
            verticalAlign: 'middle',
            textAlign: 'center',
          }}
        >
          <div
            className={editable ? 'col-1-3' : 'col-1-2'}
            style={{ float: 'none', display: 'inline-block' }}
          >
            <input style={style} type="text" value={slot.startTime} readOnly />
          </div>
          <div
            className={editable ? 'col-1-3' : 'col-1-2'}
            style={{ float: 'none', display: 'inline-block' }}
          >
            <input style={style} type="text" value={slot.endTime} readOnly />
          </div>
          {editable && (
            <div
              className="col-1-3"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                textAlign: 'center',
                float: 'right',
              }}
            >
              <i
                style={{
                  fontSize: '1.5em',
                  lineHeight: '40px',
                  cursor: 'pointer',
                }}
                className="fa fa-pencil branch-configuration-timeslots-icon"
                onClick={() => this.props.onEdit(this.props.day, index)}
              />
              <i
                style={{
                  fontSize: '1.5em',
                  color: '#DC402B',
                  lineHeight: '40px',
                  cursor: 'pointer',
                  paddingLeft: 5,
                }}
                className="fa fa-times"
                onClick={() => this.props.onRemove(this.props.day, index)}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    const editable = this.props.editable && this.props.slots.length < this.props.maxSlot

    return (
      <div
        className={`col-1-${this.props.totalTimeSlots}`}
        style={{
          display: 'inline-block',
          paddingLeft: 5,
          paddingRight: 5,
          minWidth: '14em',
          float: 'none',
          verticalAlign: 'top',
        }}
      >
        <div className="grid" style={{ overflow: 'initial' }}>
          <div className="col-2-3" style={{ float: 'none', display: 'inline-block' }}>
            <label className="label label-title" style={{}}>
              <FormattedMessage id={this.props.text} />
            </label>
          </div>
          {editable && (
            <div className="col-1-3" style={{ float: 'right' }}>
              <i
                style={{ color: 'green', fontSize: '2em', cursor: 'pointer' }}
                className="fa fa-plus-circle"
                onClick={() => this.props.add(this.props.day)}
              />
            </div>
          )}
        </div>

        {this.props.slots.map((slot, index) => this.createSlot(slot, index, this.props.editable))}
      </div>
    )
  }
}

export default TimeSlotElement
