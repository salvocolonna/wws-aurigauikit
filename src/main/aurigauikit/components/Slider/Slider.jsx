import React from "react"
import sizeMe from "react-sizeme"
import styles from "./style.less"

const WIDTH = 18

const SizedInput = sizeMe()(({ min = 0, max = 100, step = 1, value = 50, onChange }) => (
  <input
    className="slider"
    type="range"
    min={min}
    max={max}
    value={value}
    step={step}
    onChange={e => onChange && onChange(Number(e.target.value))}
    style={{ marginTop: WIDTH - 1 }}
  />
))

export default class extends React.Component {
  state = { width: 100 }
  onSize = size => this.setState({ width: size.width })
  render() {
    const {
      min = 0,
      max = 100,
      step = 1,
      value = 50,
      willDisplay,
      onChange,
      showValue = true
    } = this.props
    const { width } = this.state
    const display = value => (willDisplay && willDisplay(value)) || value
    return (
      <div className="slidecontainer">
        <span style={{ paddingRight: 10, transform: `translateY(${WIDTH - 1}px)` }}>
          {display(min)}
        </span>
        <span style={{ position: "relative", width: "100%" }}>
          {showValue && value > min && value < max && (
            <span
              style={{
                color: "#000",
                pointerEvents: "none",
                position: "absolute",
                transform: `translateX(calc(${(WIDTH - 1) / 2 +
                  (width - WIDTH - 1) * ((value - min) / (max - min))}px - 50%))`
              }}>
              {display(value)}
            </span>
          )}
          <SizedInput
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={onChange}
            onSize={this.onSize}
          />
        </span>
        <span style={{ paddingLeft: 10, transform: `translateY(${WIDTH - 1}px)` }}>
          {display(max)}
        </span>
      </div>
    )
  }
}
