import React from "react"
import OrganizationalUnitSelect from "aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect"
import WWSCashOrganizationalUnitDatasource from "./components/WWSCashOrganizationalUnitDatasource"
const datasource = new WWSCashOrganizationalUnitDatasource()

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { organizationalUnits: [] }
  }

  onSelect(organizationalUnits) {
    this.setState({ organizationalUnits })
  }

  render() {
    const { organizationalUnits } = this.state
    return (
      <div style={{ width: "50%" }}>
        <OrganizationalUnitSelect
          datasource={datasource}
          selectedElements={organizationalUnits}
          onSelectionChange={organizationalUnit => this.onSelect(organizationalUnit)}
          canSelect={organizationalUnit => organizationalUnit.type !== "CASHPOINT"}
        />
      </div>
    )
  }
}
