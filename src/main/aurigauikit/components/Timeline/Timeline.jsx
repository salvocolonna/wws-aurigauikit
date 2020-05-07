import React from 'react'
import sizeMe from 'react-sizeme'
import Loader from '../Loader'
import './timeline.less'

const MIN_WIDTH = 80
const PAD = 20

const classes = classes => classes.join(' ')

const SizedDiv = sizeMe()(props => <div {...props} />)

export const Step = ({
  unselectable,
  skipped,
  confirmed = true,
  children,
  active,
  mini,
  onClick,
  current,
  enable = true,
  warning,
}) => {
  if (mini) {
    return (
      <li
        className={classes([
          active ? 'active' : '',
          enable ? '' : 'disabled',
          current ? 'current' : '',
          skipped ? 'skipped' : '',
        ])}
      >
        <div className="Timeline-ball">
          {active &&
            (confirmed ? (
              <i
                className={
                  skipped ? 'Timeline-skipped' : classes(['Timeline-check', 'fa fa-check'])
                }
              />
            ) : (
              <div className="Timeline-unconfirmed" />
            ))}
        </div>
        <div
          className={!skipped ? 'Timeline-label' : classes(['Timeline-label', 'skipped'])}
          onClick={() => !current && enable && onClick()}
        >
          {children}
        </div>
      </li>
    )
  }
  if (warning) {
    return (
      <li
        className={classes([
          active ? 'active' : '',
          enable ? '' : 'disabled',
          current ? 'current' : '',
        ])}
      >
        <div className="Timeline-warning">
          <div className="Timeline-warning-text">{children}</div>
        </div>
      </li>
    )
  }
  return (
    <li
      className={classes([
        active ? 'active' : '',
        enable ? '' : 'disabled',
        skipped ? 'skipped' : '',
        current ? 'current' : '',
      ])}
    >
      <div className="Timeline-labelContainer">
        <div
          className={!unselectable ? 'Timeline-label' : classes(['Timeline-label', 'unselectable'])}
          onClick={() => !current && enable && onClick()}
        >
          <div className={!skipped ? 'Timeline-text' : classes(['Timeline-text', 'skipped-text'])}>
            {children}
          </div>
          <div className="Timeline-arrow" />
        </div>
      </div>
      <div className="Timeline-ball">
        {active &&
          (confirmed ? (
            <i
              className={skipped ? 'Timeline-skipped' : classes(['Timeline-check', 'fa fa-check'])}
            />
          ) : (
            <div className="Timeline-unconfirmed">
              <Loader />
            </div>
          ))}
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
    const { step: index, onChange, children, unselectable } = this.props
    const steps = this.getSteps()
    return (
      <div className={mini ? 'TimelineMini' : 'Timeline'}>
        <SizedDiv onSize={this.changeSize}>
          <ul>
            {steps.map((step, i) => {
              const props = {
                unselectable,
                key: i,
                active: i <= index,
                current: i === index,
                mini,
                onClick: onChange && (() => onChange(i)),
                ...step.props,
              }
              if (children) return React.cloneElement(step, props)
              return (
                <Step key={i} {...props}>
                  {step}
                </Step>
              )
            })}
          </ul>
        </SizedDiv>
      </div>
    )
  }
}

Timeline.Step = Step
export default Timeline
