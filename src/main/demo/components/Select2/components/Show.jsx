import React from "react"

const Show = ({ value }) => (
  <div style={{ marginBottom: "5px" }}>
    <div>
      <b>Selected element: </b>
    </div>
    <div>{value}</div>
  </div>
)

export default Show
