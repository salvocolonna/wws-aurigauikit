import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { Item, SubMenu } from './SidebarLegacy'
import logoMini from './logo-mini.svg'
import './sidebar.less'
const { SubMenu: AntSubMenu } = Menu
const { Sider } = Layout

const Sidebar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { openSubMenu: null }
  }

  // BUG FIXED
  prevOpen = null

  componentDidMount() {
    document.body.addEventListener('click', this.closeOnBodyClick, true)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeOnBodyClick)
  }

  closeOnBodyClick = () => {
    this.prevOpen = this.state.openSubMenu
    setTimeout(() => {
      if (this.prevOpen) this.setState({ openSubMenu: null })
    }, 0)
  }

  onSubMenuClick(submenu) {
    const openSubMenu = (this.state.openSubMenu || this.prevOpen) === submenu ? null : submenu
    this.prevOpen = null
    this.setState({ openSubMenu })
  }

  componentDidUpdate(props) {
    const isCollapsedLast = props.collapsed || props.isTablet
    const isCollapsed = this.props.collapsed || this.props.isTablet
    if (isCollapsed && !isCollapsedLast) this.setState({ openSubMenu: null })
  }

  render() {
    const {
      children,
      logo,
      onLogoClick,
      items,
      basename,
      topbar,
      collapsed,
      isTablet,
      hash,
      router
    } = this.props
    const { openSubMenu } = this.state
    const isCollapsed = collapsed || isTablet
    const activeKeys = getActiveKeys(children, basename, isCollapsed, hash)
    return (
      <Sider
        style={{
          overflow: 'auto',
          overflowX: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 1002,
          userSelect: 'none',
        }}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        theme="dark"
      >
        {logo && (
          <Logo
            isCollapsed={isCollapsed}
            src={isCollapsed ? logoMini : logo}
            onClick={() => onLogoClick && onLogoClick()}
            height={topbar}
          />
        )}

        <Menu
          multiple
          mode="inline"
          selectedKeys={activeKeys}
          openKeys={[...activeKeys, openSubMenu]}
        >
          {Children.map(children, child => {
            if (child && child.type === Item && canView(items, child)) {
              const { href, icon, name, key } = child.props
              return (
                <Menu.Item key={key}>
                  {router ? (
                    <Link to={href} style={{ textDecoration: 'none' }}>
                      <Icon type={icon && icon.startsWith('fa-') ? icon.substring(3) : icon} />
                      <span>{name}</span>
                    </Link>
                  ) : (
                      <a href={href} style={{ textDecoration: 'none' }}>
                        <Icon type={icon && icon.startsWith('fa-') ? icon.substring(3) : icon} />
                        <span>{name}</span>
                      </a>
                    )}
                </Menu.Item>
              )
            } else if (child && child.type === SubMenu) {
              const key = child.key
              const submenuItems = Children.map(child.props.children, child => {
                if (child && child.type === Item && (hash || canView(items, child, key))) {
                  const key = child.key
                  return (
                    <Menu.Item key={key}>
                      {router ? (
                        <Link to={child.props.href} style={{ textDecoration: 'none' }}>
                          <span>{child.props.name}</span>
                        </Link>
                      ) : (
                          <a href={child.props.href} style={{ textDecoration: 'none' }}>
                            <span>{child.props.name}</span>
                          </a>
                        )}
                    </Menu.Item>
                  )
                }
              })
              const { name, icon } = child.props
              return (
                submenuItems.length > 0 && (
                  <AntSubMenu
                    key={key}
                    fixed
                    onTitleClick={() => this.onSubMenuClick('.$' + key)}
                    title={
                      <span>
                        <Icon type={icon && icon.startsWith('fa-') ? icon.substring(3) : icon} />
                        <span>{name}</span>
                      </span>
                    }
                  >
                    {submenuItems}
                  </AntSubMenu>
                )
              )
            }
          })}
        </Menu>
      </Sider>
    )
  }
}

function getActiveKeys(children, basename, collapsed, hash) {
  return React.Children.toArray(children).reduce((activeKeys, child) => {
    if (child && child.type === Item) {
      const active = isActive(child.props.href, hash, basename)
      if (active) return [...activeKeys, child.key]
    } else if (child && child.type === SubMenu) {
      const key = child.key
      const activeItems = React.Children.toArray(child.props.children).reduce(
        (activeKeys, child) => {
          if (child.type === Item) {
            const active = isActive(child.props.href, hash, basename)
            if (active) return [...activeKeys, child.key]
          }
          return activeKeys
        },
        []
      )
      if (activeItems.length > 0 && !collapsed) {
        activeItems.push(key)
      }
      return [...activeKeys, ...activeItems]
    }
    return activeKeys
  }, [])
}

Sidebar.displayName = 'Sidebar'
Item.displayName = 'Item'
SubMenu.displayName = 'SubMenu'

function isActive(to, isHash, basename = '') {
  const href = basename + to
  let end = href.length
  if (href.indexOf('?') > 0) end = href.indexOf('?')
  const relativeHref = href.substr(0, end)
  if (isHash) {
    const hash = location.hash.substring(1)
    return hash === relativeHref || hash.startsWith(relativeHref + '/')
  }
  return (
    location.pathname === relativeHref ||
    location.pathname.startsWith(relativeHref + '/') ||
    location.hash === relativeHref ||
    location.hash.startsWith(relativeHref + '/')
  )
}

const Logo = ({ src, onClick, isCollapsed }) => (
  <div
    id="react-sidebar-logo"
    onClick={() => onClick()}
    style={{ padding: isCollapsed ? 10 : undefined }}
  >
    <img id="app-logo-full" src={src} />
  </div>
)

const canView = (items = [], child, parentKey) => {
  if (!child.props) return false
  let key = child.key
  if (parentKey) key = parentKey + '.' + key
  return items.includes(key)
}

Sidebar.SubMenu = SubMenu
Sidebar.Item = Item

export { Sidebar, Item, SubMenu }
export default Sidebar
