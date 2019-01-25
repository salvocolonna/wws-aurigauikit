import React from "react"
import Sidebar, { Item } from "aurigauikit/components/Sidebar"
import { withRouter } from "react-router-dom"
import logo from "./logo.png"
import components from "./components"

const visibleComponents = Object.keys(components).filter(displayName => {
  const component = components[displayName]
  const parts = Object.keys(component).filter(part => part !== "description")
  if (parts.length === 0) return false
  return parts.reduce((hasCode, key) => {
    const part = component[key]
    return hasCode || !!part.code
  }, false)
})

class SidebarDemo extends React.Component {
  onLogoClick = () => this.props.history.push("/" + Object.keys(components)[0])

  items = Object.keys(components).map(displayName => displayName.toLowerCase())

  componentDidMount() {
    const home = location.href.split("/")[location.href.split("/").length - 1] === ""
    if (home) this.onLogoClick()
  }

  render() {
    return (
      <Sidebar router items={this.items} onLogoClick={this.onLogoClick} logo={logo} {...this.props}>
        {visibleComponents.map(displayName => (
          <Item
            key={displayName}
            id={displayName.toLowerCase()}
            name={displayName}
            href={"/" + displayName}
          />
        ))}
      </Sidebar>
    )
  }
}

export default withRouter(SidebarDemo)
