import React from 'react'
import _Select2 from 'react-select2-wrapper'
import Loader from 'aurigauikit/components/Loader'
import './style.css'

class Select2 extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    data: [],
    willDisplay: element => element,
    didSelect: element => element,
  }

  contains(selected) {
    let found = false
    for (let value of this.props.value)
      if (this.props.willDisplay(value) === this.props.willDisplay(selected)) found = true
    return found
  }

  onSelect(e) {
    const data = e.params.data
    const selected = data.newTag
      ? this.props.createOption
        ? this.props.createOption(data)
        : data
      : this.props.data[data.element.index]
    if (this.props.multiple) {
      this.props.didSelect([...this.props.value, selected])
    } else this.props.didSelect(selected)
  }

  onUnselect(e) {
    const options = Array.from(e.target.selectedOptions)
    if (this.props.multiple) {
      this.props.didSelect(
        this.props.value.filter(v => options.find(o => o.value === this.props.willDisplay(v)))
      )
    }
  }

  render() {
    const {
      didSelect, // eslint-disable-line no-unused-vars
      willDisplay,
      data,
      value,
      loading,
      createOption, // eslint-disable-line no-unused-vars
      ...props
    } = this.props
    return [
      <_Select2
        key="select"
        {...props}
        // onClick={() => setTimeout(() => $(".select2-search__field").focus(), 50)}
        data={data.map(v => (v ? willDisplay(v) : ''))}
        value={
          value
            ? typeof value !== 'string' && value.length > 0
              ? value.map(v => willDisplay(v))
              : willDisplay(value)
            : ''
        }
        onSelect={e => this.onSelect(e)}
        onUnselect={(e, a) => this.onUnselect(e, a)}
      />,
      loading && <Loader key="loader" style={{ marginTop: -28, marginRight: 8 }} />,
    ]
  }
}

export default Select2
