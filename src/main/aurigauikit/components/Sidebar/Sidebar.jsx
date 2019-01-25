import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import "./sidebar.less"

const Sidebar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { openSubMenu: null }
    this.closeOnBodyClick = this.closeOnBodyClick.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener("click", this.closeOnBodyClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.closeOnBodyClick)
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
      <aside
        id={horizontal ? "react-sidebar-horizontal" : "react-sidebar"}
        style={{ height: horizontal ? "auto" : "100vh", zIndex: 101 }}>
        {logo && <Logo src={logo} onClick={() => onLogoClick()} height={topbar} />}
        <div
          id="react-sidebar-menu-wrapper"
          style={{ textAlign: horizontal ? "center" : "initial" }}>
          <ul
            className="primary"
            style={{
              height: `calc(100vh - ${topbar}px`,
              overflow: "auto",
              direction: "rtl"
            }}>
            {children.map((child, index) => {
              if (child.type.displayName === "SubMenu") {
                return (
                  <SubMenu
                    {...child.props}
                    key={index}
                    items={items}
                    horizontal={horizontal}
                    basename={basename}
                    router={router}
                    openSubMenu={this.state.openSubMenu}
                    onClick={submenu => this.onSubMenuClick(submenu)}
                  />
                )
              } else if (canView(items, child))
                return (
                  <Item
                    router={router}
                    horizontal={horizontal}
                    basename={basename}
                    {...child.props}
                    key={index}
                  />
                )
            })}
          </ul>
          <div id="react-sidebar-remainder" />
        </div>
      </aside>
    )
  }
}

class Item extends React.Component {
  render() {
    const { name, href, icon, router, basename, horizontal } = this.props
    const active = isActive(href, basename)
    const className = "fa " + (icon ? icon : "fa-angle-right")
    const style = { color: active ? "#DC402B" : "inherit", display: "initial" }
    return (
      <li
        className={active ? "active" : ""}
        style={{
          display: horizontal ? "inline-block" : "block",
          direction: "ltr",
          textAlign: "left"
        }}>
        {router ? (
          <Link to={href} style={{ textDecoration: "none" }}>
            <i className={className} style={style} />
            <span className="react-sidebar-item">{name}</span>
          </Link>
        ) : (
          <a href={href} style={{ textDecoration: "none" }}>
            <i className={className} style={style} />
            <span className="react-sidebar-item">{name}</span>
          </a>
        )}
      </li>
    )
  }
}

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
      router
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
          className={`submenu ${active ? "active" : ""}`}
          onClick={() => onClick(this)}
          style={{
            display: horizontal ? "inline-block" : "block",
            direction: "ltr",
            textAlign: "left"
          }}>
          <span className={`react-sidebar-title ${active ? "active" : ""} ${open ? "open" : ""}`}>
            <i className={"fa " + icon} />
            <span className="react-sidebar-item">{name}</span>
          </span>
          {(active || open) && (
            <ul className="secondary" style={openSubMenu === this ? { display: "block" } : {}}>
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

Sidebar.displayName = "Sidebar"
Item.displayName = "Item"
SubMenu.displayName = "SubMenu"

function isActive(to, basename = "") {
  const href = basename + to
  let end = href.length
  if (href.indexOf("?") > 0) end = href.indexOf("?")
  const relativeHref = href.substr(0, end)
  return location.pathname === relativeHref || location.pathname.startsWith(relativeHref + "/")
}

const Logo = ({ src, onClick, height }) => (
  <div id="react-sidebar-logo" onClick={() => onClick()} style={{ cursor: "pointer", height }}>
    <i className="fa fa-bars" style={{ color: "white", fontSize: 30 }} />
    <img id="app-logo-full" src={src} />
  </div>
)

const canView = (items = [], child, parentId) => {
  let id = child.props.id
  if (parentId) id = parentId + "." + id
  return items.includes(id) || items.includes(child.props.id)
}

Sidebar.SubMenu = SubMenu
Sidebar.Item = Item

export { Sidebar, Item, SubMenu }
export default Sidebar
