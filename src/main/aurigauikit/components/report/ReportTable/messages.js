import { defineMessages } from 'react-intl'

const PATH = 'report.delete-report-modal'

export default defineMessages({
  title: {
    id: `${PATH}.title`,
    defaultMessage: 'Delete Report',
  },
  remove: {
    id: `delete-modal.content`,
    defaultMessage: `Are you sure you want to delete {name}? This cannot be undone.`,
  },
})
