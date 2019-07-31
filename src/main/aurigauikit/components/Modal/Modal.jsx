import React from 'react'
import ReactDOM from 'react-dom'
import sizeMe from 'react-sizeme'
import './modal.less'
import debounce from 'lodash/debounce'
import { Header, Content, Footer } from './components'

const ESC = 27

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keyup', this.closeOnEsc)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.closeOnEsc)
  }

  closeOnEsc = e => {
    if (e.keyCode === ESC) if (this.props.show) this.props.onClose()
  }

  render() {
    const { show, children, onClose, transitions, style } = this.props
    return ReactDOM.createPortal(
      show && (
        <Overlay onClick={onClose}>
          <Dialog style={style} transitions={transitions} onClose={onClose}>
            {children}
          </Dialog>
        </Overlay>
      ),
      document.body
    )
  }
}

class Overlay extends React.Component {
  id = guid()

  isMe = e => e.target === document.getElementById(this.id)

  clicked = e => this.isMe(e) && this.props.onClick()

  render() {
    const { children } = this.props
    return (
      <div
        onClick={this.clicked}
        id={this.id}
        className="react-modal-panel-overlay"
        style={{ height: '100vh', width: '100vw', overflow: 'overlay' }}
      >
        {children}
      </div>
    )
  }
}

class Dialog extends React.Component {
  parentRef = React.createRef()

  state = {
    opacity: 0.5,
    fullscreen: true,
    top: null,
    left: null,
  }

  recenter = () => {
    const node = this.parentRef.current
    const size = {
      height: window.innerHeight,
      width: window.innerWidth,
    }
    this.setState({
      top: (size.height - node.clientHeight) / 2,
      left: (size.width - node.clientWidth) / 2,
    })
  }

  debouncedResize = debounce(this.recenter, 50)

  componentDidMount() {
    this.recenter()
    window.addEventListener('resize', this.debouncedResize)
    setTimeout(() => this.setState({ opacity: 1 }), 50)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResize)
  }

  render() {
    const { style, margin = 80, children, transitions = true } = this.props
    const { left, top } = this.state
    const modalStyle = {
      ...style,
      transform: `translateX(${Math.round(left) - 40}px) translateY(${Math.max(
        Math.round(top) - 40,
        margin
      )}px)`,
      marginBottom: Math.max(top, margin) === margin && margin,
      opacity: this.state.opacity,
      transition: 'opacity .2s' + (transitions ? ', transition .2s' : ''),
    }
    return (
      <Panel onSize={this.recenter} style={modalStyle}>
        <div ref={this.parentRef}> {children} </div>
      </Panel>
    )
  }
}

const Panel = sizeMe({ monitorHeight: true, noPlaceholder: true })(({ children, style }) => (
  <div className="react-modal-panel secondary" style={style}>
    {children}
  </div>
))

Modal.Header = Header
Modal.Content = Content
Modal.Footer = Footer

export default Modal
