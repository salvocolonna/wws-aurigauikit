import React from "react"
import Notification from "aurigauikit/components/Notification"
import MediaQuery from "react-responsive"
const bankImg = <i className="fa fa-bank" />

class Topbar extends React.Component {
  render() {
    const {
      logo,
      onLogoClick,
      roleDescription,
      onLogout,
      notificationFrontend,
      notificationBackend,
      userName,
      notificationCustomUrl,
      notificationAppCode,
      parentBankCode,
      parentBankDescription,
      bankCode,
      bankDescription,
      areaCode,
      areaDescription,
      branchCode,
      branchDescription
    } = this.props
    const hasNotification = notificationFrontend && notificationBackend
    const notification = hasNotification && (
      <Notification
        userCode={userName}
        frontend={notificationFrontend}
        backend={notificationBackend}
        customUrl={notificationCustomUrl}
        appCode={notificationAppCode}
      />
    )
    return (
      <header id="topbar" style={{ margin: "0px" }}>
        {logo && <Logo src={logo} onClick={onLogoClick} />}
        <MediaQuery maxWidth={767}>
          <ul
            style={{
              display: "inline-block",
              width: `calc(100% - ${logo ? 200 : 0}px)`
            }}>
            {hasNotification && <li> {notification} </li>}
            <li>
              <i className="fa fa-user" /> {userName}
            </li>
            <li style={{ cursor: "pointer" }} onClick={() => onLogout && onLogout()}>
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
            {hasNotification && <li> {notification} </li>}
            {parentBankCode && (
              <li>
                {bankImg} {`${parentBankDescription}`}
              </li>
            )}
            {bankCode && (
              <li>
                {!parentBankCode && bankImg} {`${bankDescription} (${bankCode})`}
              </li>
            )}
            {areaCode && (
              <li>
                {!bankCode && bankImg} {areaDescription}
              </li>
            )}
            {branchCode && (
              <li>
                {!areaCode && bankImg} {`${branchDescription} (${branchCode})`}
              </li>
            )}
            <li>
              <i className="fa fa-user" /> {userName}
            </li>
            <li>{roleDescription && roleDescription.split("_").join(" ")}</li>
            <li style={{ cursor: "pointer" }} onClick={() => onLogout && onLogout()}>
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
