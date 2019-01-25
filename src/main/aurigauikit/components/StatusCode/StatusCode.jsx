import React from "react"
import { FormattedMessage } from "react-intl"

function StatusCode({ code }) {
  const codes = {
    OK: "confirmatory",
    WARN: "warning",
    KO: "critical",
    CRITICAL: "critical"
  }

  const messageId = `status-code.${code}`
  const message = <FormattedMessage id={messageId} />

  return (
    <div>
      <span className={`dot dot-${codes[code]} dot-sm`} style={{ marginRight: "5px" }} />
      <span className={`text-upper text-${codes[code]}`}>{message}</span>
    </div>
  )
}

export default StatusCode
