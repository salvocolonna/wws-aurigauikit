import React from "react"
import SimpleTable from "aurigauikit/components/SimpleTable"

export default function() {
  return (
    <SimpleTable
      sortable
      headers={["Header 1", "Header 2"]}
      columns={["column1", "column2"]}
      data={[
        { column1: "Column 1 Row 1", column2: "Column 2 Row 1" },
        { column1: "Column 1 Row 2", column2: "Column 2 Row 2" }
      ]}
    />
  )
}
