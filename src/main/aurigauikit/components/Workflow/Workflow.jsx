import React from "react"
import styles from "./workflow.less"
import { injectIntl } from "react-intl"

const ICON_SIZE = 40
const LINKER_WIDTH = 90
const TITLE_HEIGHT = 20
const TITLE_MARGIN = 10

const HEIGHT = 3 * ICON_SIZE + 2 * (TITLE_HEIGHT + TITLE_MARGIN)

class Workflow extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    deletedState: "DELETED"
  }

  isSucceded(state) {
    const stateIndex = this.props.states.indexOf(state)
    const previousStateIndex = this.props.states.indexOf(this.props.previousState)
    const currentStateIndex = this.props.states.indexOf(this.props.currentState)
    return (
      stateIndex <= (this.props.currentState === "DELETED" ? previousStateIndex : currentStateIndex)
    )
  }

  isNext(state) {
    const stateIndex = this.props.states.indexOf(state)
    const currentStateIndex = this.props.states.indexOf(this.props.currentState)
    return stateIndex === currentStateIndex + 1
  }

  isDeleted(state) {
    const stateIndex = this.props.states.indexOf(state)
    return (
      stateIndex >= 0 &&
      this.props.currentState === "DELETED" &&
      this.props.states[stateIndex] === this.props.previousState
    )
  }

  getTitleStyle(index, state) {
    const color =
      this.isDeleted(state) && !this.isSucceded(state)
        ? "#f00"
        : this.isSucceded(state)
          ? "#65C25A"
          : this.isNext(state) && this.props.showNext
            ? "#2984C5"
            : "#000"
    let transform = `translateX(calc(-50% + ${ICON_SIZE / 2}px))`
    if (index < this.props.states.length - 1) transform = `translateX(-${LINKER_WIDTH / 2}px)`
    if (this.isDeleted(state)) transform += ` translateY(${HEIGHT - ICON_SIZE}px)`
    return { color: color, transform: transform }
  }

  render() {
    const style = { ...this.props.style, pointerEvents: "none" }
    if (this.props.currentState === "DELETED") {
      style.marginTop = `-${HEIGHT - ICON_SIZE}px`
      style.height = `${2 * HEIGHT - ICON_SIZE}px`
    }

    const titleId = state => `order-status-code.${state}`
    const deletedTitleId = `order-status-code.${this.props.deletedState}`

    const title = state =>
      this.props.raw ? state : this.props.intl.formatMessage({ id: titleId(state) })

    const deletedTitle = this.props.raw
      ? this.props.deletedState
      : this.props.intl.formatMessage({ id: deletedTitleId })
    return (
      <div style={style}>
        {this.props.states.map((state, index) => (
          <div key={index} style={{ display: "inline-block", textAlign: "left" }}>
            <div className="Workflow--workflowTitle" style={this.getTitleStyle(index, state)}>
              {title(state)}
            </div>
            <div
              className="Workflow--timelineIcon"
              style={{
                transform: `translateY(${this.isDeleted(state) ? HEIGHT - ICON_SIZE : 0}px)`
              }}>
              {this.isSucceded(state) && <i className="fa fa-check" style={{ color: "#65C25A" }} />}
              {this.isDeleted(state) &&
                !this.isSucceded(state) && <i className="fa fa-close" style={{ color: "#f00" }} />}
            </div>
            {this.isDeleted(state) && (
              <div style={{ transform: `translateY(${HEIGHT - ICON_SIZE}px)` }}>
                <div className="Workflow--verticalLinker" />
                <div className="Workflow--timelineIcon">
                  <i className="fa fa-close" style={{ color: "#f00" }} />
                </div>
                <div className={`.Workflow--workflowTitle deleted`}>
                  {deletedTitle(this.props.deletedState)}
                </div>
              </div>
            )}
            {index < this.props.states.length - 1 && (
              <div
                className="Workflow--horizontalLinker"
                style={{
                  marginLeft: (this.isDeleted(state) ? ICON_SIZE : 0) + "px"
                }}
              />
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default injectIntl(Workflow)
