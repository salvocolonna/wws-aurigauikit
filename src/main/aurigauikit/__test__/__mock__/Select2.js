import React from "react"

export default ({ data, value, willDisplay = _ => _ }) => {
  const v = value ? willDisplay(value) : null
  return (
    <select value={v}>
      {data.map(value => {
        const v = value ? willDisplay(value) : null
        return (
          <option key={v} value={v}>
            {v}
          </option>
        )
      })}
    </select>
  )
}
