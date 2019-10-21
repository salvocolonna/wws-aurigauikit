import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './sidebar.less'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

const Sidebar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { openSubMenu: null }
    this.closeOnBodyClick = this.closeOnBodyClick.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeOnBodyClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeOnBodyClick)
  }

  closeOnBodyClick(e) {
    if (this.state.openSubMenu && !ReactDOM.findDOMNode(this.state.openSubMenu).contains(e.target))
      this.setState({ openSubMenu: null })
  }

  onSubMenuClick(submenu) {
    this.setState({ openSubMenu: submenu })
  }

  render() {
    const { children, logo, horizontal, onLogoClick, items, router, basename, topbar } = this.props
    return (
      <Sider
        style={{
          overflow: 'auto',
          overflowX: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 2,
        }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        {logo && <Logo src={logo} onClick={() => onLogoClick()} height={topbar} />}
        <Menu theme="dark" mode="inline">
          {children.map((child, index) => {
            if (child.type === Item && canView(items, child)) {
              const active = isActive(child.props.href, basename)
              return (
                <Menu.Item className={active ? 'ant-menu-item-selected' : undefined}>
                  <Link to={child.props.href} style={{ textDecoration: 'none' }}>
                    <Icon type="user" />
                    <span>{child.props.name}</span>
                  </Link>
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </Sider>
    )
  }
}

class Item extends React.Component {}

class SubMenu extends React.Component {
  render() {
    const {
      children,
      name,
      openSubMenu,
      icon,
      onClick,
      items,
      id,
      basename,
      horizontal,
      router,
    } = this.props
    let active = false
    let open = false
    let hasChildren = false
    let hasOneChild = false

    if (children) {
      if (children.length) {
        children.forEach(child => {
          if (canView(items, child, id)) {
            hasChildren = true
            if (!active) active = isActive(child.props.href, basename)
          }
        })
      } else {
        if (canView(items, children, id)) {
          hasOneChild = true
          if (!active) active = isActive(children.props.href, basename)
        }
      }
    }
    if (openSubMenu === this) open = true
    return (
      (hasChildren || hasOneChild) && (
        <li
          className={`submenu ${active ? 'active' : ''}`}
          onClick={() => onClick(this)}
          style={{
            display: horizontal ? 'inline-block' : 'block',
            direction: 'ltr',
            textAlign: 'left',
          }}
        >
          <span className={`react-sidebar-title ${active ? 'active' : ''} ${open ? 'open' : ''}`}>
            <i className={'fa ' + icon} />
            <span className="react-sidebar-item">{name}</span>
          </span>
          {(active || open) && (
            <ul className="secondary" style={openSubMenu === this ? { display: 'block' } : {}}>
              {hasChildren &&
                children.map(
                  (child, index) =>
                    canView(items, child, id) && (
                      <Item
                        router={router}
                        horizontal={horizontal}
                        basename={basename}
                        {...child.props}
                        key={index}
                      />
                    )
                )}
              {hasOneChild && canView(items, children, id) && <Item {...children.props} />}
            </ul>
          )}
        </li>
      )
    )
  }
}

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
