import React from "react"

export default function({ children, style, type = "info", fa = null }) {
  let node = React.Children.toArray(children)

  const renderChildren = () => {
    return node.filter(child => child.type !== "i")
  }

  const renderIcon = () => {
    if (fa) {
      return <i className={`fa fa-lg fa-${fa}`} />
    }
    const i = node.filter(child => child.type === "i")[0]

    if (!i) {
      switch (type) {
        case "confirmatory":
          return <i className={`fa fa-lg fa-info`} />
        case "critical":
          return <i className={`fa fa-lg fa-times`} />
        case "warning":
          return <i className={`fa fa-lg fa-exclamation`} />
        default:
          return <i className={`fa fa-lg fa-question`} />
      }
    }
    return i
  }

  return (
    <div className={`static-panel static-panel-${type}`} style={{ margin: "0px", ...style }}>
      <div className="static-panel-icon">{renderIcon()}</div>
      {renderChildren()}
    </div>
  )
}
