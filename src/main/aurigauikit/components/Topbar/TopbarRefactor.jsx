import React from 'react'
import Notification from 'aurigauikit/components/Notification'
import MediaQuery from 'react-responsive'
const bankImg = <i className="fa fa-bank" />
import { Layout, Menu, Icon } from 'aurigauikit/antd'

const { Header, Sider, Content } = Layout

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
      onCollapse,
      collapsed,
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
      <Header
        className="header"
        style={{
          position: 'fixed',
          background: '#fff',
          padding: 0,
          boxShadow: '0 2px 8px #f0f1f2',
          zIndex: 99998,
          marginLeft: collapsed ? 80 : 200,
          width: `calc(100% - ${collapsed ? 80 : 200}px)`,
          transition: 'all .2s ease-in-out',
        }}
      >
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onCollapse}
        />
      </Header>
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
