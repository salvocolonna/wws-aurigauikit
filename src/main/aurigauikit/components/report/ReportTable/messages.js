import { defineMessages } from "react-intl"

const PATH = "report.delete-report-modal"

export default defineMessages({
  title: {
    id: `${PATH}.title`,
    defaultMessage: "Delete Report"
  },
  content1: {
    id: `${PATH}.content1`,
    defaultMessage: "Are you sure you want to delete"
  },
  content2: {
    id: `${PATH}.content2`,
    defaultMessage: "This cannot be undone"
  },
  content3: {
    id: `${PATH}.content3`,
    defaultMessage: "?"
  },
  cancel: {
    id: `${PATH}.cancel-button`,
    defaultMessage: "Cancel"
  },
  confirm: {
    id: `${PATH}.confirm-button`,
    defaultMessage: "Confirm"
  },
})
