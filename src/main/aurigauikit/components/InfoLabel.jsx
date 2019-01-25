import React from "react"

export default function({ className, label, children }) {
  return (
    <div className={className}>
      <span className="label label-title"> {label} </span>
      {children && <br />}
      {children && <span className="label label-content"> {children} </span>}
    </div>
  )
}
