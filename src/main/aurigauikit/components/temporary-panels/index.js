import $ from "jquery"
import "./temporary-panels"
import "./temporary-panel-message-queue"

window.temoraryPanels = {
  showInfoTemporaryPanel: $.showInfoTemporaryPanel,
  showConfirmatoryTemporaryPanel: $.showConfirmatoryTemporaryPanel,
  showWarningTemporaryPanel: $.showWarningTemporaryPanel,
  showCriticalTemporaryPanel: $.showCriticalTemporaryPanel,
  showTemporaryPanel: $.showTemporaryPanel,
  messagesQueue: $.messagesQueue
}

export const showInfoPanel = window.temoraryPanels.showInfoTemporaryPanel
export const showWarningPanel = window.temoraryPanels.showWarningTemporaryPanel
export const showCriticalPanel = window.temoraryPanels.showCriticalTemporaryPanel
export const showConfirmatoryPanel = window.temoraryPanels.showConfirmatoryTemporaryPanel

export default window.temoraryPanels
