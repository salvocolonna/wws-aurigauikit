import React from "react"
import sizeMe from "react-sizeme"
import "./timeline.less"

const MIN_WIDTH = 80
const PAD = 20

const classes = classes => classes.join(" ")

const SizedUl = sizeMe()(props => <ul {...props} />)

export const Step = ({ children, active, mini, onClick, current, enable = true }) => {
  if (mini) {
    return (
      <li
        className={classes([
          active ? "active" : "",
          enable ? "" : "disabled",
          current ? "current" : ""
        ])}>
        <div className="Timeline-ball">
          {active && <i className={classes(["Timeline-check", "fa fa-check"])} />}
        </div>
        <div className="Timeline-label" onClick={() => !current && enable && onClick()}>
          {children}
        </div>
      </li>
    )
  }
  return (
    <li
      className={classes([
        active ? "active" : "",
        enable ? "" : "disabled",
        current ? "current" : ""
      ])}>
      <div className="Timeline-labelContainer">
        <div className="Timeline-label" onClick={() => !current && enable && onClick()}>
          <div className="Timeline-text">{children}</div>
          <div className="Timeline-arrow" />
        </div>
      </div>
      <div className="Timeline-ball">
        {active && <i className={classes(["Timeline-check", "fa fa-check"])} />}
      </div>
    </li>
  )
}

class Timeline extends React.Component {
  state = { mini: false }

  changeSize = ({ width }) => {
    const steps = this.getSteps()
    const mini = width <= (MIN_WIDTH + PAD) * (2 + steps.length)
    this.setState({ mini })
  }

  getSteps = () => {
    const { steps, children } = this.props
    return children ? React.Children.toArray(children) : steps
  }

  render() {
    const { mini } = this.state
    const { step: index, onChange, children } = this.props
    const steps = this.getSteps()
    return (
      <div className={mini ? "TimelineMini" : "Timeline"}>
        <SizedUl onSize={this.changeSize}>
          {steps.map((step, i) => {
            const props = {
              key: i,
              active: i <= index,
              current: i === index,
              mini,
              onClick: () => onChange && onChange(i)
            }
            if (children) return React.cloneElement(step, props)
            return (
              <Step key={i} {...props}>
                {step}
              </Step>
            )
          })}
        </SizedUl>
      </div>
    )
  }
}

Timeline.Step = Step
export default Timeline
