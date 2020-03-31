import React from 'react'
import { Link, Route, withRouter, Switch } from 'react-router-dom'

import './tabs.less'

const Routed = withRouter(({ render, ...props }) => render(props))

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { current: 0 }
  }

  tabClicked = (index, name) => {
    if (this.props.onChange) this.props.onChange(name)
    this.setState({ current: index })
  }

  render() {
    const { bordered, show = true } = this.props
    const children = React.Children.toArray(this.props.children)
      .filter(Boolean)
      .map((child, index) =>
        this.props.router ? (
          <Routed
            render={props => {
              return React.cloneElement(child, {
                isOpen:
                  props.match.url.toLowerCase() ===
                  ((this.props.basename || '') + child.props.path.split('?')[0]).toLowerCase(),
                onClick: () => props.history.push((this.props.basename || '') + child.props.path),
              })
            }}
          />
        ) : (
          React.cloneElement(child, {
            isOpen: this.state.current === index,
            onClick: () => this.tabClicked(index, child.props.name),
          })
        )
      )

    const content = this.props.router ? (
      <Switch>
        {React.Children.map(this.props.children, (child, index) => (
          <Route
            key={index}
            path={(this.props.basename || '') + child.props.path.split('?')[0]}
            render={() => <div>{child.props.children} </div>}
          />
        ))}
      </Switch>
    ) : (
      children[this.state.current] && children[this.state.current].props.children
    )

    return (
      <div>
        {show && <ul className="nav react-nav-tabs">{children}</ul>}
        <div
          style={{
            border: bordered ? '1px solid #ccc' : '0',
            borderTop: '0',
            paddingTop: show ? '20px' : null,
          }}
        >
          {content}
        </div>
      </div>
    )
  }
}

export default Tabs
