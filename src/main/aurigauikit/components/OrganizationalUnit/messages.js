import { defineMessages } from "react-intl"
const PATH = "organizational-unit"
const SELECT_PATH = `${PATH}-select`
const MODAL_PATH = `${PATH}-modal`

export default {
  general: defineMessages({
    title: {
      id: `${PATH}.title`,
      defaultMessage: "Organizational unit"
    },
    branchHierarchy: {
      id: `${PATH}.branch-hierarchy`,
      defaultMessage: "Branch hierarchy"
    },
    vaultHierarchy: {
      id: `${PATH}.vault-hierarchy`,
      defaultMessage: "Vault hierarchy"
    }
  }),
  modal: {
    general: defineMessages({
      reset: {
        id: `${MODAL_PATH}.reset`,
        defaultMessage: "Reset"
      },
      cancel: {
        id: `${MODAL_PATH}.cancel`,
        defaultMessage: "Cancel"
      },
      select: {
        id: `${MODAL_PATH}.select`,
        defaultMessage: "Select"
      },
      groupSelection: {
        id: `${MODAL_PATH}.group-selection`,
        defaultMessage: "Group selection"
      },
      notPublic: {
        id: "branch-groups-page.group-modal.notPublic",
        defaultMessage: "Private"
      }
    }),
    headers: defineMessages({
      Code: {
        id: `${MODAL_PATH}.table.headers.Code`,
        defaultMessage: "Code"
      },
      Type: {
        id: `${MODAL_PATH}.table.headers.Type`,
        defaultMessage: "Type"
      },
      Name: {
        id: `${MODAL_PATH}.table.headers.Name`,
        defaultMessage: "Type"
      },
      ID: {
        id: `${MODAL_PATH}.table.headers.ID`,
        defaultMessage: "ID"
      },
      Description: {
        id: `${MODAL_PATH}.table.headers.Description`,
        defaultMessage: "Description"
      }
    })
  },
  type: defineMessages({
    ALL: {
      id: `${SELECT_PATH}.ALL`,
      defaultMessage: "All"
    },
    placeholder: {
      id: `${SELECT_PATH}.placeholder`,
      defaultMessage: "Organizational Unit"
    },
    BRANCH: {
      id: `${SELECT_PATH}.type.BRANCH`,
      defaultMessage: "Branch"
    },
    AREA: {
      id: `${SELECT_PATH}.type.AREA`,
      defaultMessage: "Area"
    },
    BANK: {
      id: `${SELECT_PATH}.type.BANK`,
      defaultMessage: "Bank"
    },
    PARENT_BANK: {
      id: `${SELECT_PATH}.type.PARENT_BANK`,
      defaultMessage: "Parent bank"
    },
	VAULT: {
		  id: `${SELECT_PATH}.type.VAULT`,
		  defaultMessage: "Vault"
	},
    ASSET: {
      id: `${SELECT_PATH}.type.ASSET`,
      defaultMessage: "Asset"
    },
    CASHPOINT: {
      id: `${SELECT_PATH}.type.CASHPOINT`,
      defaultMessage: "Cashpoint"
    },
    BRANCH_GROUP: {
      id: `${SELECT_PATH}.type.BRANCH_GROUP`,
      defaultMessage: "Branch group"
    },
    ASSET_GROUP: {
      id: `${SELECT_PATH}.type.ASSET_GROUP`,
      defaultMessage: "Groups"
    },
    PUBLIC: {
      id: `${SELECT_PATH}.type.PUBLIC`,
      defaultMessage: "Public"
    },
    PRIVATE: {
      id: `${SELECT_PATH}.type.PRIVATE`,
      defaultMessage: "Private"
    }
  })
}
