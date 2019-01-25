import React from "react"
import SimpleTable from "aurigauikit/components/SimpleTable"

export default function() {
  return (
    <SimpleTable
      headers={["Header 1", "Header 2"]}
      columns={["column1", "column2"]}
      data={[{ column1: "Column 1 Row 1", column2: "Column 2 Row 1" }]}
    />
  )
}
