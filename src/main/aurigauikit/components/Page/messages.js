import { defineMessages } from 'react-intl'

const PATH = 'error-page'

export default defineMessages({
  title: {
    id: `${PATH}.title`,
    defaultMessage: 'Ops!',
  },
  subtitle: {
    id: `${PATH}.subtitle`,
    defaultMessage: 'Something went wrong!',
  },
  text: {
    id: `${PATH}.text`,
    defaultMessage: 'Refresh the page or go to',
  },
  link: {
    id: `${PATH}.link`,
    defaultMessage: 'DASHBOARD',
  },
  button: {
    id: `${PATH}.button`,
    defaultMessage: 'Report error',
  },
})
