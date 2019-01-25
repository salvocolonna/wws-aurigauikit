import React from "react"
import Select2 from "aurigauikit/components/Select2/Select2ReWrapper"
import Show from "./components/Show"

const elements = [{ name: "First Element" }, { name: "Second Element" }]

export default class extends React.Component {
  state = { element: elements[0] }

  onSelect = element => this.setState({ element })

  render() {
    const { element } = this.state
    return (
      <div style={{ width: "50%" }}>
        <Show value={element.name} />
        <Select2
          style={{ width: "100%" }}
          data={elements}
          value={element}
          didSelect={this.onSelect}
          willDisplay={element => element.name}
        />
      </div>
    )
  }
}
