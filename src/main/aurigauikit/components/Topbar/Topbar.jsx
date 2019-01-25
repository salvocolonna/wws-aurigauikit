import React from "react"
import Notification from "aurigauikit/components/Notification"
import MediaQuery from "react-responsive"
const bankImg = <i className="fa fa-bank" />

class Topbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { logo, onLogoClick } = this.props
    return (
      <header id="topbar" style={{ margin: "0px" }}>
        {logo && <Logo src={logo} onClick={onLogoClick} />}
        <MediaQuery maxWidth={767}>
          <ul
            style={{
              display: "inline-block",
              width: `calc(100% - ${logo ? 200 : 0}px)`
            }}>
            {this.props.notificationFrontend &&
              this.props.notificationBackend && (
                <li>
                  <Notification
                    userCode={this.props.userName}
                    frontend={this.props.notificationFrontend}
                    backend={this.props.notificationBackend}
                    customUrl={this.props.notificationCustomUrl}
                    appCode={this.props.notificationAppCode}
                  />
                </li>
              )}
            <li>
              <i className="fa fa-user" />
              {this.props.userName}
            </li>
            <li style={{ cursor: "pointer" }} onClick={() => this.props.onLogout()}>
              <i className="fa fa-sign-out" />
              Logout
            </li>
          </ul>
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <ul
            style={{
              display: "inline-block",
              width: `calc(100% - ${logo ? 200 : 0}px)`
            }}>
            {this.props.notificationFrontend &&
              this.props.notificationBackend && (
                <li>
                  <Notification
                    userCode={this.props.userName}
                    frontend={this.props.notificationFrontend}
                    backend={this.props.notificationBackend}
                    customUrl={this.props.notificationCustomUrl}
                    appCode={this.props.notificationAppCode}
                  />
                </li>
              )}
            {this.props.parentBankCode && (
              <li>
                {bankImg}
                {`${this.props.parentBankDescription}`}
              </li>
            )}
            {this.props.bankCode && (
              <li>
                {!this.props.parentBankCode && bankImg}
                {`${this.props.bankDescription} (${this.props.bankCode})`}
              </li>
            )}
            {this.props.areaCode && (
              <li>
                {!this.props.bankCode && bankImg}
                {this.props.areaDescription}
              </li>
            )}
            {this.props.branchCode && (
              <li>
                {!this.props.branchCode && bankImg}
                {`${this.props.branchDescription} (${this.props.branchCode})`}
              </li>
            )}
            <li>
              <i className="fa fa-user" />
              {this.props.userName}
            </li>
            <li>{this.props.roleDescription && this.props.roleDescription.split("_").join(" ")}</li>
            <li style={{ cursor: "pointer" }} onClick={() => this.props.onLogout()}>
              <i className="fa fa-sign-out" />
              Logout
            </li>
          </ul>
        </MediaQuery>
      </header>
    )
  }
}

const Logo = ({ src, onClick }) => (
  <div
    id="react-sidebar-logo"
    onClick={() => onClick()}
    style={{
      display: "inline-block",
      cursor: "pointer",
      width: 200,
      margin: 0
    }}>
    <span />
    <img id="app-logo-full" src={src} />
  </div>
)

export default Topbar
