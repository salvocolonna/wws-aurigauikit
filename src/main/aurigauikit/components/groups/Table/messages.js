import { defineMessages } from "react-intl"

const PATH = "aurigauikit.groups.table"

export const menu = defineMessages({
  view: {
    id: `${PATH}.menu.view`,
    defaultMessage: "View"
  },
  edit: {
    id: `${PATH}.menu.edit`,
    defaultMessage: "Edit"
  },
  delete: {
    id: `${PATH}.menu.delete`,
    defaultMessage: "Delete"
  }
})

export default defineMessages({
  caption: {
    id: `${PATH}.caption`,
    defaultMessage: "Groups"
  },
  code: {
    id: `${PATH}.code`,
    defaultMessage: "Code"
  },
  description: {
    id: `${PATH}.description`,
    defaultMessage: "Description"
  },
  groupType: {
    id: `${PATH}.group-type`,
    defaultMessage: "Group Type"
  },
  count: {
    id: `${PATH}.count`,
    defaultMessage: "Count"
  },
  private: {
    id: `${PATH}.private`,
    defaultMessage: "Private"
  }
})
