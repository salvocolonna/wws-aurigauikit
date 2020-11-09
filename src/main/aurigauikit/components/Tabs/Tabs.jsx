import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import './tabs.less'

const Routed = withRouter(({ render, ...props }) => render(props))

const Tabs = ({ router, basename, onChange, bordered, show = true, children }) => {
  const [current, setCurrent] = React.useState(0)

  const tabClicked = (index, name) => {
    if (onChange) onChange(name)
    setCurrent(index)
  }

  const mappedChildren = React.Children.toArray(children)
    .filter(Boolean)
    .map((child, index) =>
      router ? (
        <Routed
          render={({ history, match }) => {
            return React.cloneElement(child, {
              isOpen:
                match.url.toLowerCase() ===
                ((basename || '') + child.props.path.split('?')[0]).toLowerCase(),
              onClick: () => history.push((basename || '') + child.props.path),
            })
          }}
        />
      ) : (
        React.cloneElement(child, {
          isOpen: current === index,
          onClick: () => tabClicked(index, child.props.name),
        })
      )
    )

  const content = router ? (
    <Switch>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => (
          <Route
            key={index}
            path={(basename || '') + child.props.path.split('?')[0]}
            render={() => <div>{child.props.children} </div>}
          />
        ))}
    </Switch>
  ) : (
    mappedChildren[current] && mappedChildren[current].props.children
  )

  return (
    <div>
      {show && <ul className="nav react-nav-tabs">{mappedChildren}</ul>}
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

export default Tabs
