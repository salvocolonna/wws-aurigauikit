import React from "react"
import "./switch.less"

export default ({ checked = false, onChange }) => (
  <label className="switch">
    <input type="checkbox" value={checked} onChange={onChange} />
    <span className="slider round" />
  </label>
)
