import React from "react"
import SimpleTable from "aurigauikit/components/SimpleTable"
import StaticPanel from "aurigauikit/components/StaticPanel"

export default function() {
  return (
    <SimpleTable
      headers={[
        {
          content: <b> Header 1 </b>,
          cssClass: "label-outline-confirmatory"
        },
        {
          content: <i> Header 2 </i>,
          cssStyle: { backgroundColor: "#f1f7fc", color: "#1e6292" }
        },
        {
          content: <i> Virtual header </i>,
          cssStyle: { backgroundColor: "#81878c", color: "#fef2f2" }
        }
      ]}
      columns={[
        {
          content: json => <b> {json.column1} </b>,
          cssClass: "label-outline-confirmatory"
        },
        {
          content: json => <i> {json.column2} </i>,
          cssStyle: { backgroundColor: "#f1f7fc", color: "#1e6292" }
        },
        {
          content: () => <StaticPanel> Virtual column </StaticPanel>,
          cssStyle: { backgroundColor: "#81878c", color: "#fef2f2" }
        }
      ]}
      data={[{ column1: "Column 1 Row 1", column2: "Column 2 Row 1" }]}
    />
  )
}
