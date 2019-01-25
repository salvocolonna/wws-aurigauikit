import React from "react"

export default function({ children, style, type = "info" }) {
  return (
    <div className={`static-panel static-panel-${type}`} style={{ margin: "0px", ...style }}>
      {children}
    </div>
  )
}
