import React from 'react'
import Workflow from 'aurigauikit/components/Workflow'
import { FormattedMessage as Msg } from 'react-intl'

const BUTTON_WIDTH = 180

export default class extends React.Component {
  back = () => {
    const { onChange, currentState, initialBack } = this.props
    if (currentState > 0) {
      onChange(currentState - 1)
    } else if (initialBack && typeof initialBack === 'function') {
      initialBack()
    }
  }

  next = () => {
    const { onChange, currentState, states } = this.props
    if (currentState < states.length) onChange(currentState + 1)
  }

  render() {
    const { children, currentState, saving, states, canProceed, form, initialBack } = this.props
    const lastStep = currentState >= states.length - 1
    return [
      <Main key="Wizard">
        <Left>
          <Back onClick={this.back} disabled={(!initialBack && currentState === 0) || saving} />
        </Left>
        <Center>
          <Workflow raw showNext states={states} currentState={states[currentState - 1]} />
        </Center>
        <Right>
          {!lastStep && <Next disabled={!canProceed} onClick={this.next} />}
          {lastStep && (
            <Next
              className="confirmatory"
              onClick={!form && this.next}
              disabled={!canProceed || currentState >= states.length || saving}
              text={saving ? <Msg id="saving" /> : <Msg id="save" />}
            />
          )}
        </Right>
      </Main>,
      children,
    ]
  }
}

const Back = ({ onClick, disabled }) => (
  <button
    className="btn btn-primary-outline"
    onClick={onClick}
    style={{ width: BUTTON_WIDTH }}
    disabled={disabled}
  >
    <Msg id="back" />
  </button>
)

const Next = ({ text = <Msg id="next" />, onClick, disabled, className = 'primary-outline' }) => (
  <button
    className={`btn btn-${className}`}
    onClick={onClick}
    style={{ width: BUTTON_WIDTH }}
    disabled={disabled}
  >
    {text}
  </button>
)

const Main = ({ children }) => (
  <section style={{ marginTop: 40 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  </section>
)

const Left = ({ children }) => <div> {children} </div>

const Center = ({ children }) => (
  <div
    style={{
      width: '100%',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
)

const Right = ({ children }) => <div> {children} </div>
