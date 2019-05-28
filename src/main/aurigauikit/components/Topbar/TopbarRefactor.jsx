import React from 'react'
import Notification from 'aurigauikit/components/Notification'
import MediaQuery from 'react-responsive'
const bankImg = <i className="fa fa-bank" />

class Topbar extends React.Component {
  render() {
    const {
      logo,
      logoImage,
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
      branchDescription,
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
      <header id="topbar" style={{ display: 'flex', margin: '0px' }}>
        <MediaQuery minWidth={1024}>
          {logo && <Logo src={logo} onClick={onLogoClick} />}
          {logoImage && logoImage.src && (
            <LogoImage {...logoImage} style={{ ...logoImage.style, maxHeight: 80 }} />
          )}
        </MediaQuery>
        <ul
          style={{
            display: 'inline-block',
            flex: '1 0 auto',
          }}
        >
          <MediaQuery maxWidth={767}>
            {hasNotification && <li> {notification} </li>}
            <li>
              <i className="fa fa-user" /> {userName}
            </li>
          </MediaQuery>
          <MediaQuery minWidth={768}>
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
            <li>{roleDescription && roleDescription.split('_').join(' ')}</li>
          </MediaQuery>
          <li style={{ cursor: 'pointer' }} onClick={() => onLogout && onLogout()}>
            <i className="fa fa-sign-out" />
            Logout
          </li>
        </ul>
      </header>
    )
  }
}

const Logo = ({ src, onClick }) => (
  <div
    id="react-sidebar-logo"
    onClick={() => onClick()}
    style={{
      display: 'inline-block',
      cursor: 'pointer',
      width: 200,
      margin: 0,
    }}
  >
    <span />
    <img id="app-logo-full" src={src} />
  </div>
)

const LogoImage = ({ src, onClick, marginLeft = 40, maxWidth = 300, style = {} }) => {
  onClick = onClick || (() => {})

  return (
    <div
      onClick={() => onClick()}
      style={{
        display: 'flex',
        margin: 0,
        alignItems: 'center',
        marginLeft,
      }}
    >
      <span />
      <img style={{ maxWidth, ...style }} src={src} />
    </div>
  )
}

export default Topbar
