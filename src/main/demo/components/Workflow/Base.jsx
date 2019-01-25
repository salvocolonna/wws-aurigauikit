import React from "react"
import Workflow from "aurigauikit/components/Workflow"

export default function() {
  return (
    <Workflow
      currentState="DRAFT"
      states={[
        "DRAFT",
        "CREATED",
        "BRANCH_APPROVED",
        "AREA_APPROVED",
        "CONFIRMED",
        "ACCEPTED",
        "DELIVERED"
      ]}
    />
  )
}
