import React from 'react'
import Notification from 'aurigauikit/components/Notification'
import MediaQuery from 'react-responsive'
import { Layout, Divider } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const bankImg = <i className="fa fa-bank" />
const { Header } = Layout

function Topbar({
  logo,
  logoImage,
  onLogoClick,
  roleDescription,
  onLogout,
  notificationFrontend,
  notificationBackend,
  userCode,
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
  const [logoError, setLogoError] = useState(false)
  const isCollapsed = collapsed || isTablet

  const hasNotification = notificationFrontend && notificationBackend
  const notification = hasNotification && (
    <Notification
      userCode={userCode}
      frontend={notificationFrontend}
      backend={notificationBackend}
      customUrl={notificationCustomUrl}
      appCode={notificationAppCode}
    />
  )
  const onLogoError = () => setLogoError(true)

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isTablet ? (
            <div />
          ) : isCollapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={onCollapse} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={onCollapse} />
          )}
          {logo && <Logo src={logo} onClick={onLogoClick} />}
          {!logoError && logoImage && logoImage.src && (
            <LogoImage
              onError={onLogoError}
              {...logoImage}
              style={{ ...logoImage.style, maxHeight: 80 }}
            />
          )}
        </div>
        <div style={{ marginRight: 40 }}>
          <MediaQuery maxWidth={1000}>
            {hasNotification && <span> {notification} </span>}
            {hasNotification && <Divider type="vertical" />}
            <span>
              <UserOutlined />
              <span>{userName}</span>
            </span>
          </MediaQuery>
          <MediaQuery minWidth={1000}>
            <>
              {hasNotification && <span> {notification} </span>}
              {hasNotification && <Divider type="vertical" />}
              {parentBankCode && parentBankDescription && (
                <span>
                  {bankImg} {`${parentBankDescription} (${parentBankCode})`}
                </span>
              )}
              {bankCode && bankDescription && (
                <>
                  {parentBankCode && parentBankDescription && <Divider type="vertical" />}
                  <span>
                    {!parentBankCode && bankImg} {`${bankDescription} (${bankCode})`}
                  </span>
                </>
              )}
              {areaCode && areaDescription && (
                <>
                  {bankCode && bankDescription && <Divider type="vertical" />}
                  <span>{`${areaDescription} (${areaCode})`}</span>
                </>
              )}
              {branchCode && branchDescription && (
                <>
                  {areaCode && areaDescription && <Divider type="vertical" />}
                  <span>
                    {!areaCode && bankImg} {`${branchDescription} (${branchCode})`}
                  </span>
                </>
              )}
              <Divider type="vertical" />
              <span>
                <UserOutlined />
                <span>{userName}</span>
              </span>
            </>
          </MediaQuery>
          <MediaQuery minWidth={786}>
            <>
              {roleDescription && (
                <>
                  <Divider type="vertical" />
                  <span>{roleDescription.split('_').join(' ')}</span>
                </>
              )}
            </>
          </MediaQuery>
          {onLogout && (
            <>
              <Divider type="vertical" />
              <span style={{ cursor: 'pointer' }} onClick={() => onLogout && onLogout()}>
                <LogoutOutlined />
                <span> Logout</span>
              </span>
            </>
          )}
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

const LogoImage = ({ src, onClick, marginLeft = 0, maxWidth = 300, style = {} }) => {
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
