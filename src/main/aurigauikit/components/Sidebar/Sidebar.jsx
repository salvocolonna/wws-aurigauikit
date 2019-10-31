import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './sidebar.less'
import { Layout, Menu, Icon } from 'aurigauikit/antd'

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
    console.log(this.submenus)
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
    const { children, logo, onLogoClick, items, basename, topbar, collapsed, isTablet } = this.props
    const { openSubMenu } = this.state

    const isCollapsed = collapsed || isTablet
    const activeKeys = getActiveKeys(children, basename, isCollapsed)

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
      >
        {logo && <Logo src={logo} onClick={() => onLogoClick()} height={topbar} />}
        <Menu
          multiple
          mode="inline"
          selectedKeys={activeKeys}
          openKeys={[...activeKeys, openSubMenu]}
        >
          {Children.map(children, (child, i) => {
            if (child && child.type === Item && canView(items, child)) {
              const { href, icon, name, id } = child.props
              return (
                <Menu.Item key={id}>
                  <Link to={href} style={{ textDecoration: 'none' }}>
                    <Icon type={icon && icon.startsWith('fa-') ? icon.substring(3) : icon} />
                    <span>{name}</span>
                  </Link>
                </Menu.Item>
              )
            } else if (child && child.type === SubMenu) {
              const id = child.props.id
              const submenuItems = Children.map(child.props.children, child => {
                if (child && child.type === Item && canView(items, child, id)) {
                  return (
                    <Menu.Item key={id + '.' + child.props.id}>
                      <Link to={child.props.href} style={{ textDecoration: 'none' }}>
                        <span>{child.props.name}</span>
                      </Link>
                    </Menu.Item>
                  )
                }
              })
              const { name, icon } = child.props
              return (
                submenuItems.length > 0 && (
                  <AntSubMenu
                    key={id}
                    fixed
                    onTitleClick={() => this.onSubMenuClick(id + '/.' + i)}
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

function getActiveKeys(children, basename, collapsed) {
  return React.Children.toArray(children).reduce((activeKeys, child, i) => {
    if (child && child.type === Item) {
      const active = isActive(child.props.href, basename)
      if (active) return [...activeKeys, child.props.id + '/.' + i]
    } else if (child && child.type === SubMenu) {
      const id = child.props.id
      const activeItems = React.Children.toArray(child.props.children).reduce(
        (activeKeys, child, i) => {
          if (child.type === Item) {
            const active = isActive(child.props.href, basename)
            if (active) return [...activeKeys, id + '.' + child.props.id + '/.' + i]
          }
          return activeKeys
        },
        []
      )
      if (activeItems.length > 0 && !collapsed) {
        activeItems.push(id + '/.' + i)
      }
      return [...activeKeys, ...activeItems]
    }
    return activeKeys
  }, [])
}

class Item extends React.Component {}
class SubMenu extends React.Component {}

Sidebar.displayName = 'Sidebar'
Item.displayName = 'Item'
SubMenu.displayName = 'SubMenu'

function isActive(to, basename = '') {
  const href = basename + to
  let end = href.length
  if (href.indexOf('?') > 0) end = href.indexOf('?')
  const relativeHref = href.substr(0, end)
  return location.pathname === relativeHref || location.pathname.startsWith(relativeHref + '/')
}

const Logo = ({ src, onClick }) => (
  <div id="react-sidebar-logo" onClick={() => onClick()}>
    <img id="app-logo-full" src={src} />
  </div>
)

const canView = (items = [], child, parentId) => {
  if (!child.props) return false
  let id = child.props.id
  if (parentId) id = parentId + '.' + id
  return items.includes(id) || items.includes(child.props.id)
}

Sidebar.SubMenu = SubMenu
Sidebar.Item = Item

export { Sidebar, Item, SubMenu }
export default Sidebar
