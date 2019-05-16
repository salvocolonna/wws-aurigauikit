import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './style.less'
import sizeMe from 'react-sizeme'

const ESC = 27
const TRANSITION = 0.2

export const usePopover = ref => {
  const [position, setPosition] = useState(null)
  const show = () => {
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      left: (rect.x || rect.left) + rect.width / 2,
      top: (rect.y || rect.top) + rect.height / 2 + 5,
    })
  }
  const onClose = () => setPosition(null)
  return { position, show, onClose }
}

export default class Popover extends React.Component {
  state = { size: { width: 0 }, opacity: 0 }

  componentDidUpdate({ position }) {
    const props = this.props
    const { opacity } = this.state
    const showing =
      props.position &&
      position &&
      opacity === 0 &&
      (props.position.left !== position.left || props.position.top !== position.top)
    if (showing) this.setState({ opacity: 1 })
  }

  componentDidMount() {
    document.addEventListener('keyup', this.closeOnEsc)
    document.body.addEventListener('click', this.closeOnBodyClick)
    window.addEventListener('resize', this.closeOnResize)
    document.getElementById('content-dynamic').addEventListener('scroll', this.closeOnResize)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.closeOnEsc)
    window.removeEventListener('resize', this.closeOnResize)
    document.getElementById('content-dynamic').removeEventListener('scroll', this.closeOnResize)
  }

  closeOnEsc = e => {
    if (e.keyCode === ESC) {
      const { position, onClose } = this.props
      const close = position && onClose
      const animate = () => setTimeout(onClose, TRANSITION * 1000)
      if (close) this.setState({ opacity: 0 }, animate)
    }
  }

  closeOnResize = () => {
    const { position, onClose } = this.props
    const close = position && onClose
    const animate = () => setTimeout(onClose, TRANSITION * 1000)
    if (close) this.setState({ opacity: 0 }, animate)
  }

  closeOnBodyClick = e => {
    const { position, onClose } = this.props
    const reference = this.reference
    const close = position && onClose && reference && !reference.contains(e.target)
    const animate = () => setTimeout(onClose, TRANSITION * 1000)
    if (close) {
      e.preventDefault()
      this.setState({ opacity: 0 }, animate)
    }
  }

  get position() {
    const { position } = this.props
    if (position) {
      const { width } = this.state.size
      const PAD = 10
      const center = position.left - width / 2
      const maxLeft = Math.min(window.innerWidth - width - PAD, center)
      const left = Math.max(10 + PAD, maxLeft)
      const maxOffset = Math.min(width / 2 - PAD - 10 - 1, center - left)
      const offset = Math.max(-width / 2 + 1, maxOffset)
      return { top: position.top, left, offset }
    }
    return { top: 0, left: 0, offset: 0 }
  }

  onSize = size => {
    const animate = () => setTimeout(() => this.setState({ opacity: 1 }), 50)
    this.setState({ size }, animate)
  }

  isUpsideDown = (top, height) => {
    const pageHeight = document.body.scrollHeight
    return pageHeight < height + top + 20
  }

  render() {
    const { position, children } = this.props
    const {
      opacity,
      size: { height },
    } = this.state
    const { offset, ...fixedPosition } = this.position

    const upsideDown = this.isUpsideDown(fixedPosition.top, height)
    if (upsideDown) fixedPosition.top -= height + 30

    return ReactDOM.createPortal(
      position && (
        <div
          className="Popover-container"
          style={{ ...fixedPosition }}
          ref={reference => (this.reference = reference)}
        >
          <SizedPopover onSize={this.onSize} opacity={opacity}>
            {!upsideDown && (
              <div className="Popover-arrow" style={{ transform: `translateX(${offset}px` }} />
            )}
            {children}
            {upsideDown && (
              <div
                className="Popover-arrowUpsideDown"
                style={{ transform: `translateX(${offset}px` }}
              />
            )}
          </SizedPopover>
        </div>
      ),
      document.body
    )
  }
}

const SizedPopover = sizeMe({
  monitorHeight: true,
})(({ children, opacity }) => (
  <div className="Popover" style={{ opacity, transition: `opacity ${2 * TRANSITION}s` }}>
    {children}
  </div>
))
