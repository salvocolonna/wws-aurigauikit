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

export default defineMessages({
  organizationalUnit: {
    id: `${PATH}.organizational-unit`,
    defaultMessage: 'Organizational Unit',
  },
  code: {
    id: `${PATH}.code`,
    defaultMessage: 'Name',
  },
  private: {
    id: `${PATH}.private`,
    defaultMessage: 'Private',
  },
})
