import { defineMessages } from "react-intl"

const PATH = "dashboard-page.add-widget"

export default {
  button: defineMessages({
    nme: {
      id: `${PATH}.button.nme`,
      defaultMessage: "Add new widget"
    }
  }),
  modal: defineMessages({
    title: {
      id: `${PATH}.modal.title`,
      defaultMessage: "Add widget"
    },
    cancel: {
      id: `${PATH}.modal.cancel`,
      defaultMessage: "Cancel"
    },
    confirm: {
      id: `${PATH}.modal.confirm`,
      defaultMessage: "Confirm"
    },
    new: {
      id: `${PATH}.modal.new`,
      defaultMessage: "New"
    }
  })
}
