import React from "react"
import Parsley from "parsleyjs"
import "parsleyjs/dist/i18n/en"
import "parsleyjs/dist/i18n/fr"
import "parsleyjs/dist/i18n/it"
import "./validators"
import Form from "./Form"
import $ from "jquery"

Parsley.options.namespace = "data-validation-"
Parsley.options.focus = "none"
Parsley.options.trigger = "input"
Parsley.options.validationThreshold = 0
Parsley.options.errorClass = "validation-error"
Parsley.options.successClass = "validation-success"
Parsley.options.errorsWrapper = '<ul class="validation-errors-list field-feedback" />'

export class Validator extends React.Component {
  state = { valid: true }

  validationChanged = valid => this.setState({ valid })

  componentDidMount() {
    const input = $(this.input).parsley()
    input.on("field:validated", this.fieldValidated)
  }

  componentWillUnmount() {
    const input = $(this.input).parsley()
    input.off("field:validated", this.fieldValidated)
  }

  fieldValidated = field => this.validationChanged(field.isValid())

  render() {
    const { children, ...props } = this.props
    const { valid } = this.state
    return (
      <div style={{ width: "100%", position: "relative" }}>
        {!valid && children}
        <div style={{ width: 1, height: 1, overflow: "hidden", position: "absolute" }}>
          <div ref={container => (this.container = container)}>
            <input ref={input => (this.input = input)} {...props} />
          </div>
        </div>
      </div>
    )
  }
}

export { Form }
export default Parsley
