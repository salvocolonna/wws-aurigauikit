import React from 'react'
import { Spinner } from 'spin.js'
import 'spin.js/spin.css'
import HideBodyScroll from './HideBodyScroll'

export default class extends React.Component {
  static defaultProps = {
    config: {},
    color: 'black',
  }

  state = { opacity: 0.4 }

  componentDidMount() {
    const { target, color = 'rgba(153,153,153,0.1)', config } = this.props
    const spinConfig = {
      lines: 13,
      length: 56,
      width: 12,
      radius: 84,
      scale: 0.2,
      corners: 1,
      color,
      opacity: 0.05,
      rotate: 1,
      direction: 1,
      speed: 1.5,
      trail: 100,
      fps: 20,
      zIndex: 2e9,
      className: 'spinner',
      position: target ? 'relative' : 'fixed',
      //shadow: true,
      hwaccel: true,
      // config will overwrite anything else
      ...config,
    }

    this.spinner = new Spinner(spinConfig)
    this.spinner.spin(target ? document.getElementById(target) : document.body)
    setTimeout(() => this.setState({ opacity: 0.85 }), 0)
  }

  componentWillUnmount() {
    this.spinner.stop()
  }

  render = () => (
    <>
      <HideBodyScroll />
      <div
        onClick={this.props.onClick}
        style={{
          position: this.props.target ? 'absolute' : 'fixed',
          zIndex: 199999999,
          backgroundColor: this.props.target ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.25)',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          opacity: this.state.opacity,
          transition: 'opacity .4s',
          ...this.props.style,
        }}
      />
    </>
  )
}
