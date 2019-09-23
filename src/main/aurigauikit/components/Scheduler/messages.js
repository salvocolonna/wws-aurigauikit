import { defineMessages } from 'react-intl'

const PATH = 'scheduler'

export default {
  validations: {
    endGreater: {
      id: `${PATH}.validations.end-greater`,
      defaultMessage: 'End date must be greater than start date',
    },
    atLeastADay: {
      id: `${PATH}.validations.at-least-a-day`,
      defaultMessage: 'Select at least a day of week',
    },
  },
  recurrings: defineMessages({
    NEVER: {
      id: `${PATH}.recurrings.NEVER`,
      defaultMessage: 'Never',
    },
    DAILY: {
      id: `${PATH}.recurrings.DAILY`,
      defaultMessage: 'Daily',
    },
    WEEKLY: {
      id: `${PATH}.recurrings.WEEKLY`,
      defaultMessage: 'Weekly',
    },
    MONTHLY: {
      id: `${PATH}.recurrings.MONTHLY`,
      defaultMessage: 'Monthly',
    },
    YEARLY: {
      id: `${PATH}.recurrings.YEARLY`,
      defaultMessage: 'Yearly',
    },
  }),
  labels: defineMessages({
    date: {
      id: `${PATH}.labels.date`,
      defaultMessage: 'Date',
    },
    recurring: {
      id: `${PATH}.labels.recurring`,
      defaultMessage: 'Recurring',
    },
    repeatEvery: {
      id: `${PATH}.labels.repeat-every`,
      defaultMessage: 'Repeat every',
    },
    end: {
      id: `${PATH}.labels.end`,
      defaultMessage: 'End',
    },
    on: {
      id: `${PATH}.labels.on`,
      defaultMessage: 'On',
    },
    when: {
      id: `${PATH}.labels.when`,
      defaultMessage: 'When',
    },
    after: {
      id: `${PATH}.labels.after`,
      defaultMessage: 'After',
    },
    never: {
      id: `${PATH}.labels.never`,
      defaultMessage: 'Never',
    },
    day: {
      id: `${PATH}.labels.day`,
      defaultMessage: 'Day',
    },
    OCCURRENCIES: {
      id: `${PATH}.labels.OCCURRENCIES`,
      defaultMessage: '{occurrencies, plural, one {Occurrency} other {Occurrencies}}',
    },
    DAYS: {
      id: `${PATH}.labels.DAYS`,
      defaultMessage: '{value, plural, one {Day} other {Days}}',
    },
    WEEKS: {
      id: `${PATH}.labels.WEEKS`,
      defaultMessage: '{value, plural, one {Week} other {Weeks}}',
    },
    MONTHS: {
      id: `${PATH}.labels.MONTHS`,
      defaultMessage: '{value, plural, one {Month} other {Months}}',
    },
    YEARS: {
      id: `${PATH}.labels.YEARS`,
      defaultMessage: '{value, plural, one {Year} other {Years}}',
    },
  }),
  orders: defineMessages({
    FIRST: {
      id: `${PATH}.orders.FIRST`,
      defaultMessage: 'First',
    },
    SECOND: {
      id: `${PATH}.orders.SECOND`,
      defaultMessage: 'Second',
    },
    THIRD: {
      id: `${PATH}.orders.THIRD`,
      defaultMessage: 'Third',
    },
    FOURTH: {
      id: `${PATH}.orders.FOURTH`,
      defaultMessage: 'Fourth',
    },
    LAST: {
      id: `${PATH}.orders.LAST`,
      defaultMessage: 'Last',
    },
  }),
  days: defineMessages({
    MONDAY: {
      id: `${PATH}.days.MONDAY`,
      defaultMessage: 'Monday',
    },
    TUESDAY: {
      id: `${PATH}.days.TUESDAY`,
      defaultMessage: 'Tuesday',
    },
    WEDNESDAY: {
      id: `${PATH}.days.WEDNESDAY`,
      defaultMessage: 'Wednesday',
    },
    THURSDAY: {
      id: `${PATH}.days.THURSDAY`,
      defaultMessage: 'Thursday',
    },
    FRIDAY: {
      id: `${PATH}.days.FRIDAY`,
      defaultMessage: 'Friday',
    },
    SATURDAY: {
      id: `${PATH}.days.SATURDAY`,
      defaultMessage: 'Saturday',
    },
    SUNDAY: {
      id: `${PATH}.days.SUNDAY`,
      defaultMessage: 'Sunday',
    },
  }),
  months: defineMessages({
    JANUARY: {
      id: `${PATH}.months.JANUARY`,
      defaultMessage: 'January',
    },
    FEBRUARY: {
      id: `${PATH}.months.FEBRUARY`,
      defaultMessage: 'February',
    },
    MARCH: {
      id: `${PATH}.months.MARCH`,
      defaultMessage: 'March',
    },
    APRIL: {
      id: `${PATH}.months.APRIL`,
      defaultMessage: 'April',
    },
    MAY: {
      id: `${PATH}.months.MAY`,
      defaultMessage: 'May',
    },
    JUNE: {
      id: `${PATH}.months.JUNE`,
      defaultMessage: 'June',
    },
    JULY: {
      id: `${PATH}.months.JULY`,
      defaultMessage: 'July',
    },
    AUGUST: {
      id: `${PATH}.months.AUGUST`,
      defaultMessage: 'August',
    },
    SEPTEMBER: {
      id: `${PATH}.months.SEPTEMBER`,
      defaultMessage: 'September',
    },
    OCTOBER: {
      id: `${PATH}.months.OCTOBER`,
      defaultMessage: 'October',
    },
    NOVEMBER: {
      id: `${PATH}.months.NOVEMBER`,
      defaultMessage: 'November',
    },
    DECEMBER: {
      id: `${PATH}.months.DECEMBER`,
      defaultMessage: 'December',
    },
  }),
}
