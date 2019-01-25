import React from "react"
import "./style.css"

export default ({ style }) => (
  <div
    className="loader"
    style={{
      float: "right",
      width: "5px",
      height: "5px",
      border: "10px solid #f3f3f3",
      borderTop: "10px solid #3498db",
      borderRight: "10px solid #3498db",
      borderStyle: "double",
      borderRadius: "50%",
      ...style
    }}
  />
)
