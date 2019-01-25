import React from "react"
import ContextMenu from "aurigauikit/components/ContextMenu"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: { context: { position: null } },
      message: "Click a button"
    }
    this.items = [
      {
        title: "First Item",
        action: context => this.onMenuItemClick("First Item", context.button)
      },
      {
        title: "Second Item",
        action: context => this.onMenuItemClick("Second Item", context.button)
      }
    ]
  }

  onButtonClick(event, button) {
    const position = event.target.getBoundingClientRect()
    const menu = {
      context: {
        position: { top: position.top, left: position.left - 2 },
        button: button
      }
    }
    this.setState({ menu: menu })
  }

  onCloseMenuRequested() {
    this.setState({ menu: { context: { position: null } } })
  }

  onMenuItemClick(item, button) {
    this.setState({ message: `${item} called from ${button}` })
  }

  render() {
    return (
      <div>
        <ContextMenu
          items={this.items}
          context={this.state.menu.context}
          onCloseRequested={() => this.onCloseMenuRequested()}
        />
        <Message>{this.state.message}</Message>
        <Button onClick={event => this.onButtonClick(event, "First Button")}>First Button</Button>
        <Button onClick={event => this.onButtonClick(event, "Second Button")}>Second Button</Button>
      </div>
    )
  }
}

const Button = ({ onClick, children }) => (
  <button
    style={{ marginLeft: "5px", marginRight: "5px " }}
    className="btn btn-primary-outline"
    onClick={event => onClick(event)}>
    {children}
  </button>
)

const Message = ({ children }) => (
  <div style={{ marginBottom: "10px" }}>
    <b>{children}</b>
  </div>
)
