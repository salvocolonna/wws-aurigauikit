import React from "react"
import Slider from "aurigauikit/components/Slider"

export default class extends React.Component {
  state = { slider: 0 }

  sliderChanged = slider => this.setState({ slider })

  render() {
    const { slider } = this.state
    return (
      <div style={{ width: "50%" }}>
        <Slider value={slider} onChange={this.sliderChanged} />
      </div>
    )
  }
}
