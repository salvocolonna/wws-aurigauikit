import React from "react"
import StaticPanel from "aurigauikit/components/StaticPanel"

export default class extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <StaticPanel fa="times" style={{ marginBottom: 20 }}>
          <div>
            This is an info type panel with a font awesome icon which overrides the default icon.
          </div>
        </StaticPanel>
        <StaticPanel type="confirmatory" style={{ marginBottom: 20 }}>
          <div>
            This is a confirmatory type panel with a font awesome icon which overrides the default
            icon.
          </div>
          <i className="fa fa-lg fa-question" />
        </StaticPanel>
        <StaticPanel type="critical" style={{ marginBottom: 20 }}>
          <div>This is a critical type panel with no icon.</div>
        </StaticPanel>
        <StaticPanel type="warning">
          <div>This is a warning type panel with no icon.</div>
        </StaticPanel>
      </div>
    )
  }
}
