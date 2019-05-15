import React from "react"

const icons = {
  info: "info",
  confirmatory: "check",
  critical: "times",
  warning: "exclamation"
}

export default function StaticPanel(props) {
  const { style, type = "info" } = props
  const children = React.Children.toArray(props.children)
  const content = children.find(({ type }) => type !== StaticPanel.Icon)
  let icon = children.find(({ type }) => type === StaticPanel.Icon)
  const flexClassName = icon ? "-flex" : ""

  if (icon) icon = React.cloneElement(icon, { type })
  return (
    <div
      className={`static-panel${flexClassName && flexClassName} static-panel-${type}`}
      style={{ margin: "0px", ...style }}>
      {icon ? (
        <div style={{ display: "flex", flexBasis: "100%", marginRight: "1em" }}>
          {icon} {content}
        </div>
      ) : (
        props.children
      )}
    </div>
  )
}

StaticPanel.Icon = ({ children, type }) => {
  return children ? (
    children
  ) : (
    <div className="static-panel-icon">
      <i className={`fa fa-lg fa-${icons[type]}`} />
    </div>
  )
}
