import React from "react"

const Show = ({ date }) => (
  <div>
    {date && (
      <div style={{ marginBottom: "5px" }}>
        <b>Selected date: </b>
        <div>{date.format("DD-MM-YYYY")}</div>
      </div>
    )}
    {!date && (
      <div style={{ marginBottom: "5px" }}>
        <b>Select a date</b>
      </div>
    )}
  </div>
)

export default Show
