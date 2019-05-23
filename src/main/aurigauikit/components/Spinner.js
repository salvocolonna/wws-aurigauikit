import React from 'react'
import { Spinner } from 'spin.js'
import 'spin.js/spin.css'

export default class extends React.Component {
  static defaultProps = {
    config: {},
    color: 'black',
  }

  state = { opacity: 0 }

  componentDidMount() {
    const { target = 'content-dynamic', color = '#999', config } = this.props
    const spinConfig = {
      lines: 13,
      length: 56,
      width: 10,
      radius: 84,
      scale: 0.2,
      corners: 1,
      color,
      opacity: 0.15,
      rotate: 1,
      direction: 1,
      speed: 1.5,
      trail: 100,
      fps: 20,
      zIndex: 2e9,
      className: 'spinner',
      position: 'relative',
      //shadow: true,
      hwaccel: true,
      // config will overwrite anything else
      ...config,
    }

    this.spinner = new Spinner(spinConfig)
    this.spinner.spin(document.getElementById(target))
    setTimeout(() => this.setState({ opacity: 0.85 }), 50)
  }

  componentWillUnmount() {
    this.spinner.stop()
  }

  render = () => (
    <div
      onClick={this.props.onClick}
      style={{
        position: 'absolute',
        zIndex: 199999999,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: this.state.opacity,
        transition: 'opacity 1s',
      }}
    />
  )
}
