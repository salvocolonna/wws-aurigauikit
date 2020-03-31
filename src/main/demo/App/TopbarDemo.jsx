import React from 'react'
import Topbar from 'aurigauikit/components/Topbar'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  logout = () => console.log('Log out') // eslint-disable-line no-console

  render() {
    return (
      <Topbar
        parentBankDescription="Parent Bank"
        parentBankCode="0001"
        bankDescription="Bank"
        bankCode="0002"
        areaDescription="Area"
        areaCode="0003"
        branchDescription="Branch"
        branchCode="0004"
        userName="User"
        roleDescription="ROLE"
        onLogout={this.logout}
        {...this.props}
      />
    )
  }
}
