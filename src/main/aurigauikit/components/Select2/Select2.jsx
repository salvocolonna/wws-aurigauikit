import React from "react"
import ReactDOM from "react-dom"
import $ from "jquery"

class Select2 extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    data: [],
    placeholder: "",
    willDisplay: element => element,
    didSelect: element => element
  }

  renderSelect(props) {
    const $component = $(ReactDOM.findDOMNode(this.component))
    $component.html("").select2({
      ...props,
      data: props.data.map((element, index) => ({
        id: index,
        text: props.willDisplay(element)
      }))
    })
    if (props.data.length > 0) props.didSelect(props.data[0])
    return $component
  }

  isDataChanged(data) {
    const added = data.filter(element => !this.props.data.includes(element))
    const removed = this.props.data.filter(element => !data.includes(element))
    return (added.length || removed.length) > 0
  }

  componentWillReceiveProps(nextProps) {
    if (this.isDataChanged(nextProps.data)) {
      //		this.props.didSelect(this.props.data[0])
    }
  }

  componentDidMount() {
    const $component = this.renderSelect(this.props)
    $component.unbind("change").change(() => {
      const element = this.props.data[$component.val()] || this.props.data[0]
      this.props.didSelect(element)
    })
  }

  render() {
    return <select ref={component => (this.component = component)} style={{ width: "100%" }} />
  }
}

export default Select2

/* REWRAPPER

import React from 'react'
import ReactDOM from 'react-dom'
import _Select2 from 'react-select2-wrapper'

class Select2 extends React.Component {
	constructor(props){
		super(props)
	}

	static defaultProps = {
		data: [],
		placeholder: '',
		willDisplay: element => element,
		didSelect: element => element
	}

	didSelect(element){
		this.props.didSelect(element)
		this.setState({ val: $(ReactDOM.findDOMNode(this.component)).val() })
	}

	createOptions(){
		return this.props.data.map((e, i) => ({ id: i, value: e }))
	}

	render(){
		return <_Select2 {...this.props} data={this.createOptions()} />
	}
}

export default Select2
*/
