import React from "react"
import StaticPanel from "aurigauikit/components/StaticPanel"

export default class extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <StaticPanel style={{ marginBottom: 20 }}>
          <StaticPanel.Icon />
          <div>This is an info type panel with icon.</div>
        </StaticPanel>
        <StaticPanel type="confirmatory" style={{ marginBottom: 20 }}>
          <StaticPanel.Icon />
          <div>This is a confirmatory type panel with icon.</div>
        </StaticPanel>
        <StaticPanel type="critical" style={{ marginBottom: 20 }}>
          <StaticPanel.Icon />
          <div>This is a critical type panel with icon.</div>
        </StaticPanel>
        <StaticPanel type="warning">
          <StaticPanel.Icon />
          <div>This is a warning type panel with icon.</div>
        </StaticPanel>
      </div>
    )
  }
}
