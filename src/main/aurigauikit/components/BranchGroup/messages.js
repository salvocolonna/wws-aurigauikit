import { defineMessages } from 'react-intl'

const PATH = 'aurigauikit.groups.filter'

export const notPublicMessages = defineMessages({
  ALL: {
    id: `${PATH}.not-public.ALL`,
    defaultMessage: 'All',
  },
  YES: {
    id: `${PATH}.not-public.YES`,
    defaultMessage: 'Yes',
  },
  NO: {
    id: `${PATH}.not-public.NO`,
    defaultMessage: 'No',
  },
})

export const savingGroup = defineMessages({
  ERROR: {
    id: `${PATH}.error-saving`,
    defaultMessage: 'Error saving',
  },
  SUCCESS: {
    id: `${PATH}.saving-successfully`,
    defaultMessage: 'Saving successfully',
  },
  selectedBranchesError: {
    id: `${PATH}.selected-branches-error`,
    defaultMessage: 'Please add a branch',
  },
})
