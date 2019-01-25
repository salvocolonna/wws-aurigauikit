import React from "react"
import Topbar from "aurigauikit/components/Topbar"

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  logout = () => console.log("Log out") // eslint-disable-line no-console

  render() {
    return (
      <Topbar
        parentBankDescription={"parent_bank_description"}
        parentBankCode={"parent_bank_code"}
        bankDescription={"bank_description"}
        bankCode={"bank_code"}
        areaDescription={"area_description"}
        areaCode={"area_code"}
        branchDescription={"branch_description"}
        branchCode={"branch_code"}
        userName={"full_name"}
        roleDescription={"role_description"}
        onLogout={this.logout}
      />
    )
  }
}
