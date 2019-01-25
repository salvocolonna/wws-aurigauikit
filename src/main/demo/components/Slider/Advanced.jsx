import React from "react"
import Slider from "aurigauikit/components/Slider"

export default class extends React.Component {
  state = { slider: 0 }

  sliderChanged = slider => this.setState({ slider })

  displayValue = value => {
    switch (value) {
      case 0:
        return "1W"
      case 1:
        return "1M"
      case 2:
        return "6M"
      case 3:
        return "12M"
      default:
        return value
    }
  }

  render() {
    const { slider } = this.state
    return (
      <div style={{ width: "50%" }}>
        <Slider
          willDisplay={this.displayValue}
          max={3}
          value={slider}
          onChange={this.sliderChanged}
        />
      </div>
    )
  }
}
