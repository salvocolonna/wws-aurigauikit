import React from 'react'
import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import './datepicker.less'

import moment from 'moment'

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { focus: false }
  }

  onFocusOut = () => this.setState({ focus: false })

  onFocusIn = () => this.setState({ focus: true })

  componentDidMount() {
    this.container.addEventListener('focusin', this.onFocusIn)
    this.container.addEventListener('focusout', this.onFocusOut)
    if (this.props.time) {
      const timeElements = document.querySelectorAll('div.react-datepicker__time > div > ul > li')
      for (let timeElement of timeElements) timeElement.addEventListener('click', this.timeClicked)
    }
  }

  timeClicked = () => {
    this.instance.state.open = false
    this.instance.forceUpdate()
  }

  componentWillUnmount() {
    this.container.removeEventListener('focusin', this.onFocusIn)
    this.container.removeEventListener('focusout', this.onFocusOut)
    if (this.props.time) {
      const timeElements = document.querySelectorAll('div.react-datepicker__time > div > ul > li')
      for (let timeElement of timeElements)
        timeElement.removeEventListener('click', this.timeClicked)
    }
  }

  render() {
    const { time, ...props } = this.props
    return (
      <div
        ref={container => (this.container = container)}
        style={{ display: 'flex' }}
        className={'auriga-date-picker ' + (time ? 'only-time' : '')}
      >
        <ReactDatePicker
          ref={instance => (this.instance = instance)}
          {...this.props}
          selected={this.props.selected && moment(this.props.selected).toDate()}
          startDate={this.props.startDate && moment(this.props.startDate).toDate()}
          endDate={this.props.endDate && moment(this.props.endDate).toDate()}
          maxDate={this.props.maxDate && moment(this.props.maxDate).toDate()}
          minDate={this.props.minDate && moment(this.props.minDate).toDate()}
          maxTime={this.props.maxTime && moment(this.props.maxTime).toDate()}
          minTime={this.props.minTime && moment(this.props.minTime).toDate()}
          onChange={date => this.props.onChange(date && moment(date))}
          showTimeSelect={time || this.props.showTimeSelect}
          dateFormat={time ? 'HH:mm' : this.props.dateFormat || 'P'}
        />
        <Icon
          translate={props.isClearable && props.selected !== null ? 20 : 0}
          className={this.state.focus ? 'opened' : ''}
        />
      </div>
    )
  }
}

const Icon = ({ translate, className }) => (
  <i
    className={`fa fa-calendar-o input-decoration ${className}`}
    style={{
      transform: `translateX(-${translate}px)`,
      marginRight: 10,
      float: 'right',
      marginTop: 12,
      pointerEvents: 'none',
    }}
  />
)

export default DatePicker
