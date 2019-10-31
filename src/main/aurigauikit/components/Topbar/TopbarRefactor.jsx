import React from 'react'
import Notification from 'aurigauikit/components/Notification'
import MediaQuery, { useMediaQuery } from 'react-responsive'
const bankImg = <i className="fa fa-bank" />
import { Layout, Icon } from 'aurigauikit/antd'

const { Header } = Layout

function Topbar({
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
  onCollapse,
  collapsed,
  isTablet,
}) {
  const isCollapsed = collapsed || isTablet

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
    <Header
      className="header"
      style={{
        position: 'fixed',
        background: '#fff',
        padding: 0,
        boxShadow: 'rgb(160, 160, 160) 0px 0px 6px',
        zIndex: 1001,
        marginLeft: isCollapsed ? 80 : 200,
        width: `calc(100% - ${isCollapsed ? 80 : 200}px)`,
        transition: 'all .2s ease-in-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {isTablet ? (
          <div />
        ) : (
          <Icon
            className="trigger"
            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={onCollapse}
          />
        )}
        <div style={{ marginRight: 40 }}>
          <MediaQuery maxWidth={1000}>
            {hasNotification && <span style={{ marginRight: 20 }}> {notification} </span>}
            <span style={{ marginRight: 20 }}>
              <Icon type="user" /> <span>{userName}</span>
            </span>
          </MediaQuery>
          <MediaQuery minWidth={1000}>
            {hasNotification && <span style={{ marginRight: 20 }}> {notification} </span>}
            {parentBankCode && parentBankDescription && (
              <span style={{ marginRight: 20 }}>
                {bankImg} {`${parentBankDescription} (${parentBankCode})`}
              </span>
            )}
            {bankCode && bankDescription && (
              <span style={{ marginRight: 20 }}>
                {!parentBankCode && bankImg} {`${bankDescription} (${bankCode})`}
              </span>
            )}
            {areaCode && areaDescription && (
              <span style={{ marginRight: 20 }}>{`${areaDescription} (${areaCode})`}</span>
            )}
            {branchCode && branchDescription && (
              <span style={{ marginRight: 20 }}>
                {!areaCode && bankImg} {`${branchDescription} (${branchCode})`}
              </span>
            )}
            <span style={{ marginRight: 20 }}>
              <Icon type="user" /> <span>{userName}</span>
            </span>
          </MediaQuery>
          {roleDescription && (
            <MediaQuery minWidth={786}>
              <span style={{ marginRight: 20 }}>{roleDescription.split('_').join(' ')}</span>
            </MediaQuery>
          )}
          <span style={{ cursor: 'pointer' }} onClick={() => onLogout && onLogout()}>
            <Icon type="logout" />
            <span> Logout</span>
          </span>
        </div>
      </div>
    </Header>
  )
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
