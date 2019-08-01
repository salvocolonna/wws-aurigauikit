import { defineMessages } from 'react-intl'

const PATH = 'report.delete-schedulation-modal'

export default defineMessages({
  title: {
    id: `${PATH}.title`,
    defaultMessage: 'Delete Schedulation',
  },
  remove: {
    id: `delete-modal.content`,
    defaultMessage: `Are you sure you want to delete {name}? This cannot be undone.`,
  },
})
