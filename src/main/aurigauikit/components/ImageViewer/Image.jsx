import React from "react"
import sizeMe from "react-sizeme"

const refreshRate = 16

function throttledEvent(name, refreshRate = 16) {
  let running = false
  const run = () => {
    window.dispatchEvent(new CustomEvent(name))
    running = false
  }
  return () => {
    if (running) {
      return
    }
    running = true
    if (refreshRate === 16) requestAnimationFrame(run)
    else setTimeout(run, refreshRate)
  }
}

const throttleResize = throttledEvent("optimizedResize")

export default sizeMe({ monitorHeight: true, refreshRate })(
  class extends React.Component {
    state = { loaded: false }

    resize = () => {
      if (this.img && this.props.currentSize) {
        const width = this.img.offsetWidth
        const height = this.img.offsetHeight
        if (width !== this.props.currentSize.width || height !== this.props.currentSize.height)
          this.props.onResize({ width, height })
      }
    }

    shouldComponentUpdate({ src, currentSize }, { loaded }) {
      return (
        this.props.src !== src ||
        this.props.currentSize !== currentSize ||
        loaded !== this.state.loaded
      )
    }

    componentDidMount() {
      if (this.img) this.img.onload = () => this.setState({ loaded: true }, this.resize)
      window.addEventListener("resize", throttleResize)
      window.addEventListener("optimizedResize", this.resize)
      this.resize()
    }

    componentWillUnmount() {
      window.removeEventListener("optimizedResize", this.resize)
      window.removeEventListener("resize", throttleResize)
    }

    render() {
      const { src, style, className, bordered, circle } = this.props
      const borders = {
        border: bordered ? "1px solid #2984C5" : undefined,
        borderRadius: circle ? "50%" : bordered ? 6 : undefined,
        objectFit: circle ? "cover" : undefined
      }
      return (
        <img
          ref={img => (this.img = img)}
          src={src}
          style={{
            ...borders,
            ...style,
            visibility: !this.state.loaded ? "hidden" : undefined
          }}
          className={className}
        />
      )
    }
  }
)
