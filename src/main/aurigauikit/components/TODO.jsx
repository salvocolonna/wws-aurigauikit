import React from "react"

export default function({ children }) {
  return (
    <div>
      {"//"}
      <b>
        <i
          style={{
            position: "inherit",
            top: "initial",
            left: "inherit",
            marginRight: "5px"
          }}>
          TODO:
        </i>
      </b>
      {children}
    </div>
  )
}
