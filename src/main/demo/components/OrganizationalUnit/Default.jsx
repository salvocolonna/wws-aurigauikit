import React from "react"
import OrganizationalUnitSelect from "aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect"
import WWSCashOrganizationalUnitDatasource from "./components/WWSCashOrganizationalUnitDatasource"
import Show from "./components/Show"

const defaultOrganizationalUnit = {
  id: 1,
  type: "PARENT_BANK",
  code: "0001",
  description: "BANK ENTITY"
}

const datasource = new WWSCashOrganizationalUnitDatasource()

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { organizationalUnit: defaultOrganizationalUnit }
  }

  onSelect(organizationalUnit) {
    this.setState({ organizationalUnit: organizationalUnit })
  }

  render() {
    const { organizationalUnit } = this.state
    return (
      <div style={{ width: "50%" }}>
        <Show organizationalUnit={organizationalUnit} />
        <OrganizationalUnitSelect
          datasource={datasource}
          onSelect={organizationalUnit => this.onSelect(organizationalUnit)}
          canSelect={organizationalUnit => organizationalUnit.type !== "CASHPOINT"}
          defaultSelection={defaultOrganizationalUnit}
        />
      </div>
    )
  }
}
