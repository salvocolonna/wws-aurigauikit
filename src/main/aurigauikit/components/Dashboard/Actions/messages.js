import { defineMessages } from 'react-intl'

const PATH = 'asset-page.page-actions'

export default defineMessages({
  editLayout: {
    id: `${PATH}.page-actions.edit-layout`,
    defaultMessage: 'Edit layout',
  },
  undoEditLayout: {
    id: `${PATH}.page-actions.undo-edit-layout`,
    defaultMessage: 'Undo',
  },
  saveLayout: {
    id: `${PATH}.page-actions.save-layout`,
    defaultMessage: 'Save layout',
  },
  saving: {
    id: `${PATH}.page-actions.saving`,
    defaultMessage: 'Saving...',
  },
  addWidget: {
    id: `${PATH}.page-actions.add-widget`,
    defaultMessage: 'Add widget',
  },
  buildWidget: {
    id: `${PATH}.page-actions.build-widget`,
    defaultMessage: 'Build widget',
  },
})
