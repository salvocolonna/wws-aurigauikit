import React from "react"
import "./ticker.less"
import isEqual from "lodash/isEqual"

const SPEED = 10

class Ticker extends React.Component {
  state = { animationDuration: 0, width: 0 }

  updateDuration = width => {
    const animationDuration = ((width / window.innerWidth) * 100) / SPEED
    this.setState({ width, animationDuration })
  }

  componentDidMount() {
    if (this.ticker) this.updateDuration(this.ticker.offsetWidth)
  }

  componentDidUpdate(props, state) {
    if (this.ticker && state.width !== this.ticker.offsetWidth)
      this.updateDuration(this.ticker.offsetWidth)
  }

  render() {
    const { items } = this.props
    const style = { animationDuration: this.state.animationDuration + "s" }
    return (
      <div className="Ticker-wrap">
        <div className="Ticker" ref={ticker => (this.ticker = ticker)} style={style}>
          {items.map((item, i) => (
            <div key={i} className="Ticker-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default class extends React.Component {
  state = { items: [] }

  fetchFeed = async () => {
    const { url, onFeed } = this.props
    if (url) {
      const feed = await jsonFeed(url)
      const items = (onFeed && onFeed(feed)) || feed.items.map(item => item.title)
      this.setState({ items })
    }
  }

  componentDidMount() {
    if (this.props.url) this.fetchFeed()
  }

  render() {
    const { url, items } = this.props
    return <Ticker items={url ? this.state.items : items} />
  }
}

export async function jsonFeed(url) {
  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
  return await response.json()
}
