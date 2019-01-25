import React from "react"
import Spinner from "aurigauikit/components/Spinner"

export default class extends React.Component {
  state = { loading: false }

  load = () => this.setState({ loading: true })

  stop = () => this.setState({ loading: false })

  render() {
    const { loading } = this.state
    return (
      <div>
        {loading && <Spinner onClick={this.stop} />}
        <button className="btn btn-primary" onClick={this.load} style={{ width: 180 }}>
          Load
        </button>
      </div>
    )
  }
}
