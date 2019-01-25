import React from "react"
import { FormattedMessage } from "react-intl"
import { Div } from "aurigauikit/components/Grid"

class BasicFilterElement extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { col, style, text, children } = this.props
    return (
      <Div className="react-basic-filter-element" col={col} style={style}>
        <label>
          <FormattedMessage id={text} />
        </label>
        <div style={{ marginBottom: 10 }}>{React.Children.only(children)}</div>
      </Div>
    )
  }
}

export default BasicFilterElement
