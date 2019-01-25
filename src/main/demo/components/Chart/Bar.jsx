import React from "react"
import { Bar } from "aurigauikit/components/Chart"

export default class extends React.Component {
  render() {
    return (
      <div style={{ width: "70%", height: 400 }}>
        <Bar
          data={data}
          options={{
            legend: { display: false },
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dic"],
  datasets: [
    {
      backgroundColor: "#2984C5",
      data: [9000, 9200, 9700, 10000, 11000, 10980, 10960, 11200, 11500, 12000, 12300, 12500]
    }
  ]
}
