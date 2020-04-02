import { defineMessages } from 'react-intl'

const PATH = 'report-form'

export default defineMessages({
  organizationalUnit: {
    id: `${PATH}.organizational-unit`,
    defaultMessage: 'Organizational unit',
  },
  schedulation: {
    id: `${PATH}.schedulation`,
    defaultMessage: 'Schedulation options',
  },
  reportName: {
    id: `${PATH}.report-name`,
    defaultMessage: 'Report name',
  },
  template: {
    id: `${PATH}.template`,
    defaultMessage: 'Template',
  },
  startDate: {
    id: `${PATH}.start-date`,
    defaultMessage: 'Start date',
  },
  endDate: {
    id: `${PATH}.end-date`,
    defaultMessage: 'End date',
  },
  undo: {
    id: `${PATH}.undo`,
    defaultMessage: 'Undo',
  },
  confirm: {
    id: `${PATH}.confirm`,
    defaultMessage: 'Confirm',
  },
  saving: {
    id: `${PATH}.saving`,
    defaultMessage: 'Saving...',
  },
  endGreater: {
    id: `${PATH}.validations.end-greater`,
    defaultMessage: 'End date must be greater than start date',
  },
})
