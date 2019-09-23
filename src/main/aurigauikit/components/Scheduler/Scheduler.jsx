import React from 'react'
import SchedulingStart from './SchedulingStart'
import SchedulingEnd from './SchedulingEnd'
import WeeklyRecurring from './WeeklyRecurring'
import MonthlyRecurring from './MonthlyRecurring'
import YearlyRecurring from './YearlyRecurring'
import moment from 'moment'
import { days, endModes, monthlyModes, months, orders, recurrings, yearlyModes } from './constants'
import { toExpression } from './utils'

const getInitialDate = () => {
  const date = moment()
  if (date.minute() > 30) date.hour(date.hour() + 1).minute(0)
  else if (date.minute() < 30) date.minute(30)
  return date
}

export const defaultProps = {
  data: {
    date: getInitialDate(),
    recurring: recurrings[0],
    repeatEvery: 1,
    end: {
      mode: endModes[2],
      date: null,
      occurrencies: 1,
    },
    weekly: { days: [] },
    monthly: {
      day: 1,
      weekDay: days[0],
      order: orders[0],
      mode: monthlyModes[0],
    },
    yearly: {
      day: 1,
      weekDay: days[0],
      order: orders[0],
      orderMonth: months[0],
      month: months[0],
      mode: yearlyModes[1],
    },
  },
}

export default class extends React.Component {
  static defaultProps = defaultProps

  componentDidMount() {
    this.change({ date: getInitialDate() })
  }

  change = data => {
    const { data: oldData, onChange } = this.props
    const newData = { ...oldData, ...data }
    const res = toExpression(newData)
    onChange(newData, res.cronExp)
  }

  dateChanged = date => this.change({ date })

  recurringChanged = recurring => this.change({ recurring })

  repeatEveryChanged = repeatEvery => this.change({ repeatEvery })

  weeklyDaysChanged = day => {
    const { data } = this.props
    const { days } = data.weekly
    if (!days.includes(day)) this.change({ weekly: { days: [...days, day] } })
    else {
      days.splice(days.indexOf(day), 1)
      this.change({ weekly: { days: [...days] } })
    }
  }

  monthlyChanged = newMonthly => {
    const { data } = this.props
    this.change({ monthly: { ...data.monthly, ...newMonthly } })
  }

  monthlyDayChanged = day => this.monthlyChanged({ day, mode: monthlyModes[1] })

  monthlyWeekDayChanged = weekDay => this.monthlyChanged({ weekDay, mode: monthlyModes[0] })

  monthlyOrderChanged = order => this.monthlyChanged({ order, mode: monthlyModes[0] })

  monthlyModeChanged = mode => this.monthlyChanged({ mode })

  yearlyChanged = newYearly => {
    const { data } = this.props
    this.change({ yearly: { ...data.yearly, ...newYearly } })
  }

  yearlyDayChanged = day => this.yearlyChanged({ day, mode: yearlyModes[1] })

  yearlyWeekDayChanged = weekDay => this.yearlyChanged({ weekDay, mode: yearlyModes[0] })

  yearlyOrderChanged = order => this.yearlyChanged({ order, mode: yearlyModes[0] })

  yearlyModeChanged = mode => this.yearlyChanged({ mode })

  yearlyMonthChanged = month => this.yearlyChanged({ month, mode: yearlyModes[1] })

  yearlyOrderMonthChanged = orderMonth => this.yearlyChanged({ orderMonth, mode: yearlyModes[0] })

  endChanged = newEnd => {
    const { data } = this.props
    this.change({ end: { ...data.end, ...newEnd } })
  }

  endDateChanged = date => this.endChanged({ date, mode: endModes[0] })

  occurrenciesEndChanged = occurrencies => this.endChanged({ occurrencies, mode: endModes[1] })

  endModeChanged = mode => this.endChanged({ mode })

  render() {
    const { data, existing, recurrings } = this.props
    const { date, repeatEvery, recurring, weekly, monthly, yearly, end } = data
    return (
      <div>
        <SchedulingStart
          date={date}
          existing={existing}
          onDateChange={this.dateChanged}
          onRepeatEveryChange={this.repeatEveryChanged}
          repeatEvery={repeatEvery}
          recurrings={recurrings}
          recurring={recurring}
          onRecurringChange={this.recurringChanged}
        />
        {recurring === 'WEEKLY' && (
          <WeeklyRecurring onChange={this.weeklyDaysChanged} selectedDays={weekly.days} />
        )}
        {recurring === 'MONTHLY' && (
          <MonthlyRecurring
            day={monthly.day}
            onDayChange={this.monthlyDayChanged}
            order={monthly.order}
            onOrderChange={this.monthlyOrderChanged}
            mode={monthly.mode}
            onModeChange={this.monthlyModeChanged}
            weekDay={monthly.weekDay || days[0]}
            onWeekDayChange={this.monthlyWeekDayChanged}
          />
        )}
        {recurring === 'YEARLY' && (
          <YearlyRecurring
            day={yearly.day}
            weekDay={yearly.weekDay}
            order={yearly.order}
            month={yearly.month}
            orderMonth={yearly.orderMonth}
            mode={yearly.mode}
            onDayChange={this.yearlyDayChanged}
            onWeekDayChange={this.yearlyWeekDayChanged}
            onOrderChange={this.yearlyOrderChanged}
            onMonthChange={this.yearlyMonthChanged}
            onOrderMonthChange={this.yearlyOrderMonthChanged}
            onModeChange={this.yearlyModeChanged}
          />
        )}
        {recurring !== 'NEVER' && (
          <SchedulingEnd
            date={date}
            endDate={end.date}
            endMode={end.mode}
            onEndModeChange={this.endModeChanged}
            onEndDateChange={this.endDateChanged}
            occurrenciesEnd={end.occurrencies}
            onOccurrenciesEndChange={this.occurrenciesEndChanged}
          />
        )}
      </div>
    )
  }
}
